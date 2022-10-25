export default function ConfirmButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <button onClick={onClick} className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
      {children}
    </button>
  );
}
