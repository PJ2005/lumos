// DeleteData.jsx
import React, { useState, useRef, useEffect } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { IoIosArrowDropdown } from "react-icons/io";

const DeleteData = ({ semestersData, user, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (semester) => {
    setSelectedSemester(semester);
    showConfirmationOverlay(semester);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showConfirmationOverlay = (semester) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm';
    overlay.innerHTML = `
      <div class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center transition-colors duration-300 mx-10">
        <p class="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">Are you sure you want to delete data for ${semester}?</p>
        <button id="confirmBtn" class="bg-red-500 text-white hover:bg-red-600 font-bold py-2 px-4 rounded mr-2 transition-colors duration-300">
          Confirm
        </button>
        <button id="cancelBtn" class="bg-gray-300 text-gray-800 hover:bg-gray-400 font-bold py-2 px-4 rounded transition-colors duration-300">
          Cancel
        </button>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('confirmBtn').addEventListener('click', () => {
      deleteData(semester);
      document.body.removeChild(overlay);
    });
    document.getElementById('cancelBtn').addEventListener('click', () => {
      document.body.removeChild(overlay);
    });
  };

  const deleteData = async (semester) => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.email, 'GPAs', semester);
        await deleteDoc(docRef);
        onDelete(semester);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
        <button
            onClick={toggleDropdown}
            className="bg-red-500 dark:bg-red-700 hover:dark:bg-red-800 text-white text-center px-4 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-between w-full"
        >
            <span className="flex-grow text-center">Delete Data</span>
            <IoIosArrowDropdown className={`transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} />
        </button>
        {isOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto md:overflow-y-visible">
                {semestersData.map((data) => (
                    <button
                        key={data.id}
                        onClick={() => handleSelect(data.id)}
                        className="block w-full text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-300"
                    >
                        {data.id}
                    </button>
                ))}
            </div>
        )}
    </div>
);

};

export default DeleteData;
