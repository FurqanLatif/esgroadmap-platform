"use client";
import ticket, { SupportTicketDocument } from "@/api/ticket";
import { createTicketSchema } from "@/lib/schema";
import QuillEditor from "@/utils/_Quill";
import { User } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FileUpload, FileUploadProps } from "primereact/fileupload";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ZodFormattedError } from "zod";

type FormState = {
  title: { value: string; error: string };
  description: { value: any; error: string };
};

const initialData: FormState = {
  title: { value: "", error: "" },
  description: { value: "", error: "" },
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

// Allowed file types (now includes CSV and Excel files)
const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "text/csv", // For CSV files
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // For Excel (xlsx)
  "application/vnd.ms-excel" // For Excel (xls)
];

const CreateNewTicket: React.FC<{ user: Omit<User, "password"> }> = ({ user }) => {
  const [data, setData] = useState<FormState>(initialData);
  const fileUploadRef = useRef<FileUpload | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null); // State for file error
  const router = useRouter();

  const handleChange = (key: keyof FormState) => async (e: any) => {
    setData((prev) => {
      return {
        ...prev,
        [key]: {
          value: e.target.value,
          error: "",
        },
      };
    });
  };

  const transformValues = <
    T extends Record<string, { value: string; error?: string }>,
    R extends { [K in keyof T]: string }
  >(
    data: T
  ) => {
    const values = Object.fromEntries(
      Object.keys(data).map((key) => {
        const typedKey = key as keyof T;
        let value = data[typedKey].value;
        if (typedKey === "description") {
          value =
            (value as any)?.ops && (value as any)?.ops?.length > 0
              ? (value as any)?.ops[0].insert
              : "";
        }
        return [typedKey, value];
      })
    );
    return values as R;
  };

  const validateData = async () => {
    const values = transformValues(data);
    const result = await createTicketSchema.safeParseAsync(values);
    let errors:
      | undefined
      | ZodFormattedError<{ [K in keyof FormState]: string }> = undefined;
    if (!result.success) {
      errors = result.error.format();
    }

    return errors;
  };

  const setErrors = (
    errors: ZodFormattedError<{ [K in keyof FormState]: string }>
  ) => {
    setData((prev) => {
      const newData = Object.fromEntries(
        Object.keys(errors)
          .filter((key) => key !== "_errors")
          .map((key) => {
            const errorKey = key as keyof FormState;
            return [
              errorKey,
              {
                value: prev[errorKey].value,
                error: errors[errorKey]?._errors[0] ?? "",
              },
            ];
          })
      );

      return { ...prev, ...newData };
    });
  };

  // Validate file types
  const validateFiles = (files: File[]) => {
    for (const file of files) {
      if (!allowedFileTypes.includes(file.type)) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Validate the form fields
      const errors = await validateData();
      if (errors) {
        setLoading(false);
        return setErrors(errors);
      }

      // Validate the file upload if files exist
      if (fileUploadRef.current) {
        const files = fileUploadRef.current.getFiles();
        if (!validateFiles(files)) {
          setLoading(false);
          setFileError("Only PDF, image files (JPEG, PNG), CSV, and Excel files are allowed.");
          return;
        }
        setFileError(null); // Clear error if file validation passes

        let documents: SupportTicketDocument[] = [];
        if (files.length > 0) {
          documents = await ticket.uploadDocuments(files);
        }

        // Submit form data and documents
        const values = transformValues(data);
        const result = await ticket.create({
          ...values,
          documents,
        });

        setLoading(false);
        fileUploadRef.current.clear();
        setData({ ...initialData });
        router.replace("/dashboard/tickets");
        toast.success(`Ticket created successfully!`);
      }
    } catch (error) {
      setLoading(false);
      toast.error((error as Error)?.message);
    }
  };

  const itemTemplate: FileUploadProps["itemTemplate"] = (file, props) => {
    const uploadedFile = file as { name: string; objectURL: string };
    return (
      <div className="flex flex-row justify-between items-center w-[100%]">
        <div className="flex items-center">
          <Image
            alt={uploadedFile.name}
            role="presentation"
            src={uploadedFile.objectURL}
            width={80}
            height={50}
          />
          <span className="flex flex-column text-left ml-3">
            {uploadedFile.name}
          </span>
        </div>

        <Trash2Icon color="#FF6347" onClick={props.onRemove} />
      </div>
    );
  };

  return (
    <div className="px-10 pt-[5vh] w-[100%] overflow-x-hidden">
      <h1 className="text-[32px] text-[#219E99] font-bold">Raise New Ticket</h1>

      <div className="flex flex-col gap-5 w-[100%] mt-4">
        <div className="w-100 space-y-2">
          <p className="font-semibold text-[16px] text-[#000000]">Title</p>
          <div className="w-100 flex items-center gap-1">
            <input
              type="text"
              value={data.title.value}
              onChange={handleChange("title")}
              className="w-[100%] border-[1px] border-stone-300 autofill:bg-[#e8f0fe] rounded-md px-2 py-2 outline-none"
            />
            <p className="text-[18px] text-[#000000]">*</p>
          </div>
          {data.title.error && (
            <p className="text-red-500 text-[12px]">{data.title.error}</p>
          )}
        </div>

        <div className="w-100 space-y-2">
          <p className="font-semibold text-[16px] text-[#000000]">
            Description
          </p>
          <div className="w-100 flex items-center gap-1">
            <QuillEditor
              placeholder="Please describe your issue in detail..."
              modules={modules}
              value={data.description.value as any}
              style={{ width: "100%" }}
              onChange={(a, delta, source, editor) => {
                const contents = editor.getContents();
                if (contents) {
                  setData((prev) => ({
                    ...prev,
                    description: { value: contents, error: "" },
                  }));
                }
              }}
            />
            <p className="text-[18px] text-[#000000]">*</p>
          </div>
          {data.description.error && (
            <p className="text-red-500 text-[12px]">{data.description.error}</p>
          )}
        </div>

        {/* File Upload Section */}
        <FileUpload
          name="files[]"
          ref={fileUploadRef}
          multiple={true}
          maxFileSize={1000000}
          accept=".jpg,.jpeg,.png,.pdf,.csv,.xls,.xlsx" // Restrict file types to include CSV and Excel
          emptyTemplate={
            <p className="m-0">Drag and drop files here to upload.</p>
          }
          mode="advanced"
          chooseOptions={{
            style: { background: "#219E99", fontSize: 15 },
            label: "Attach Documents",
          }}
          uploadOptions={{ className: "hidden" }}
          cancelOptions={{ className: "hidden" }}
          headerStyle={{ padding: 10 }}
          contentStyle={{
            padding: 10,
          }}
          itemTemplate={itemTemplate}
        />
        {/* Display file validation error */}
        {fileError && (
          <p className="text-red-500 text-[12px]">{fileError}</p>
        )}

        <button
          className="w-fit py-2 px-5 rounded-sm text-[16px] text-white mb-5 disabled:opacity-60"
          style={{ background: "rgb(25, 56, 57)" }}
          disabled={loading}
          onClick={handleSubmit}
        >
          Submit Your Ticket
        </button>
      </div>
    </div>
  );
};

export default CreateNewTicket;
