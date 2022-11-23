


export function RadioDate(date) {
    return <>
        <div >
            <div className="flex items-center mx-4 my-4 ">
                <div className="text-center">
                    <p className="text-sm mb-2 text-dk-secondary dark:text-tertiary">{date.date.name}</p>
                    <input
                        type="checkbox"
                        id={date.date.day}
                        className="sr-only peer"
                    />
                    <label
                        className="flex rounded-full px-4 py-3
                                    dark:peer-checked:bg-dk-primary dark:text-tertiary dark:peer-checked:text-tertiary
                                    peer-checked:bg-dk-primary text-dk-secondary peer-checked:text-tertiary
                                    font-semibold cursor-pointer focus:outline-none"
                        for={date.date.day}
                    >
                        <span className="text-inherit w-full text-center text-xl">{date.date.day}</span>
                    </label>
                    <p className="font-regular mt-2 text-sm text-dk-secondary dark:text-tertiary">{date.date.month}</p>
                </div>
            </div>
        </div>
        

    </>
}

