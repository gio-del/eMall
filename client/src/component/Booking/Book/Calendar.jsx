import { useState, useEffect } from "react";
import { RadioDate } from "./RadioDate";
import './Calendar.css'

export default function Calendar() {

    const [selectedDate, setSelectedDate] = useState()
    const dates = []
   


    const selectableDates = () => {
        const startDate = new Date()
        let content = [];
        for (let i = 0; i < 3; i++) {
            dates.push(new Date(startDate.getTime() + (1 + i) * 24 * 60 * 60 * 1000).getDate())
            const values = {
                id : `date-${new Date(startDate.getTime() + (1 + i) * 24 * 60 * 60 * 1000).getDate()}`,
                day : `${new Date(startDate.getTime() + (1 + i) * 24 * 60 * 60 * 1000).getDate()}`,
                name : `${new Date(startDate.getTime() + (1 + i) * 24 * 60 * 60 * 1000).toString().split(' ')[0]}`,
                month : `${new Date(startDate.getTime() + (1 + i) * 24 * 60 * 60 * 1000).toString().split(' ')[1]}`
        }
            content.push(<RadioDate 
                date={values}
                onChange={() => setSelectedDate(values.id)}/>);
        }
        return content;
    };

    useEffect(() => {
        dates.forEach((type) => {
          document
            .getElementById(`date-${selectedDate}`)
            ?.classList.remove('checked')
        })
        document
          .getElementById(`date-${selectedDate}`)
          ?.classList.add('checked')
      }, [selectedDate])
    




    return <>
        <div className="w-full overflow-x-hidden">
            <div className="w-full calendar-container flex md:justify-center ml-4 mt-6 mb-8">
                {selectableDates()}
            </div>
        </div>
    </>
}