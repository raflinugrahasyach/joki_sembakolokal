const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  // Menemukan path ke db.json. __dirname akan menunjuk ke direktori 'api'.
  // path.join akan membuat path yang benar: /var/task/api/../db.json -> /var/task/db.json
  const dbPath = path.join(__dirname, '..', 'db.json');

  try {
    const fileData = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(fileData);

    // Memeriksa URL permintaan untuk menentukan data apa yang harus dikembalikan
    // Contoh: req.url bisa berupa '/api/products' atau '/api/cart'
    const key = req.url.split('/')[2]; // Mengambil 'products', 'cart', dll.

    if (key && db[key]) {
      // Jika ada key yang cocok di db.json (misal: "products"), kirim data tersebut
      res.status(200).json(db[key]);
    } else if (key) {
      // Jika key diminta tapi tidak ada, kirim error 404
      res.status(404).json({ error: `Data for '${key}' not found.` });
    } else {
      // Jika hanya '/api' yang diminta, kirim seluruh database
      res.status(200).json(db);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read or parse database file.', details: error.message });
  }
};