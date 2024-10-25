import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { ZodError } from 'zod';
import prisma from '@/lib/prisma'; // Prisma instance
import validate from '@/utils/validate'; // Input validator
import authValidator, { SignupSchema } from '@/server/validators/auth.validator';
import handleError from '@/utils/handle-error'; // Error handling

// Generate username suggestions
function generateUsernameSuggestions(username: string): string[] {
  return Array.from({ length: 3 }, () =>
    `${username}${Math.floor(Math.random() * 1000)}`
  );
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse and validate the request body
    const json = await request.json();
    const body = await validate<SignupSchema>(authValidator.signup, json);

    // Hash the password with bcrypt (10 salt rounds)
    const hashedPassword = await hash(body.password, 10);

    // Check if email already exists
    const emailExists = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (emailExists) {
      return NextResponse.json(
        { error: 'Email already exists', success: false },
        { status: 409 } // 409 Conflict
      );
    }

    // Check if username already exists
    const usernameExists = await prisma.user.findFirst({
      where: { username: body.username },
    });
    if (usernameExists) {
      const suggestions = generateUsernameSuggestions(body.username);
      return NextResponse.json(
        {
          error: 'Username already exists',
          suggestions,
          success: false,
        },
        { status: 510 } // 409 Conflict
      );
    }

    // Create a new user
    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
        isActive: true,
        profileImage: '',
        role: 'user',
      },
      select: {
        id: true,
        username: true,
        email: true,
        isActive: true,
        plan: true,
        role: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Return success response
    return NextResponse.json(
      { data: user, error: null, success: true },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const formattedErrors = error.flatten().fieldErrors;
      return NextResponse.json(
        { error: formattedErrors, success: false },
        { status: 400 } // 400 Bad Request
      );
    }
    // Handle other errors gracefully
    return handleError(error);
  }
}
