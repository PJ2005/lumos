import { HiOutlineHome } from "react-icons/hi2";

export default function Home({ setActivePage }) {
    return (
        <>
            <div className=" rounded-md hover:bg-slate-500 hover:dark:bg-slate-800 hover:text-white  mx-3 max-md:mx-12 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                <button onClick={() => setActivePage("home")} className=" w-full flex items-center h-10 max-md:hidden">
                    <HiOutlineHome className=" ml-2 size-5" />
                    <span className=" mx-auto text-base font-mono">Home</span>
                </button>
                <button onClick={() => setActivePage("home")} className=" w-full flex items-center justify-center h-10 md:hidden">
                    <span className=" flex mx-auto text-base font-mono"> Home <HiOutlineHome className=" ml-2 size-5" /> </span>
                </button>
            </div>
        </>
    )
}