const multer = require("multer");
const path = require("path");

const storeImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // folder backend-ka
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const uploadStore = multer({
  storage: storeImage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

module.exports = uploadStore;
