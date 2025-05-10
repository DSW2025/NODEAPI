const multer = require('multer')
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Carpeta donde se guardan
  },
  filename: (req, file, cb) => {
    const uniqueName = 'IMG_' + Date.now() + path.extname(file.originalname); 
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
