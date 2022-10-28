export default function ConfirmButton({
  children,
  onClick,
  className,
  hidden,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <button onClick={onClick} className={"button " + className}>
      {children}
    </button>
  );
}
