export default function RadioButton({ role, name, setRole }) {
  return (
    <label
      className={`inline-flex rounded-xl items-center cursor-pointer ${
        role === name ? 'bg-dk-primary' : ''
      }`}
      htmlFor={`${name}-radio`}
    >
      <input
        id={`${name}-radio`}
        type="radio"
        value={`${name}`}
        className="hidden"
        checked={role === name}
        onChange={(e) => setRole(e.target.value)}
      />
      <span className="p-2 text-center text-xl border-2 rounded-xl border-dk-primary">
        {name}
      </span>
    </label>
  )
}
