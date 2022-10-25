export default function DeleteButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <button onClick={onClick} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
      {children}
    </button>
  );
}
