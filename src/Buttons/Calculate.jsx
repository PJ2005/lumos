import { MdOutlineCalculate } from "react-icons/md";

export default function Calculate({ setActivePage }) {
    return(
        <>
            <div className=" rounded-md hover:bg-slate-500 hover:text-white hover:dark:bg-slate-800 dark:hover:text-gray-200 mx-3 max-md:mx-12 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                <button onClick={() => setActivePage("calculator")} className=" w-full flex items-center h-10 max-md:hidden">
                    <MdOutlineCalculate className=" ml-2 size-5" />
                    <span className=" mx-auto text-base font-mono">Calculate</span>
                </button>
                <button onClick={() => setActivePage("calculator")} className=" w-full flex items-center justify-center h-10 md:hidden">
                    <span className=" flex mx-auto text-base font-mono"> Calculate <MdOutlineCalculate className=" ml-2 size-5" /> </span>
                </button>
            </div>
        </>
    )
}
