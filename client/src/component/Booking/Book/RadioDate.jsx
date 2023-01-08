

export function RadioDate({id, onChange}) {
    return <>
        <input
            type="checkbox"
            id={id}
            value=""
            className="sr-only peer hidden"
            onChange={onChange}
        />
    </>
}

