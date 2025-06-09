"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

export default function CreateProfilePage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string>("");

  const formik = useFormik({
    initialValues: {
  name: "",
  profilePicture: "",  
  description: "",
},
   validationSchema: Yup.object({
  name: Yup.string().required("Name is required"),
  profilePicture: Yup.string().url("Invalid URL").required("Picture URL is required"),  
  description: Yup.string().required("Description is required"),
}),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await axiosInstance.post("/api/organizer/profile", values);
        router.push("/dashboard");
      } catch (err: unknown) {
        console.error("Error creating profile:", err);
       if (
  typeof err === "object" &&
  err !== null &&
  "response" in err &&
  typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
) {
  setErrors({ name: (err as { response: { data: { message: string } } }).response.data.message });
}


      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
     const imageUrl = await uploadToCloudinary(file);
formik.setFieldValue("profilePicture", imageUrl); 
setPreview(imageUrl);
    } catch {
      alert("Image upload failed!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-amber-600">Create Your Organizer Profile</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Upload Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mt-1"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-32 rounded object-cover"
            />
          )}
          {formik.touched.profilePicture && formik.errors.profilePicture && (
            <div className="text-red-500 text-sm">{formik.errors.profilePicture}</div>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm">{formik.errors.description}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
        >
          {formik.isSubmitting ? "Submitting..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
}
