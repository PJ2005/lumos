// Calculation.jsx
import React from 'react';
import { final } from '../Pages/Calculator';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export var GPA = 0;

function Calculate({ onReset, user }) {
  let credits = 0;
  let multiplication = 0;

  for (let i = 0; i < final.length; i++) {
    const entry = final[i];
    if (!entry.grade || !entry.credit) {
      alert(`Row ${i + 1} is incomplete. Please fill out both grade and credit.`);
      return;
    } else {
      credits += parseFloat(entry.credit);
      multiplication += parseFloat(entry.credit) * parseFloat(entry.grade);
    }
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