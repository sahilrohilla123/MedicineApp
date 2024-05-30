import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import handleSearch from '@/functions/handlesearch';

const Search = () => {
  const [query, setQuery] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set items per page
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const onSearch = () => {
    handleSearch(query, setMedicines);
  };

  const navigateToMedicines = () => {
    router.push('/medicineList');
  };

  const navigateToFeedback = () => {
    router.push('/feedback');
  };

  // Pagination handlers
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = medicines.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < medicines.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (indexOfFirstItem > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const logout = () =>{
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0 text-center sm:text-left">Search Medicines</h1>
          <div className="flex flex-col sm:flex-row items-center sm:w-auto w-full">
            <button
              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-2 sm:px-4 rounded mb-2 sm:mb-0 sm:mr-2 sm:w-auto shadow-lg"
              type="button"
              onClick={logout}
            >
              Log Out
            </button>
            <button
              className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-2 sm:px-4 rounded mb-2 sm:mb-0 sm:mr-2 sm:w-auto shadow-lg"
              type="button"
              onClick={navigateToMedicines}
            >
              Get Med List
            </button>
            <button
              className="bg-green-700 hover:bg-green-900 text-white font-bold py-1 px-2 sm:px-4 rounded mb-2 sm:mb-0 sm:mr-2 sm:w-auto shadow-lg"
              type="button"
              onClick={navigateToFeedback}
            >
              Feedback
            </button>
            <input
              type="text"
              className="flex-grow border border-gray-600 rounded-l py-1 px-2 sm:px-4 focus:outline-none focus:border-blue-500 mb-2 sm:mb-0 sm:mr-2 bg-black text-white shadow-lg"
              placeholder="Enter medicine name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-1 px-2 sm:px-4 rounded-r sm:w-auto shadow-lg"
              type="button"
              onClick={onSearch}
            >
              Search
            </button>
          </div>
        </div>
        <ul className="divide-y divide-gray-700">
          {currentMedicines.map((medicine) => (
            <li key={medicine.Index} className="py-4">
              <h3 className="text-lg font-semibold">{medicine.Medicine_Name}</h3>
              <p><strong>Price:</strong> {medicine.Retail_Price}</p>
              <p><strong>Availability:</strong> {medicine.Availability}</p>
            </li>
          ))}
        </ul>
        {medicines.length > 0 && (
          <div className="flex justify-between mt-4">
            {indexOfFirstItem > 0 && (
              <button
                className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-2 sm:px-4 rounded sm:w-auto shadow-lg"
                onClick={prevPage}
              >
                Previous
              </button>
            )}
            {indexOfLastItem < medicines.length && (
              <button
                className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-2 sm:px-4 rounded sm:w-auto shadow-lg"
                onClick={nextPage}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
