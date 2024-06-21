// DeleteRow.jsx
import { FiMinus } from "react-icons/fi";

export function DeleteRowBtn({ onClick }) {
    return(
        <>
            <div className='bg-red-500 dark:bg-red-700 h-10 rounded-lg flex justify-center items-center w-full transition-all duration-300 ease-in-out'>
                <button 
                    className='w-full h-full flex justify-between items-center font-bold text-white hover:bg-red-600 dark:hover:bg-red-800 hover:shadow-md hover:scale-[1.01] transition-all duration-300 ease-in-out rounded-lg' 
                    onClick={onClick}
                >
                    <span className="mx-auto transition-colors duration-300 ease-in-out">Delete Row</span>
                    <FiMinus 
                        size={26} 
                        style={{ marginRight: '25px' }} 
                        className="text-white transition-colors duration-300 ease-in-out"
                    />
                </button>
            </div>
        </>
    );
}

export function handleDeleteRow(setCount, rowCount) {
    return () => {
        if (rowCount > 2) {
            setCount(prevCount => prevCount - 1);
        }
    };
}