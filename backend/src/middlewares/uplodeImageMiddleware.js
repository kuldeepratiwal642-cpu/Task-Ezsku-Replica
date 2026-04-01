const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const fieldsToPersist = [
  "profile_image",
  "category_image",
  "movie_image",
  "production_image",
  "image",
  "product_image",
];

const fieldConfigs = fieldsToPersist.map((name) => ({ name, maxCount: 1 }));
fieldConfigs.push({ name: "product_images", maxCount: 10 });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = file.fieldname;
    const uploadPath = path.join("uploads", folderName);

    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueFileName = `${uuidv4()}_${Date.now()}${ext}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extName) {
      return cb(null, true);
    }

    cb(new Error("Error: Only images (jpeg, jpg, png) and pdf files are allowed!"));
  },
});

const uploadFields = upload.fields(fieldConfigs);

const uploadMiddleware = (req, res, next) => {
  uploadFields(req, res, function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({
        status: false,
        message: err.message,
      });
    }

    fieldsToPersist.forEach((field) => {
      if (req.files && req.files[field] && req.files[field][0]) {
        req.body[field] = `${field}/${path.basename(req.files[field][0].path)}`;
      }
    });

    if (req.files && req.files.product_images && req.files.product_images.length) {
      req.body.product_images = req.files.product_images.map(
        (file) => `product_images/${path.basename(file.path)}`
      );
    }

    if (req.body.product_image && !req.body.image) {
      req.body.image = req.body.product_image;
    }

    if (req.body.product_images && req.body.product_images.length && !req.body.image) {
      req.body.image = req.body.product_images[0];
    }

    next();
  });
};
module.exports = uploadMiddleware;

