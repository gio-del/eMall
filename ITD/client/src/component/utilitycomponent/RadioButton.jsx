export default function RadioButton({ role, name, setRole }) {
  return (
    <label
      className={`inline-flex items-center ${
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
      <span className="p-2 text-center text-xl border-2 border-dk-secondary">
        {name}
      </span>
    </label>
  )
}
