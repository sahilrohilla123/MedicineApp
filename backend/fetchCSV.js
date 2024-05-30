const axios = require('axios');
const csv = require('csv-parser');
const { PassThrough } = require('stream');

const GOOGLE_DRIVE_FILE_ID = '1hWoim6wHt78Vcu_3xWuEQx0K6aTyHhS8';
const CSV_URL = `https://drive.google.com/uc?id=${GOOGLE_DRIVE_FILE_ID}&export=download`;

let medicines = [];
let isCSVLoaded = false;

const fetchCSV = async () => {
  if (isCSVLoaded) {
    return medicines;
  }

  try {
    const response = await axios.get(CSV_URL, { responseType: 'stream',timeout: 70000});
    const stream = response.data.pipe(new PassThrough());

    return new Promise((resolve, reject) => {
      medicines = [];
      stream
        .pipe(csv())
        .on('data', (row) => {
          medicines.push(row);
        })
        .on('end', () => {
          isCSVLoaded = true;
          console.log('CSV file successfully processed');
          resolve(medicines);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.error('Error fetching CSV file', error);
    throw error;
  }
};

const getMedicines = () => medicines;

module.exports = { fetchCSV, getMedicines };
