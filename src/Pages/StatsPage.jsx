import React, { useEffect, useState, useRef } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { db } from '../firebaseConfig';
import { IoIosArrowDropdown } from "react-icons/io";

import './../CSS/Calculator.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Year = {
    'Y1_Sem 1': 'Year 1, Sem 1',
    'Y1_Sem 2': 'Year 1, Sem 2',
    'Y2_Sem 3': 'Year 2, Sem 3',
    'Y2_Sem 4': 'Year 2, Sem 4',
    'Y3_Sem 5': 'Year 3, Sem 5',
    'Y3_Sem 6': 'Year 3, Sem 6',
    'Y4_Sem 7': 'Year 4, Sem 7',
    'Y4_Sem 8': 'Year 4, Sem 8'
};

const subjectColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(94, 94, 94, 0.6)',
    'rgba(186, 85, 211, 0.6)',
    'rgba(30, 144, 255, 0.6)',
    'rgba(255, 192, 203, 0.6)'
];

const darkSubjectColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(94, 94, 94, 0.8)',
    'rgba(186, 85, 211, 0.8)',
    'rgba(30, 144, 255, 0.8)',
    'rgba(255, 192, 203, 0.8)'
];

export default function StatsPage() {
    const { user } = UserAuth();
    const [semestersData, setSemestersData] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const chartRefs = useRef({});

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const email = user.email;
                const userGPAsRef = collection(db, 'users', email, 'GPAs');
                const snapshot = await getDocs(userGPAsRef);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSemestersData(data);
            }
        };

        fetchData();

        return () => {
            Object.values(chartRefs.current).forEach(chartInstance => {
                if (chartInstance) {
                    chartInstance.destroy();
                }
            });
        };
    }, [user]);

    const toggleDropdown = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const renderChart = (data, index) => {
        const { id, final } = data;
    
        const labels = final.map((item) => item.subject);
        const grades = final.map((item) => item.grade);
    
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const backgroundColors = grades.map((_, i) => isDarkMode ? darkSubjectColors[i % darkSubjectColors.length] : subjectColors[i % subjectColors.length]);
    
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: `Grades for ${id}`,
                    data: grades,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
                    borderWidth: 1,
                },
            ],
        };
    
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: isDarkMode ? 'white' : '#000',
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => ({
                                    text: label,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    hidden: false,
                                    lineCap: 'butt',
                                    lineDash: [],
                                    lineDashOffset: 0,
                                    lineJoin: 'miter',
                                    lineWidth: 1,
                                    strokeStyle: data.datasets[0].borderColor[i],
                                    pointStyle: 'rect',
                                    rotation: 0,
                                    color: isDarkMode ? 'white' : '#000'
                                }));
                            }
                            return [];
                        }
                    }        
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'category',
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 14,
                        },
                        color: isDarkMode ? 'white' : '#000',
                        maxRotation: 90,
                        minRotation: 0
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 14,
                        },
                        color: isDarkMode ? 'white' : '#000'
                    }
                }
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 0,
                    bottom: 0
                }
            }
        };
    
        return (
            <Bar
                data={chartData}
                options={chartOptions}
                key={`chart-${id}`}
                ref={(element) => {
                    if (element) {
                        if (chartRefs.current[id]) {
                            chartRefs.current[id].destroy();
                        }
                        chartRefs.current[id] = element.chartInstance;
                    }
                }}
            />
        );
    };

    return (
        <div className="w-full h-full overflow-hidden p-4 transition-colors duration-300 dark:bg-slate-800 dark:text-white">
            {!user ? (
                <div className="flex justify-center items-center h-full">
                    <h2 className="text-lg md:text-xl lg:text-n">Login to view graphs of the saved data</h2>
                </div>
            ) : semestersData.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">No data entered yet to show graphs. Enter data to view graphs.</h2>
                </div>
            ) : (
                <div className="w-full h-full overflow-y-auto space-y-4">
                    {semestersData.map((data, index) => (
                        <div key={data.id} className="rounded-lg shadow-md transition-colors duration-300 dark:bg-slate-700">
                            <button
                                onClick={() => toggleDropdown(data.id)}
                                className="w-full text-left p-4 transition-colors duration-300 dark:hover:bg-slate-600 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 focus:outline-none flex items-center rounded-t-lg dark:text-slate-300"
                            >
                                <div className="flex-grow flex justify-center">
                                    <h2 className="text-sm md:text-base lg:text-lg font-semibold truncate mr-2">{Year[data.id]}</h2>
                                </div>
                                <span 
                                    className="transition-transform duration-300 ease-in-out flex-shrink-0 dark:text-slate-400 text-gray-600"
                                    style={{ transform: expandedId === data.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                >
                                    <IoIosArrowDropdown size={20} />
                                </span>
                            </button>
                            <div 
                                className="overflow-hidden transition-all duration-700 ease-in-out dark:bg-slate-800"
                                style={{ 
                                    maxHeight: expandedId === data.id ? '1000px' : '0',
                                    opacity: expandedId === data.id ? 1 : 0,
                                }}
                            >
                                <div className="p-4 flex justify-center">
                                    <div className="w-full max-w-3xl" style={{ height: '300px' }}>
                                        {renderChart(data, index)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}