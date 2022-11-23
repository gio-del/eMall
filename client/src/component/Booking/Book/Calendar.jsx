import { useState } from "react";
import { RadioDate } from "./RadioDate";

export default function Calendar() {

    const [startDate1, setStartDate1] = useState(new Date())
    const [startDate2, setStartDate2] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
    const [startDate3, setStartDate3] = useState(new Date(new Date().getTime() + 48 * 60 * 60 * 1000))
    const [startDate4, setStartDate4] = useState(new Date(new Date().getTime() + 72 * 60 * 60 * 1000))
    const [startDate5, setStartDate5] = useState(new Date(new Date().getTime() + 96 * 60 * 60 * 1000))


    return <>
        <div className="w-full">
            <div className="flex justify-start md:justify-center rounded-lg mt-4 mb-8">
                <RadioDate date={{
                    day: `${startDate1.getDate()}`,
                    name: `${startDate1.toString().split(' ')[0]}`,
                    month: `${startDate1.toString().split(' ')[1]}`,
                }} />
                <RadioDate date={{
                    day: `${startDate2.getDate()}`,
                    name: `${startDate2.toString().split(' ')[0]}`,
                    month: `${startDate2.toString().split(' ')[1]}`,
                }} />
                <RadioDate date={{
                    day: `${startDate3.getDate()}`,
                    name: `${startDate3.toString().split(' ')[0]}`,
                    month: `${startDate3.toString().split(' ')[1]}`,
                }} />
                <RadioDate date={{
                    day: `${startDate4.getDate()}`,
                    name: `${startDate4.toString().split(' ')[0]}`,
                    month: `${startDate4.toString().split(' ')[1]}`,
                }} />
                <RadioDate date={{
                    day: `${startDate5.getDate()}`,
                    name: `${startDate5.toString().split(' ')[0]}`,
                    month: `${startDate5.toString().split(' ')[1]}`,
                }} />
            </div>
        </div>
    </>
}