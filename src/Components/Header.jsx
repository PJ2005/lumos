import { DarkMode } from "../Buttons/DarkMode";

export function Header() {
    return (
        <>
            <div className="grid grid-cols-[93%_7%] bg-white dark:bg-slate-800 transition-colors duration-300">
                <h1 className="flex justify-center items-center font-mono text-2xl font-bold text-black dark:text-gray-200 transition-colors duration-300">
                    Lumos
                </h1>
                <div className="flex justify-end mr-4">
                    <DarkMode />
                </div>
            </div>
        </>
    )
}