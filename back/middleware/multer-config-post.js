const multer = require('multer');
const fs = require('fs'); 

const MIME_TYPES = { 
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({ 
    destination: (req, file, callback) => { 
        if (!fs.existsSync('images')) { 
            fs.mkdirSync('images'); 
            callback(null, 'images');
        } else { 
        callback(null, 'images');
        }
    },
    filename: (req, file, callback) => { 
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype]; 
        callback(null, name + Date.now() + '.' + extension);  
    }
});

module.exports = multer({ storage }).single('imageUrl'); 