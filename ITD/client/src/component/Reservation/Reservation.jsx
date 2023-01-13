import useWindowDimensions from "../Car/useWindowDimensions";
import SingleReservation from "./SingleReservation";

export default function Reservation (){
    const { height, width } = useWindowDimensions();

    return <>
    <div className="flex flex-col"
                style= {{height : `calc(${height}px - 3.5rem`}}>
        <div className="flex items-center justify-center mt-8">
            <p className="font-medium text-2xl dark:text-tertiary text-dk-secondary">My Reservation</p>

        </div>
        <div className="flex justify-center">
            <ul className="mt-6 select-none cursor-pointer inline-flex justify-around w-full md:w-4/5 lg:w-3/5 dark:text-tertiary text-dk-secondary font-light border-b-2 text-center dark:border-b-tertiary border-b-dk-secondary">
                <li
                    id="tab-0"
                    className="mx-2 border-b-0 dark:border-b-tertiary border-b-dk-secondary w-1/5 hover:border-b-2 hover:border-b-searchInput dark:hover:border-b-tertiary"
                >
                    Past
                </li>
                <li
                    id="tab-1"
                    className="mx-2 border-b-2 dark:border-b-tertiary border-b-dk-secondary w-1/5 hover:border-b-2 hover:border-b-searchInput dark:hover:border-b-tertiary font-bold "
                >
                    Upcoming
                </li>
            </ul>
        </div>
        
        <div className="flex w-full justify-center mt-4">
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-4/5 lg:w-3/5 overflow-hidden m-2">
                <SingleReservation />
                <SingleReservation />
                <SingleReservation />
            </div>
        </div>
    </div>
    </>
}