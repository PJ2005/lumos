import { FiPlus } from "react-icons/fi";

export function AddRowBtn({ onClick }) {
    return(
        <>
            <div className='bg-zinc-300 dark:bg-zinc-700 h-10 rounded-lg flex justify-center items-center w-full transition-all duration-300 ease-in-out'>
                <button 
                    className='w-full h-full flex justify-between items-center font-bold text-gray-800 dark:text-gray-200 hover:bg-zinc-400 dark:hover:bg-zinc-600 hover:shadow-md hover:scale-[1.01] transition-all duration-300 ease-in-out rounded-lg' 
                    onClick={onClick}
                >
                    <span className="mx-auto transition-colors duration-300 ease-in-out">Add Row</span>
                    <FiPlus 
                        size={26} 
                        style={{ marginRight: '25px' }} 
                        className="text-gray-800 dark:text-gray-200 transition-colors duration-300 ease-in-out"
                    />
                </button>
            </div>
        </>
    );
}

export function handleAddRow(setCount) {
    return () => {
        setCount(prevCount => prevCount + 1);
    };
}