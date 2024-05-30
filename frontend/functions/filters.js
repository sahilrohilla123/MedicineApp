// filters.js

export const filterMedicines = (medicines, minPrice, maxPrice, manufacturer) => {
    return medicines.filter((medicine) => {
      const withinPriceRange = (minPrice === '' || medicine.Retail_Price >= parseFloat(minPrice)) &&
                               (maxPrice === '' || medicine.Retail_Price <= parseFloat(maxPrice));
      const matchesManufacturer = manufacturer === '' || medicine.Manufacturer.toLowerCase().includes(manufacturer.toLowerCase());
      return withinPriceRange && matchesManufacturer;
    });
  };
  
  export const sortMedicines = (medicines, sortBy) => {
    return [...medicines].sort((a, b) => {
      if (sortBy === 'price') {
        return a.Retail_Price - b.Retail_Price;
      } else if (sortBy === 'name') {
        return a.Medicine_Name.localeCompare(b.Medicine_Name);
      }
      return 0;
    });
  };
  