const axios = require('axios');

const GOOGLE_DRIVE_FILE_ID = '1hWoim6wHt78Vcu_3xWuEQx0K6aTyHhS8';
const CSV_URL = `https://drive.google.com/uc?id=${GOOGLE_DRIVE_FILE_ID}&export=download`;

let medicines = [];
let isCSVLoaded = false;

const fetchCSV = async () => {
  if (isCSVLoaded) {
    return medicines;
  }

  try {
    const response = await axios.get(CSV_URL);
    const data = response.data;

    // Process the CSV data as needed
    medicines = processData(data);

    isCSVLoaded = true;
    console.log('CSV file successfully processed');
    return medicines;
  } catch (error) {
    console.error('Error fetching CSV file', error);
    throw error;
  }
};

const processData = (data) => {
  // Process the CSV data using custom logic or libraries like csv-parser
  // For example, if the data is in CSV format separated by commas:
  const rows = data.trim().split('\n');
  const headers = rows[0].split(',');
  const parsedData = rows.slice(1).map(row => {
    const values = row.split(',');
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });

  return parsedData;
};

const getMedicines = () => medicines;

module.exports = { fetchCSV, getMedicines };
