import { CiLogin } from "react-icons/ci";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

export default function Login() {
    const { googleSignIn, user, logOut } = UserAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {!user?.displayName ? (
                <div className="rounded-md hover:bg-slate-500 hover:text-white mx-3 max-md:mx-12 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                    <button onClick={handleGoogleSignIn} className="max-md:hidden w-full flex items-center h-10">
                        <span className="mx-auto text-base font-mono">Login</span>
                        <CiLogin className="mr-5 size-5" />
                    </button>
                    <button onClick={handleGoogleSignIn} className="md:hidden w-full flex items-center h-10">
                        <span className="mx-auto text-base font-mono flex">Login <CiLogin className="ml-2 size-5" /></span>
                    </button>
                </div>
            ) : (
                <div className="relative mx-3 max-md:mx-12">
                    <div className="rounded-md hover:bg-slate-500 hover:dark:bg-slate-800 dark:text-gray-200 hover:dark:text-gray-200 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full flex items-center h-12"
                        >
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-7 h-7 rounded-full mx-1"
                            />
                            <span className="mx-auto font-mono my-1">{user.displayName}</span>
                            {dropdownOpen ? (
                                <AiOutlineDown className="ml-1 mr-1 size-5" />
                            ) : (
                                <AiOutlineUp className="ml-1 mr-1 size-5" />
                            )}
                        </button>
                    </div>
                    {dropdownOpen && (
                        <div
                            className={`absolute bottom-full mb-2 w-full rounded-md shadow-lg bg-slate-300 dark:bg-slate-900 hover:dark:bg-slate-800 text-black dark:text-gray-200 animate-fadeIn hover:scale-105 transition-all duration-300 ease-in-out`}
                        >
                            <button
                                onClick={handleLogOut}
                                className="w-full rounded-md hover:bg-slate-500 hover:text-white hover:dark:bg-slate-800 dark:bg-slate-700 dark:text-gray-200 transition-colors duration-300 ease-in-out flex items-center h-10 justify-center"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}