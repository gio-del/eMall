import ConnectorSVG from "../utilitycomponent/ConnectorSVG";

export default function SingleReservation (){
    return <>
        <div className="flex flex-col border-2 dark:border-tertiary rounded-2xl">
            <div className="flex justify-between m-2">
                <div className="flex flex-col">
                    <p className="text-tertiary">EVCP1</p>
                    <p className="text-tertiary">Via Gran Sasso, 1, Milano</p>
                </div>
                <div className="flex bg-dk-primary rounded-xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        width="48"
                        className="fill-dk-secondary dark:fill-tertiary"
                        viewBox="0 0 48 48"
                    > <path d="M16 30h3v-6.5h9.2v4.25L34 22l-5.8-5.8v4.3H17.5q-.65 0-1.075.425Q16 21.35 16 22Zm8 14.15q-.6 0-1.175-.2-.575-.2-.975-.6l-17.2-17.2q-.4-.4-.6-.975-.2-.575-.2-1.175 0-.6.2-1.175.2-.575.6-.975l17.2-17.2q.4-.4.975-.6.575-.2 1.175-.2.6 0 1.175.2.575.2.975.6l17.2 17.2q.4.4.6.975.2.575.2 1.175 0 .6-.2 1.175-.2.575-.6.975l-17.2 17.2q-.4.4-.975.6-.575.2-1.175.2Z" />
                    </svg>
                </div>
            </div>
            <div className="flex justify-between m-2">
                <div className="flex flex-col">
                    <p className="text-tertiary">From</p>
                    <p className="text-tertiary">14.30</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-tertiary text-right">To</p>
                    <p className="text-tertiary">16.30</p>
                </div>
            </div>
            <div className="flex justify-between m-2">
                <div className="flex flex-col">
                    <p className="text-tertiary">From</p>
                    <p className="text-tertiary">14.30</p>
                </div>
          
                <div className="flex flex-col">
                    <p className="text-tertiary text-right">To</p>
                    <p className="text-tertiary">16.30</p>
                </div>
            </div>
        </div>
    </>
}