const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  const dbPath = path.resolve('./db.json');
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read database file.' });
  }
};