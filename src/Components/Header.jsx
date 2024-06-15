import { DarkMode } from "../Buttons/DarkMode";


export function Header() {
    return (
        <>
            <div className=" grid grid-cols-[93%_7%]">
                <h1 className=" flex justify-center items-center font-mono text-2xl font-bold">Lumos</h1>
                <div className=" flex justify-end mr-4">
                    <DarkMode />
                </div>
            </div>
        </>
    )
}