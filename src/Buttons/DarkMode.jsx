// Contains Code to toggle between light and dark mode

// Importing icons
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

import { useState } from "react";
import classNames from "classnames";

export function DarkMode() {

    // State for dark mode
    const [dark, setDark] = useState(false);

    // State for checking if DarkMode is selected
    const [isSelected, setIsSelected] = useState(false);

    // Used to Change to dark mode on click
    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    return (
        <div className=" h-14 w-20 flex items-center justify-center">

            {/* Onclick isSelected is changed to true and darkModeHandler is invoked to change to dark mode */}
            <div className={classNames("w-14 h-7 rounded-full", {'bg-slate-900': isSelected, 'bg-zinc-300': !isSelected})} onClick={() => { setIsSelected(!isSelected); darkModeHandler(); }}>
                <span className={classNames("flex items-center justify-center cursor-pointer h-7 w-7 bg-white rounded-full transition-all duration-500", { 'ml-7': isSelected, 'ml-0': !isSelected })} style={{ color: dark ? '#000000' : '#000000'}} >
                    {console.log(isSelected)}
                    {dark ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
                </span>
            </div>
        </div>
    );
}

/* 
Logic is - Set dark mode selection to be false by default.
*/