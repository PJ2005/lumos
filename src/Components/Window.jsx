import { useState } from "react";
import Calculator from "../Pages/Calculator";
import { Header } from "./Header";
import SideBar from "./SideBar";
import SideBarMin from "./SideBarMin";
import HomePage from "../Pages/HomePage";
import StatsPage from "../Pages/StatsPage";

export default function Window() {
    const [activePage, setActivePage] = useState("home");

    return (
        <>
            <div className=' grid md:grid-cols-[20%_80%] max-md:grid-cols-[5%_95%] h-lvh font-mono'>
                <div className=' max-md:hidden md:block'>
                    <SideBar setActivePage={ setActivePage } /> {/* Pass the setActivePage function */}
                </div>
                <div className=' max-md:block max-md:h-fit md:hidden'>
                    <SideBarMin setActivePage={ setActivePage } /> {/* Pass the setActivePage function */}
                </div>
                <div className=' grid grid-rows-[7%_93%] h-lvh'>
                    <div>
                        <Header />
                    </div>
                    <div className='flex items-center justify-center animate-slidein'>
                        { activePage === "home" && <HomePage /> }
                        { activePage === "calculator" && <Calculator /> }
                        { activePage === "stats" && <StatsPage />}
                    </div>
                </div>
            </div>
        </>
    )
}
