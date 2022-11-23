export default function RadioComponent({ id, children, onChange }) {
  return (
    <>
      <input
        onChange={onChange}
        type="checkbox"
        id={id}
        value=""
        className="hidden"
      />
      {children}
    </>
  )
}
