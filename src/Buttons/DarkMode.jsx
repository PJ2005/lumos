import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import classNames from "classnames";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect, useState } from "react";

export function DarkMode() {
    const { dark, toggleDarkMode } = useDarkMode();
    const [isDarkMode, setIsDarkMode] = useState(dark);

    useEffect(() => {
        setIsDarkMode(dark);
    }, [dark]);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        toggleDarkMode();
    };

    return (
        <div className="h-14 w-20 flex items-center justify-center">
            <div className={classNames("w-14 h-7 rounded-full relative", { 'bg-slate-900': isDarkMode, 'bg-zinc-300': !isDarkMode })} onClick={handleToggle}>
                <span className={classNames("absolute flex items-center justify-center cursor-pointer h-7 w-7 bg-white rounded-full transition-all duration-500", { 'left-7': isDarkMode, 'left-0': !isDarkMode })}>
                    {isDarkMode ? <MdOutlineDarkMode className="text-black" /> : <MdOutlineLightMode className="text-black" />}
                </span>
            </div>
        </div>
    );
}

// import { useDarkMode } from "../context/DarkModeContext";
// import { useEffect, useState } from "react";
// import "./../CSS/DarkMode.css"; // Ensure to import the CSS file

// export function DarkMode() {
//     const { dark, toggleDarkMode } = useDarkMode();
//     const [isDarkMode, setIsDarkMode] = useState(dark);

//     useEffect(() => {
//         setIsDarkMode(dark);
//     }, [dark]);

//     const handleToggle = () => {
//         setIsDarkMode(!isDarkMode);
//         toggleDarkMode();
//     };

//     return (
//         <button
//             className="theme-toggle"
//             type="button"
//             title="Toggle theme"
//             aria-label="Toggle theme"
//             onClick={handleToggle}
//         >
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 aria-hidden="true"
//                 width="1em"
//                 height="1em"
//                 fill="currentColor"
//                 stroke-linecap="round"
//                 className="theme-toggle__classic"
//                 viewBox="0 0 32 32"
//             >
//                 <clipPath id="theme-toggle__classic__cutout">
//                     <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
//                 </clipPath>
//                 <g clip-path="url(#theme-toggle__classic__cutout)">
//                     <circle cx="16" cy="16" r="9.34" />
//                     <g stroke="currentColor" stroke-width="1.5">
//                         <path d="M16 5.5v-4" />
//                         <path d="M16 30.5v-4" />
//                         <path d="M1.5 16h4" />
//                         <path d="M26.5 16h4" />
//                         <path d="m23.4 8.6 2.8-2.8" />
//                         <path d="m5.7 26.3 2.9-2.9" />
//                         <path d="m5.8 5.8 2.8 2.8" />
//                         <path d="m23.4 23.4 2.9 2.9" />
//                     </g>
//                 </g>
//             </svg>
//         </button>
//     );
// }

