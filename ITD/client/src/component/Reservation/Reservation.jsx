import useWindowDimensions from "../Car/useWindowDimensions";
import SingleReservation from "./SingleReservation";

export default function Reservation (){
    const { height, width } = useWindowDimensions();

    return <>
    <div className="flex flex-col"
                style= {{height : `calc(${height}px - 3.5rem`}}>
        <div className="flex items-center justify-center">
            <p className="font-medium text-2xl dark:text-tertiary text-dk-secondary">My Reservation</p>

        </div>
        <div className="flex  w-full">
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-x-4 w-full overflow-hidden mt-4">
                <SingleReservation/>
                <SingleReservation/>
                <SingleReservation/>
            </div>
        </div>
    </div>
    </>
}