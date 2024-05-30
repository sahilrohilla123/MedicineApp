const { getMedicines, fetchCSV } = require('../fetchCSV');

const getMedList = async(req , res) =>{
    try {
        await fetchCSV();  
        const medicines = getMedicines();
        res.json(medicines);
    }catch (error) {
        console.error('Error in Getting Medicine List:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = getMedList;