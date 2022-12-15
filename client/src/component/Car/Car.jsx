import carImage from '../../assets/Car.png'
import chademo from '../../assets/CHAdeMo.png'


export default function Car () {
    return <div >
        <div className="flex h-[calc(93vh-3.4rem)] md:h-[calc(100vh-3.4rem)] bg-dk-secondary w-full">
            <div className='flex w-full'>
                <div className='grid grid-flow-row grid-cols-2 md:grid-cols-3 w-full mb-16 md:mb-8 overflow-hidden'>
                    <div className='row-span-1 lg:row-span-1 flex justify-center items-center relative z-10'>
                        <div className=' h-full w-full absolute py-6 px-6 lg:w-2/3 lg:h-2/3'>
                            <div className='h-full w-full relative flex items-center justify-center'>
                                <div>
                                    <p className='text-tertiary text-center text-lg font-semibold'>Model 3</p>
                                    <p className='text-tertiary text-center text-md font-medium'>Tesla</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row-span-5 lg:row-span-4 relative flex items-center overflow-hidden'>
                        <div className='absolute w-full max-sm:right-[-50px] md:inset-0 flex items-center justify-center'>
                            <img className='object-contain relative w-full md:w-4/5 lg:w-3/5 z-10' src={carImage}></img>
                        </div>
                        
                        <div className='absolute max-sm:right-[-10px] right-0 w-full flex'>
                            <div className='relative flex items-center justify-center w-full'>
                                <div className='flex items-center justify-center bg-gradient-radial from-dk-secondary via-dk-secondary to-dk-gray rounded-full h-[50vw] w-[50vw] md:h-[32vw] md:w-[32vw] lg:h-[30vw] lg:w-[30vw] z-0'>
                                <div className='bg-gradient-radial from-dk-secondary via-dk-secondary to-dk-gray rounded-full h-[40vw] w-[40vw] md:h-[28vw] md:w-[28vw] lg:h-[25vw] lg:w-[25vw]  z-0'></div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='row-span-2 md:row-span-4 lg:row-span-3 flex justify-center items-center relative'>
                        <div className=' h-full w-full absolute py-2 px-8 md:w-4/5 md:h-4/5 lg:w-2/3 lg:h-2/3'>
                            <div className='bg-dk-gray rounded-3xl h-full w-full relative flex items-center justify-center'>
                                <div className='absolute flex items-center justify-center inset-x-0 top-2'>
                                    <div>
                                        <p className='text-center text-xl font-medium'>66%</p>
                                        <p className='text-md font-medium text-dk-secondary'>Battery</p>
                                    </div>
                                </div>
                                <div className='absolute flex bg-gradient-to-t from-dk-gray to-dk-primary rounded-3xl w-full h-2/3 border-[8px] border-dk-gray bottom-0 justify-center items-center'>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className='fill-yellow-300'
                                        height="48" 
                                        width="48">
                                        <path d="M19.95 42 22 27.9h-7.3q-.55 0-.8-.5t0-.95L26.15 6h2.05l-2.05 14.05h7.2q.55 0 .825.5.275.5.025.95L22 42Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row-span-2 md:row-span-3 lg:row-span-2 flex justify-center items-center relative'>
                        <div className=' h-full w-full absolute py-2 px-8 md:w-4/5 md:h-4/5 lg:w-2/3 lg:h-2/3'>
                            <div className='bg-dk-gray rounded-3xl h-full w-full flex items-center justify-center relative'>
                                <div className='absolute flex flex-col items-center inset-x-0 top-2'>
                                    <span className='text-lg font-medium'>CHAdeMo</span>
                                    <div className='bg-dk-primary px-5 py-1 rounded-full my-2'>
                                        <span className='text-xl font-medium text-tertiary'>56.8 kW</span>
                                    </div>

                                </div>
                                <div className='absolute right-0 bottom-0 w-full h-auto'>
                                    <img className="object-contain absolute right-0 bottom-0 w-4/5 lg:w-3/5 h-auto" src={chademo}></img>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className='row-span-1 flex justify-center items-center relative'>
                        <div className=' h-full w-full absolute py-5 px-8 md:w-4/5 md:h-4/5 lg:w-2/3 lg:h-2/3'>
                            <div className='bg-dk-nav rounded-2xl h-full w-full relative flex items-center justify-center'>
                                <div>
                                    <p className='text-tertiary text-center text-md font-medium'>Time left</p>
                                    <p className='text-tertiary text-center text-lg font-semibold'>34:42</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row-span-1 flex justify-center items-center relative'>
                        <div className=' h-full w-full absolute py-5 px-8 md:w-4/5 md:h-4/5 lg:w-2/3 lg:h-2/3'>
                            <div className='bg-dk-primary rounded-2xl h-full w-full relative flex items-center justify-center'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className='fill-tertiary'
                                        height="30"
                                        width="30"
                                        viewBox="0 0 50 50">
                                        <path d="M28.25 38V10H36v28ZM12 38V10h7.75v28Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}