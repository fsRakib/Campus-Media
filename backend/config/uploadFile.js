import cloudinary from "./cloudinary.js";

export const uploadFileToCloudinary = (fileData, folder, originalFileName) => {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const uniqueFileName = `${originalFileName}-${timestamp}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: uniqueFileName,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(fileData);
  });
};
