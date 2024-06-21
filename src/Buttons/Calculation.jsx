// Calculation.jsx
import React from 'react';
import { final } from '../Pages/Calculator';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export var GPA = 0;

function showIncompleteEntryOverlay(rowNumber) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm';
  overlay.innerHTML = `
    <div class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center transition-colors duration-300 mx-10">
      <p class="mb-4 text-xl font-bold text-red-500 dark:text-red-400">Row ${rowNumber} is incomplete. Please fill out both grade and credit.</p>
      <button id="closeBtn" class="bg-zinc-300 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-zinc-400 dark:hover:bg-zinc-600 font-bold py-2 px-4 rounded transition-colors duration-300">
        Close
      </button>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById('closeBtn').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
}

function Calculate({ onReset, user }) {
  let credits = 0;
  let multiplication = 0;
  let validEntries = 0;

  for (let i = 0; i < final.length; i++) {
    const entry = final[i];
    if (entry && entry.grade && entry.credit) {
      credits += parseFloat(entry.credit);
      multiplication += parseFloat(entry.credit) * parseFloat(entry.grade);
      validEntries++;
    }
  }

  if (validEntries === 0) {
    showIncompleteEntryOverlay(1);
    return;
  }

  GPA = (multiplication / credits).toFixed(2);
  console.log(`GPA is ${GPA}`);

  if (onReset) {
    onReset();
  }
}

export default function CalculateBtn({ onReset }) {
  const { user } = UserAuth();

  const handleCalculate = async () => {
    Calculate({ onReset, user });
  };

  return (
    <>
      <div className="bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold w-full h-10 rounded-lg flex justify-center items-center hover:shadow-lg hover:scale-[1.01] transition-all duration-300 ease-in-out">
        <button 
          onClick={handleCalculate} 
          className="w-full h-full rounded-lg hover:bg-gray-500 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          Calculate
        </button>
      </div>
    </>
  );
}

export const saveUserData = async (email, year, semester, data) => {
  try {
    const docRef = doc(db, 'users', email, 'GPAs', `${year}_${semester}`);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      // Document exists, update it
      await setDoc(docRef, data, { merge: true });
      console.log('Data successfully updated!');
    } else {
      // Document does not exist, create a new one
      await setDoc(docRef, data);
      console.log('Data successfully written!');
    }
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};