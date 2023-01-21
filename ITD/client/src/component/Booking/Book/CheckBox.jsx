export default function CheckBox({ id, label, onChange }) {
  function handleChange(e) {
    return console.log('button clicked');
  }

  return (
    <div className="w-full">
      <input
        onChange={(e) => {
          handleChange(e)
        }}
        type="checkbox"
        id={id}
        className="sr-only peer"
      />
      <label
        className="flex px-5 py-2
        dark:bg-dk-secondary dark:peer-checked:bg-tertiary dark:text-white dark:peer-checked:text-dk-secondary dark:border dark:border-tertiary
        bg-tertiary peer-checked:bg-dk-primary text-dk-secondary peer-checked:text-tertiary border border-dk-secondary peer-checked:border-transparent
        font-semibold rounded-xl cursor-pointer focus:outline-none"
        htmlFor={id}
      >
        <span className="text-inherit w-full text-center">{label}</span>
      </label>
    </div>
  )
}
