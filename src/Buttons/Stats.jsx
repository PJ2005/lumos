import { IoStatsChart } from "react-icons/io5";

export default function Stats({ setActivePage }) {
    return(
        <>
            <div className=" rounded-md hover:bg-slate-500 hover:text-white mx-3 max-md:mx-12 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                <button onClick={() => setActivePage("stats")} className=" max-md:hidden w-full flex items-center h-10">
                    <IoStatsChart className=" ml-2 size-4" />
                    <span className=" mx-auto text-base font-mono">Stats</span>
                </button>
                <button onClick={() => setActivePage("stats")} className=" md:hidden w-full flex items-center h-10">
                    <span className=" mx-auto text-base font-mono flex"> Stats <IoStatsChart className=" ml-2 size-4" /> </span>
                </button>
            </div>
        </>
    )
}