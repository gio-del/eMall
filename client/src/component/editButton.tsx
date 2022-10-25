export default function EditButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >
      {children}
    </button>
  );
}
