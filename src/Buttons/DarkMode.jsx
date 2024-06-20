// DarkMode.jsx
import { MdWbSunny } from "react-icons/md";
import { HiMiniMoon } from "react-icons/hi2";
import classNames from 'classnames';
import { useDarkMode } from '../context/DarkModeContext';
import { useEffect, useState } from 'react';

export function DarkMode() {
    const { dark, toggleDarkMode } = useDarkMode();
    const [isDarkMode, setIsDarkMode] = useState(dark);

    useEffect(() => {
        setIsDarkMode(dark);
    }, [dark]);

    const handleToggle = () => {
        toggleDarkMode();
    };

    return (
        <div className='h-14 w-20 flex items-center justify-center'>
            <div
                className={classNames(
                    'w-14 h-7 rounded-full relative bg-gradient-to-r transition-all duration-500',
                    {
                        'from-slate-700 to-slate-500': isDarkMode,
                        'from-zinc-300 to-zinc-200': !isDarkMode,
                    }
                )}
                onClick={handleToggle}
            >
                <span
                    className={classNames(
                        'absolute flex items-center justify-center cursor-pointer h-7 w-7 bg-white rounded-full transition-all duration-500',
                        { 'left-7': isDarkMode, 'left-0': !isDarkMode }
                    )}
                >
                    <div
                        className={classNames(
                            'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500',
                            {
                                'bg-slate-700': isDarkMode,
                                'bg-zinc-300': !isDarkMode,
                            }
                        )}
                    >
                        <div
                            className={classNames(
                                'flex items-center justify-center transition-all duration-500',
                                {
                                    'rotate-0': isDarkMode,
                                    'rotate-180': !isDarkMode,
                                }
                            )}
                        >
                            {isDarkMode ? (
                                <HiMiniMoon className="text-white" />
                            ) : (
                                <MdWbSunny />
                            )}
                        </div>
                    </div>
                </span>
            </div>
        </div>
    );
}