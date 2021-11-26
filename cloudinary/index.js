const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Fnonak Products",
    allowedFormats: ["jpeg", "png", "jpg", "jfif"],
  },
});

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Fnonak Profiles",
    allowedFormats: ["jpeg", "png", "jpg", "jfif"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
