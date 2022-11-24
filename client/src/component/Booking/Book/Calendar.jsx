import { useState, useEffect, useRef } from "react";
import { RadioDate } from "./RadioDate";
import './Calendar.css'

export default function Calendar() {

    const [selectedDate, setSelectedDate] = useState()
    const dates = []

    const onWheel = e => {
        const container = scrollRef.current;
        const containerScrollPosition = scrollRef.current.scrollLeft;
    
        container.scrollTo({
          top: 0,
          left: containerScrollPosition + e.deltaY,
        });
      };
    
    const scrollRef = useRef(null);
      
    const selectableDates = () => {
        const startDate = new Date()
        for (let i = 0; i < 10; i++) {
            const currentDate = new Date(startDate.getTime() + (1 + i) * 24 * 60 * 60 * 1000)
            const value = {
                id: `${currentDate.getDate()}`,
                day: `${currentDate.getDate()}`,
                name: `${currentDate.toString().split(' ')[0]}`,
                month: `${currentDate.toString().split(' ')[1]}`
            }
            dates.push(value)
        }
        return dates;
    };

    const scroll = (scrollOffset) => {
        scrollRef.current.scrollLeft += scrollOffset;
      };


    useEffect(() => {
        const datesIds = dates.map((uniqueDay) => uniqueDay.id)
        datesIds.forEach((id) => {
            if (document.getElementById(`date-${id}`).checked) {
                console.log("rimuovo")
            }

        })
        console.log(document.getElementById(`date-${setSelectedDate}`))
        document.getElementById(`date-${setSelectedDate}`)?.classList.add('checked')
    }, [selectedDate])

    return <>
        <div className="flex-row w-full">
            <div className="flex">
                <button className="bg-red max-sm:hidden" onClick={() => scroll(-60)}>
                    <div className="border-2 border-tertiary py-2 mr-1 rounded-lg shadow-md mb-4 hover:bg-dk-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" className="fill-tertiary"
                        viewBox="3 5 40 40">
                        <path d="M28.1 36.45 15.55 23.9 28.1 11.35l2.6 2.6-9.95 9.95 9.95 9.95Z"/></svg>
                    </div>
                </button>

                <div className="container-scroll overflow-scroll flex my-6 mr-2" id="container"
                ref={scrollRef}
                onWheel={onWheel}>
                {selectableDates().map((uniqueDay) => (
                    <div key={uniqueDay.id} className="relative px-3 w-full left-0">
                        <div className="text-center">
                            <p className="text-sm mb-2 text-dk-secondary dark:text-tertiary">{uniqueDay.name}</p>
                            <RadioDate
                                id={`date-${uniqueDay.day}`}
                                onChange={() => setSelectedDate(uniqueDay.id)}
                            />
                            <label
                                className="flex rounded-full px-4 py-3
                                    dark:peer-checked:bg-dk-primary dark:text-tertiary dark:peer-checked:text-tertiary
                                    peer-checked:bg-dk-primary text-dk-secondary peer-checked:text-tertiary
                                    font-semibold cursor-pointer focus:outline-none"
                                for={`date-${uniqueDay.day}`}
                            >
                                <span className="text-inherit w-full text-center text-xl">{uniqueDay.day}</span>
                            </label>
                            <p className="font-regular mt-2 text-sm text-dk-secondary dark:text-tertiary">{uniqueDay.month}</p>
                        </div>
                    </div>
                ))}

                
                </div>

                <button className="bg-red max-sm:hidden" onClick={() => scroll(60)}>
                    <div className="border-2 border-tertiary py-2 mr-1 rounded-lg shadow-md mb-4 hover:bg-dk-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" className="fill-tertiary"
                            viewBox="0 5 40 40">
                            <path d="m18.75 36.45-2.6-2.6 9.95-9.95-9.95-9.95 2.6-2.6L31.3 23.9Z" />
                        </svg>
                    </div>
                
                </button>
            </div>
            
            
            
        </div>
    </>
}
