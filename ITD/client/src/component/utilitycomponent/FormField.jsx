export default function FormField({
  id,
  type,
  pattern,
  onChange,
  value,
  children,
  placeholder,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2" htmlFor={id}>
        {children}
      </label>
      <input
        className="border border-gray-400 p-2 rounded-lg w-full"
        id={id}
        type={type}
        value={value}
        pattern={pattern}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  )
}
