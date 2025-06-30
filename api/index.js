const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  // Path ke db.json tetap sama
  const dbPath = path.join(__dirname, '..', 'db.json');
  
  try {
    const fileData = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(fileData);

    // Ambil path dari query parameter yang dikirim oleh vercel.json
    // Contoh: req.query.path akan berisi 'products', 'cart', dll.
    const resourceKey = req.query.path;

    if (resourceKey && db[resourceKey]) {
      // Jika resource (misal: 'products') ada di database, kirim datanya
      res.status(200).json(db[resourceKey]);
    } else if (resourceKey) {
      // Jika resource diminta tapi tidak ada di db.json
      res.status(404).json({ error: `Resource '${resourceKey}' not found.` });
    } else {
      // Jika tidak ada path spesifik (request hanya ke /api), kirim seluruh DB
      // Ini menjaga fungsionalitas json-server sebelumnya
      res.status(200).json(db);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to process request.', details: error.message });
  }
};