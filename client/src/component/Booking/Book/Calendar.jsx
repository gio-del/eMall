import { useState, useEffect } from "react";
import { RadioDate } from "./RadioDate";
import './Calendar.css'

export default function Calendar() {

    const [selectedDate, setSelectedDate] = useState()

    const dates = []

    

    

  const selectableDates = () => {
      const startDate = new Date()
      for (let i = 0; i < 2; i++) {
          const currentDate = new Date(startDate.getTime() + (1 + i) * 24 * 60 * 60 * 1000)
          const value = {
              id : `${currentDate.getDate()}`,
              day : `${currentDate.getDate()}`,
              name : `${currentDate.toString().split(' ')[0]}`,
              month : `${currentDate.toString().split(' ')[1]}`
          }
          dates.push(value)
      }
      return dates;
  };
    

    useEffect(() => {
        const datesIds = dates.map((uniqueDay) => uniqueDay.id)
        datesIds.forEach((id) => {
            if(document.getElementById(`date-${id}`).checked) {
                console.log("rimuovo")
            }
         
        })
        console.log(document.getElementById(`date-${setSelectedDate}`))
        document.getElementById(`date-${setSelectedDate}`)?.classList.add('checked')
      }, [selectedDate])

    return <>
        <div className="w-full overflow-x-hidden">
            <div className="calendar-container w-full flex md:justify-center ml-4 mt-6 mb-8">
            {selectableDates().map((uniqueDay) => (
                    <div key={uniqueDay.id} className="flex items-center mr-8 overflow-x-hidden">
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
        </div>
    </>
}

/*
{selectableDates().map((singleDay) => (
                    <div key={singleDay.id}>
                        
                    </div>
                ))}
*/