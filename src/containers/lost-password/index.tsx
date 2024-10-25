
"use client"; 
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LostPassword = () => {
  // State management for the form input and errors
  const [inputValue, setInputValue] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      value: e.target.value,
      error: "",
    });
  };

  // Validate form before submission
  const validateForm = () => {
    if (!inputValue.value.trim()) {
      setInputValue((prev) => ({
        ...prev,
        error: "Field is empty",
      }));
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      // Simulate sending lost password request (replace with real API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoading(false);
      setInputValue({ value: "", error: "" });
      toast.success("Password reset link sent successfully!");

      // You can redirect or show a success message here
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="w-100 py-5 bg-white grid place-items-center">
      <div className="max-w-[500px] w-[100%] flex flex-col">
        <p className="text-[16px] mb-10">
          Please enter your username or email address. You will receive a link
          to create a new password via email.
        </p>

        <div className="w-100 space-y-2 mb-5">
          <p className="font-semibold text-[16px] text-[#000000]">
            Username or Email Address
          </p>
          <div className="w-100 flex items-center gap-1">
            <input
              type="text"
              className="w-[90%] border-[1px] border-stone-300 autofill:bg-[#e8f0fe] rounded-md px-2 py-2 outline-none"
              value={inputValue.value}
              onChange={handleChange}
            />
          </div>
          {inputValue.error && (
            <p className="text-red-500 text-[12px]">{inputValue.error}</p>
          )}
        </div>

        <button
          className="w-fit py-2 px-5 rounded-sm text-[18px] text-white mb-5 disabled:opacity-60"
          style={{ background: "rgb(25, 56, 57)" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending..." : "Get New Password"}
        </button>

        <div
          className="w-100 h-[2px] mt-4"
          style={{ backgroundColor: "rgb(203, 213, 224)" }}
        />

        <p className="text-red-700 font-normal py-1 hover:text-[#219E99] focus:text-[#219E99]">
          <Link href="/auth/login" replace>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LostPassword;
