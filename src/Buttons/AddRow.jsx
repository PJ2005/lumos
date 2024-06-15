import { FiPlus } from "react-icons/fi";

export function AddRowBtn({ onClick }) {
    return(
        <>
            <div className=' bg-zinc-300 h-10 rounded-lg flex justify-center items-center w-full'>
                <button className=' w-full h-full flex justify-between items-center font-bold hover:shadow-md hover:scale-[1.01] hover:transition-all duration-300 ease-in-out' onClick={onClick}>
                    <span className=" mx-auto">Add Row</span>
                    <FiPlus size={26} style={{ marginRight: '25px' }}/>
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