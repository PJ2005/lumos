import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import classNames from "classnames";
import { useDarkMode } from "../context/DarkModeContext";

export function DarkMode() {
    const { dark, toggleDarkMode } = useDarkMode();

    return (
        <div className="h-14 w-20 flex items-center justify-center">
            <div className={classNames("w-14 h-7 rounded-full", { 'bg-slate-900': dark, 'bg-zinc-300': !dark })} onClick={toggleDarkMode}>
                <span className={classNames("flex items-center justify-center cursor-pointer h-7 w-7 bg-white rounded-full transition-all duration-500", { 'ml-7': dark, 'ml-0': !dark })}>
                    {dark ? <MdOutlineDarkMode className=" text-black" /> : <MdOutlineLightMode className=" text-black" />}
                </span>
            </div>
        </div>
    );
}
