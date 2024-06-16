import Calculate from "../Buttons/Calculate";
import Home from "../Buttons/Home";
import Login from "../Buttons/Login";
import Stats from "../Buttons/Stats";

export default function SideBar({ setActivePage }) {
    return(
        <>
            <div className=" grid grid-rows-[91%_9%] bg-slate-300 dark:bg-slate-700 dark:text-gray-200 h-lvh hover:transition-all duration-300 ease-in-out rounded-r-xl rounded-b-xl">
                <div className=" mt-5">
                    <div className=" mb-3">
                        <Home setActivePage={setActivePage}/>
                    </div>
                    <div className=" mb-3">
                        <Calculate setActivePage={setActivePage} />
                    </div>
                    <div>
                        <Stats setActivePage={setActivePage} />
                    </div>
                </div>
                <div>
                    <hr className=" h-px border-0 bg-black dark:bg-gray-200 mx-12 mb-2.5 opacity-30" />
                    <Login />
                </div>
            </div>
        </>
    )
}
