type CardProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return (
    <div
      className="
        w-full
        max-w-md
        rounded-[32px]
        bg-white
        p-10
        shadow-2xl
        border
        border-gray-100
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
      "
    >
      {children}
    </div>
  );
}

export default Card;