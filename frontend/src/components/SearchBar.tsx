import { useState } from "react";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  onSearch: (keyword: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="flex w-full justify-center">

      <div
        className="
        flex
        w-full
        max-w-3xl
        items-center
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-2xl
        ring-1
        ring-white/20
        "
      >

        <div className="px-5 text-blue-500">
          <FaSearch size={22} />
        </div>

        <input
          className="
flex-1
bg-transparent
py-5
pr-4
text-lg
font-medium
text-gray-700
outline-none
placeholder:text-gray-400
"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
  onClick={handleSearch}
  className="
  m-2
  rounded-xl
  bg-blue-600
  px-8
  py-3
  text-lg
  font-semibold
  text-white
  transition-all
  duration-300
  hover:scale-105
  hover:bg-blue-700
  active:scale-95
  "
>
  Tìm kiếm
</button>

      </div>

    </div>
  );
}

export default SearchBar;