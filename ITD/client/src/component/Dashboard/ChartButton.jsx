import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export default function ChartButton({data, text}) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    return <>
    <div className='relative bg-white rounded-2xl w-full h-full flex hover:shadow-lg items-center justify-center overflow-hidden'>
            <div className='absolute  h-full flex-col p-4'>
                <div className='flex justify-center'>
                    <p className="text-dash-black font-semibold text-sm">{text}</p>
                </div>
                <div className='w-full h-full flex p-4'>
                    <Doughnut data={data} option={{responsive: true}}/>
                </div>
            </div>
        
    </div>
    </>
    
}