import { useEffect } from "react";
import { useState } from "react";
import useWindowDimensions from "../Car/useWindowDimensions";
import TabSelector from "../utilitycomponent/tabSelector";
import SingleReservation from "./SingleReservation";

const testUpcomingReservation = {
    'date' : '23 January 2023',
    'evcp' : 'evcp1',
    'address' : 'Via Gran Sasso 1, Milano',
    'start_time' : '13.00',
    'end_time' : '16.00',
    'connector' : 'CCS2',
    'power' : '100kW',
    'cost' : null,
    'kw_charged' : null,
}

const testPastReservation = {
    'date' : '01 March 2020',
    'evcp' : 'evcp1',
    'address' : 'Via Gran Sasso 1, Milano',
    'start_time' : '13.00',
    'end_time' : '16.00',
    'connector' : 'CCS2',
    'power' : '100kW',
    'cost' : '52,43€',
    'kw_charged' : '65.4'
}

export default function Reservation (){
    const {height, width} = useWindowDimensions()
    const [currentTab, setCurrentTab] = useState('Upcoming');

    const handleTabChange = tab => {
        setCurrentTab(tab);
    };

    useEffect(() => {
        if (currentTab === 'Upcoming') {
            const upcomingReservations = document.querySelectorAll('.Upcoming');
            upcomingReservations.forEach(reservation => reservation.classList.remove('hidden'));
            const pastReservations = document.querySelectorAll('.Past');
            pastReservations.forEach(reservation => reservation.classList.add('hidden'));
        } else {
            const pastReservations = document.querySelectorAll('.Past');
            pastReservations.forEach(reservation => reservation.classList.remove('hidden'));
            const upcomingReservations = document.querySelectorAll('.Upcoming');
            upcomingReservations.forEach(reservation => reservation.classList.add('hidden'));
        }
    }, [currentTab])

    return <>
    <div className="flex flex-col">
        <div className="flex items-center justify-center m-4 md:m-8">
            <p className="font-medium text-2xl dark:text-tertiary text-dk-secondary">My Reservation</p>

        </div>
        <div className="max-sm:flex-col md:flex  md:h-full">
            <TabSelector tabs={['Upcoming', 'Past']} onTabChange={handleTabChange}/>
            <div className="flex w-full justify-center h-min">
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-4 w-full overflow-hidden m-6">
                    
                    <SingleReservation reservation={testUpcomingReservation}/>
                    <SingleReservation reservation={testUpcomingReservation}/>
                    <SingleReservation reservation={testUpcomingReservation}/>
                    <SingleReservation reservation={testUpcomingReservation}/>
                    <SingleReservation reservation={testUpcomingReservation}/>
                    <SingleReservation reservation={testPastReservation}/>
                    <SingleReservation reservation={testPastReservation}/>
                    <SingleReservation reservation={testPastReservation}/>
                    <SingleReservation reservation={testPastReservation}/>
                    
                </div>
            </div>
        </div>
        
    </div>
    </>
}