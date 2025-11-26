export const CardWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = 'grid grid-cols-[4.5rem_1fr]'
}) => (
  <div
    className={` gap-1 items-center bg-white p-1 border-2 border-gray-200 text-black ${className}`}
    children={children}
  />
);
