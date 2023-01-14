import ConnectorSVG from "../utilitycomponent/ConnectorSVG";

export default function SingleReservation (){
    return <>
        <div className="flex flex-col border-2 dark:border-searchInput rounded-3xl py-2 px-4">
            <div className="flex justify-between my-2">
                <div className="flex flex-col">
                    <p className="text-tertiary text-md font-medium">EVCP1</p>
                    <p className="text-tertiary text-sm">Via Gran Sasso, 1, Milano</p>
                </div>
                <div className="flex">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        width="48"
                        className="fill-dk-secondary dark:fill-tertiary"
                        viewBox="-24 -12 72 72"
                    > <path d="M16 30h3v-6.5h9.2v4.25L34 22l-5.8-5.8v4.3H17.5q-.65 0-1.075.425Q16 21.35 16 22Zm8 14.15q-.6 0-1.175-.2-.575-.2-.975-.6l-17.2-17.2q-.4-.4-.6-.975-.2-.575-.2-1.175 0-.6.2-1.175.2-.575.6-.975l17.2-17.2q.4-.4.975-.6.575-.2 1.175-.2.6 0 1.175.2.575.2.975.6l17.2 17.2q.4.4.6.975.2.575.2 1.175 0 .6-.2 1.175-.2.575-.6.975l-17.2 17.2q-.4.4-.975.6-.575.2-1.175.2Z" />
                    </svg>
                </div>
            </div>
            <div className="flex justify-between my-2">
                <div className="flex flex-col">
                    <p className="text-tertiary text-sm">From</p>
                    <p className="text-tertiary text-md font-medium">14.30</p>
                </div>
                <div className="border-b-2 border-white"></div>
                <div className="flex flex-col">
                    <p className="text-tertiary text-right text-sm">To</p>
                    <p className="text-tertiary text-right text-md font-medium">16.30</p>
                </div>
            </div>
            <div className="flex justify-between my-2">
                <div className="flex flex-col">
                    <p className="text-tertiary text-sm">Connector</p>
                    <p className="text-tertiary text-md font-medium">CCS 2</p>
                </div>
             
                <div className="flex flex-col">
                    <p className="text-tertiary text-right text-sm">Max Output</p>
                    <p className="text-tertiary text-right text-md font-medium">110kW</p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex bg-dk-primary rounded-xl items-center justify-center w-1/2 py-2">
                    <p className="text-tertiary font-medium">Start</p>
                </div>
            </div>
            
        </div>
    </>
}