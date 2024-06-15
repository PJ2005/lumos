import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Calculate from "../Buttons/Calculate";
import Stats from "../Buttons/Stats";
import Login from "../Buttons/Login";
import Home from "../Buttons/Home";

export default function SideBarMin({ setActivePage, isVisible }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50">
      <div className="p-2">
        {isOpen ? (
          <AiOutlineClose
            className="text-2xl text-gray-800 cursor-pointer transition-transform duration-300 ease-in-out transform hover:rotate-90"
            onClick={toggleMenu}
          />
        ) : (
          <AiOutlineMenu
            className="text-2xl text-gray-800 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
            onClick={toggleMenu}
          />
        )}
      </div>
      <div 
        className={`fixed inset-0 bg-slate-300 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col justify-between p-5">
          <div>
            <div className="flex justify-start mb-5">
              <AiOutlineClose
                className="text-2xl text-gray-800 cursor-pointer transition-transform duration-300 ease-in-out transform hover:rotate-90"
                onClick={toggleMenu}
              />
            </div>
            <div className="mt-5">
              <div className="mb-3">
                <Home setActivePage={() => handleMenuItemClick("home")} />
              </div>
              <div className="mb-3">
                <Calculate setActivePage={() => handleMenuItemClick("calculator")} />
              </div>
              <div>
                <Stats setActivePage={() => handleMenuItemClick("stats")} />
              </div>
            </div>
          </div>
          <div>
            <hr className="h-px border-0 bg-black mx-12 mb-2.5 opacity-30" />
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}