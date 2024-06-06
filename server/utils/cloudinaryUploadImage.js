const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Function to upload an image to Cloudinary
const cloudinaryUploadImg = async (fileToUpload) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileToUpload, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id
        });
      }
    });
  });
};

// Function to delete an image from Cloudinary
const cloudinaryDeleteImg = async (publicIdToDelete) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicIdToDelete, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id
        });
      }
    });
  });
};

// Export the upload and delete functions
module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
