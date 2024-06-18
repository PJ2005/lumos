// Calculator.jsx
import './../CSS/Calculator.css';
import { useState, useEffect, useRef } from "react";
import { AddRowBtn, handleAddRow } from "../Buttons/AddRow";
import CalculateBtn, { GPA, saveUserData } from "../Buttons/Calculation";
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebaseConfig';

function Header() {
    return (
        <div className="grid grid-cols-7 text-center items-center bg-neutral-300 dark:bg-neutral-700 py-2 max-md:mb-8 rounded-lg transition-colors duration-300">
            <h1 className="col-span-1 text-gray-800 dark:text-gray-200 transition-colors duration-300">S.No</h1>
            <h1 className="col-span-2 text-gray-800 dark:text-gray-200 transition-colors duration-300">Subject</h1>
            <h1 className="col-span-2 text-gray-800 dark:text-gray-200 transition-colors duration-300">Credits</h1>
            <h1 className="col-span-2 text-gray-800 dark:text-gray-200 transition-colors duration-300">Grade</h1>
        </div>
    );
}

function GradeDrop({ onGradeChange, reset, resetGrade }) {
    const [grade, setGrade] = useState('');
  
    const handleGradeChange = (e) => {
      const selectedGrade = e.target.value;
      setGrade(selectedGrade);
      onGradeChange(selectedGrade);
    };
  
    const resetGradeValue = () => {
        setTimeout(() => {
            setGrade('');
        }, 5000);
    };
  
    useEffect(() => {
      if (reset) {
        if (typeof resetGrade === 'function') {
          resetGrade();
        } else {
          resetGradeValue();
        }
      }
    }, [reset, resetGrade]);
  
    return (
      <div className="dropdown-menu flex flex-col justify-center items-center md:flex-row md:w-auto max-md:w-11/12">
        <select
          onChange={handleGradeChange}
          value={grade}
          className="dropdown-toggle rounded-md focus:outline-neutral-500 appearance-none cursor-pointer hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:outline-neutral-600 py-1.5 px-4 max-md:w-11/12 md:w-auto text-center hover:shadow-lg hover:scale-[1.01] hover:transition-all ease-in-out text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-800 transition-colors duration-300"
        >
          <option value="" disabled hidden>Grades</option>
          <option value="10">O</option>
          <option value="9">A+</option>
          <option value="8">A</option>
          <option value="7">B+</option>
          <option value="6">B</option>
          <option value="5">P (Pass)</option>
          <option value="0">RA (Reappear)</option>
        </select>
      </div>
    );
}

function CreditDrop({ onCreditChange, reset, resetCredit }) {
  const [credit, setCredit] = useState('');

  const handleCreditChange = (e) => {
    const selectedCredit = e.target.value;
    setCredit(selectedCredit);
    onCreditChange(selectedCredit);
  };

  const resetCreditValue = () => {
      setTimeout(() => {
          setCredit('');
      }, 5000);
  };

  useEffect(() => {
    if (reset) {
      if (typeof resetCredit === 'function') {
        resetCredit();
      } else {
        resetCreditValue();
      }
    }
  }, [reset, resetCredit]);

  return (
    <div className="flex flex-col justify-center items-center md:flex-row w-full md:w-auto">
      <select
        onChange={handleCreditChange}
        value={credit}
        className="rounded-md focus:outline-neutral-500 appearance-none cursor-pointer hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:outline-neutral-600 py-1.5 px-4 md:w-auto max-md:w-[94%] text-center hover:shadow-lg hover:scale-[1.01] hover:transition-all ease-in-out text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-800 transition-colors duration-300"
      >
        <option value="" disabled hidden>Credits</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
}

function SubjectInput({ onSubjectChange, reset, resetSubject }) {
    const [subject, setSubject] = useState('');

    const handleSubjectChange = (e) => {
        const enteredSubject = e.target.value;
        setSubject(enteredSubject);
        onSubjectChange(enteredSubject);
    };

    const resetSubjectValue = () => {
        setTimeout(() => {
            setSubject('');
        }, 5000);
    };

    useEffect(() => {
        if (reset) {
            if (typeof resetSubject === 'function') {
                resetSubject();
            } else {
                resetSubjectValue();
            }
        }
    }, [reset, resetSubject]);

    return (
        <div>
            <input
                type="text"
                className="rounded-md py-1.5 px-4 w-full md:w-auto outline-none hover:bg-neutral-200 hover:cursor-pointer focus:cursor-text focus:bg-neutral-200 focus:outline-neutral-400 dark:hover:bg-neutral-500 dark:focus:bg-neutral-500 dark:focus:outline-neutral-600 text-center hover:shadow-lg hover:scale-[1.01] hover:transition-all ease-in-out text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-800 transition-colors duration-300 placeholder:text-sm md:placeholder:text-base"
                placeholder="Subject"
                value={subject}
                onChange={handleSubjectChange}
            />
        </div>
    );
}


function CenteredHr() {
    return (
        <div className="flex justify-center">
            <hr className="my-2 w-4/6 border-neutral-500 dark:border-gray-200 opacity-50" />
        </div>
    );
}

export const final = [];

function Format({ count, rowIndex, resetGrade, resetCredit, resetSubject, resetInputs }) {
    const [data, setData] = useState({ key: rowIndex });
  
    const handleGradeChange = (grade) => {
      setData((prevData) => {
        const newData = { ...prevData, grade };
        updateFinalArray(rowIndex, newData);
        return newData;
      });
    };
  
    const handleCreditChange = (credit) => {
      setData((prevData) => {
        const newData = { ...prevData, credit };
        updateFinalArray(rowIndex, newData);
        return newData;
      });
    };
  
    const handleSubjectChange = (subject) => {
      setData((prevData) => {
        const newData = { ...prevData, subject };
        updateFinalArray(rowIndex, newData);
        return newData;
      });
    };
  
    const updateFinalArray = (index, newData) => {
      const finalIndex = index - 1;
      final[finalIndex] = { ...final[finalIndex], ...newData };
    };
  
    useEffect(() => {
      const entry = final[rowIndex - 1];
      if (entry && entry.credit && entry.grade && entry.subject) {
        }
    }, [data, rowIndex]);

    return (
        <div className="grid grid-cols-7 text-center mt-2">
            <div className="col-span-1">{count}</div>
            <div className="col-span-2">
                <SubjectInput onSubjectChange={handleSubjectChange} reset={resetInputs} resetSubject={resetSubject} />
            </div>
            <div className="col-span-2">
                <CreditDrop onCreditChange={handleCreditChange} reset={resetInputs} resetCredit={resetCredit} />
            </div>
            <div className="col-span-2">
                <GradeDrop onGradeChange={handleGradeChange} reset={resetInputs} resetGrade={resetGrade} />
            </div>
        </div>
    );
}

function YearSem({ onYearChange, onSemesterChange, reset }) {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    onYearChange(year);
  };

  const handleSemesterChange = (e) => {
    const semester = e.target.value;
    setSelectedSemester(semester);
    onSemesterChange(semester);
  };

  useEffect(() => {
    if (reset) {
      setSelectedYear('');
      setSelectedSemester('');
    }
  }, [reset]);

  const semesterOptions = {
    Y1: ['Sem 1', 'Sem 2'],
    Y2: ['Sem 3', 'Sem 4'],
    Y3: ['Sem 5', 'Sem 6'],
    Y4: ['Sem 7', 'Sem 8'],
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-1/2">
        <select
          className="rounded-md appearance-none cursor-pointer focus:outline-zinc-500 hover:bg-zinc-300 focus:bg-zinc-300 dark:focus:outline-zinc-400 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700 py-1.5 px-4 w-full text-center hover:shadow-lg hover:scale-[1.01] hover:transition-all ease-in-out text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-800 transition-colors duration-300"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="" disabled hidden>Year</option>
          <option value="Y1">Year 1</option>
          <option value="Y2">Year 2</option>
          <option value="Y3">Year 3</option>
          <option value="Y4">Year 4</option>
        </select>
      </div>
      <div className="w-1/2">
        <select
          className="rounded-md appearance-none cursor-pointer focus:outline-zinc-500 hover:bg-zinc-300 focus:bg-zinc-300 dark:focus:outline-zinc-400 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700 py-1.5 px-4 w-full text-center hover:shadow-lg hover:scale-[1.01] hover:transition-all ease-in-out text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-800 transition-colors duration-300"
          value={selectedSemester}
          onChange={handleSemesterChange}
          disabled={!selectedYear}
        >
          <option value="" disabled hidden>Semester</option>
          {selectedYear && semesterOptions[selectedYear].map((sem, index) => (
            <option key={index} value={sem}>{sem}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function showLoginOverlay() {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm';
    overlay.innerHTML = `
      <div class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center transition-colors duration-300 mx-10">
        <p class="mb-4 text-lg text-gray-800 dark:text-gray-200">Would you like to log in and save your data?</p>
        <button id="loginBtn" class="bg-zinc-300 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-zinc-400 dark:hover:bg-zinc-600 font-bold py-2 px-4 rounded mr-2 transition-colors duration-300">
          Log In
        </button>
        <button id="continueBtn" class="bg-zinc-300 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-zinc-400 dark:hover:bg-zinc-600 font-bold py-2 px-4 rounded transition-colors duration-300">
          Continue without logging in
        </button>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('loginBtn').addEventListener('click', () => {
        document.body.removeChild(overlay);
        resolve('login');
    });
    document.getElementById('continueBtn').addEventListener('click', () => {
        document.body.removeChild(overlay);
        resolve('continue');
    });
  });
}

function showGPAOverlay(gpa) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm';
  overlay.innerHTML = `
    <div class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center transition-colors duration-300 mx-10">
      <p class="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">Your GPA is: ${gpa}</p>
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

function showErrorOverlay(message) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm';
  overlay.innerHTML = `
    <div class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center transition-colors duration-300 mx-10">
      <p class="mb-4 text-xl font-bold text-red-500 dark:text-red-400">${message}</p>
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

export default function Calculator() {
  const [rowCount, setCount] = useState(6);
  const [refresh, setRefresh] = useState(false);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [resetSelect, setResetSelect] = useState(false);
  const [resetInputs, setResetInputs] = useState(false);

  const { googleSignIn, user } = UserAuth();

  const resetGrade = useRef(null);
  const resetCredit = useRef(null);
  const resetSubject = useRef(null);

  const resetRows = async () => {
    if (!user) {
        const userChoice = await showLoginOverlay();
        if (userChoice === 'login') {
            try {
                await googleSignIn();
                // Wait for the auth state to update
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Get the current user
                const currentUser = auth.currentUser;
                if (currentUser) {
                    if (!year || !semester) {
                        showErrorOverlay("Please select both year and semester before calculating GPA.");
                        return;
                    }
                    const email = currentUser.email;
                    const data = { final, gpa: GPA, year, semester };
                    await saveUserData(email, year, semester, data);
                    showGPAOverlay(GPA);
                } else {
                    showErrorOverlay("Login successful, but user data not available. Please try again.");
                }
            } catch (error) {
                console.log(error);
                showErrorOverlay("Login failed. Please try again.");
            }
        } else if (userChoice === 'continue') {
            // Show GPA without saving data, regardless of year and semester
            showGPAOverlay(GPA);
        }
    } else {
        // User is already logged in, check for year and semester
        if (!year || !semester) {
            showErrorOverlay("Please select both year and semester before calculating GPA.");
            return;
        }
        const email = user.email;
        const data = { final, gpa: GPA, year, semester };
        await saveUserData(email, year, semester, data);
        showGPAOverlay(GPA);
    }

    // Reset the form
    setCount(6);
    final.length = 0;
    setRefresh(!refresh);
    setResetInputs(true);

    setTimeout(() => {
        setResetSelect(true);
        setYear('');
        setSemester('');
        setTimeout(() => setResetSelect(false), 0);

        setResetInputs(false);
    }, 5000);
  };

  const handleReset = () => {
      resetRows();
      console.log(final);
  };

  useEffect(() => {
      for (let i = 0; i < rowCount; i++) {
      final[i] = { key: i + 1 };
      }
  }, [rowCount]);

  let rows = [];
  for (let i = 0; i < rowCount; i++) {
      const rowIndex = i + 1;
      rows.push(
      <Format
          count={rowIndex}
          key={rowIndex}
          rowIndex={rowIndex}
          resetGrade={resetGrade.current}
          resetCredit={resetCredit.current}
          resetSubject={resetSubject.current}
          resetInputs={resetInputs}
      />
      );
      rows.push(<CenteredHr key={`hr-${i}`} />);
  }
  rows.pop();

  return (
    <div className="grid grid-rows-[10%_8%_71%_11%] max-md:grid-rows-[12%_12.5%_57%_10%] max-md:text-sm w-11/12 h-[95%] rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <YearSem onYearChange={setYear} onSemesterChange={setSemester} reset={resetSelect} />
      <Header />
      <div id="render" className="space-y-1 mt-2 mb-11 pb-2 row-span-1 overflow-auto scroll-smooth">
        {rows}
      </div>
      <div className=" flex space-x-20 max-md:space-x-3">
        <CalculateBtn onReset={resetRows} />
        <AddRowBtn onClick={handleAddRow(setCount)} />
      </div>
    </div>
  );
}