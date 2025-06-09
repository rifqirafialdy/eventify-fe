import axios from "axios";

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_profile_upload");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/duscwisxr/image/upload",
    formData
  );
  return res.data.secure_url;
};
