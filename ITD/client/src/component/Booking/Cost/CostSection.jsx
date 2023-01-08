import ConnectorSVG from "../../utilitycomponent/ConnectorSVG";

export default function CostSection({connectors}) {
    return <>
        <div class="flex flex-col">
            {connectors.map((connector) => 

                <div class="flex-grow">
                    <div className="flex p-4">
                        <div className="flex flex-col border-2 rounded-2xl border-tertiary px-6">
                            <div className="flex flex-grow items-center justify-center">
                                <span className="text-center text-lg font-bold align-middle dark:text-tertiary">
                                    {connector.type}
                                </span>
                            </div>
                            <div className="flex flex-grow items-center justify-center">
                                <ConnectorSVG type={connector.type} />
                            </div>
                            <div className="flex flex-grow items-center justify-center">
                                <p className="text-center text-lg font-bold dark:text-tertiary">{connector.current}</p>
                            </div>

                        </div>

                        <div className="flex-col mx-auto py-4">
                            <div className="my-2">
                                <p className="text-sm font-regular text-dk-secondary dark:text-tertiary">Range per hour recharged</p>
                                <p className="text-md font-semibold text-dk-secondary dark:text-tertiary">106 km/h</p>
                            </div>
                            <div className="my-2">
                                <p className="text-sm font-regular text-dk-secondary dark:text-tertiary">Maximum output power</p>
                                <p className="text-md font-semibold text-dk-secondary dark:text-tertiary">{connector.power}</p>
                            </div>
                            <div className="my-2">
                                <p className="text-sm font-regular text-dk-secondary dark:text-tertiary">Cost for charging</p>
                                <p className="text-md font-semibold text-dk-secondary dark:text-tertiary">{connector.price}</p>
                            </div>
                            <div className="my-2">
                                <p className="text-sm font-regular text-dk-secondary dark:text-tertiary">Cost for parking</p>
                                <p className="text-md font-semibold text-dk-secondary dark:text-tertiary">{connector.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
}