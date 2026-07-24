import type { ReactNode } from "react";

type CategoryCardProps = {
  icon: ReactNode;
  title: string;
  color: string;
  onClick: () => void;
};

function CategoryCard({
  icon,
  title,
  color,
  onClick,
}: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        group
        cursor-pointer
        rounded-[30px]
        bg-white
        p-10
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-3
        hover:shadow-2xl
        hover:scale-[1.02]
      "
    >
      {/* Icon */}
      <div
        className={`
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-3xl
          ${color}
          transition-all
          duration-300
          group-hover:rotate-6
          group-hover:scale-110
        `}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-8 text-4xl font-bold text-slate-800">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 text-lg leading-7 text-gray-500">
        Khám phá các mẹo hữu ích
      </p>
    </div>
  );
}

export default CategoryCard;