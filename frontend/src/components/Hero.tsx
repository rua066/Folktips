import SearchBar from "./SearchBar";

type HeroProps = {
  onSearch: (keyword: string) => void;
};

function Hero({ onSearch }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 py-28 text-center text-white">

      <div className="mx-auto max-w-5xl px-6">

        <h1 className="text-7xl font-extrabold tracking-tight">
          FolkTips
        </h1>

        <h2 className="mt-6 text-4xl font-bold">
          Kho tàng mẹo dân gian Việt Nam
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-10 text-blue-100">
          Khám phá những mẹo dân gian hữu ích được lưu truyền qua nhiều thế hệ.
          <br />
          Chia sẻ kinh nghiệm về sức khỏe, gia đình, nhà bếp và làm vườn
          một cách đơn giản và dễ áp dụng.
        </p>

        <div className="mt-16">
          <SearchBar onSearch={onSearch} />
        </div>

      </div>

    </section>
  );
}

export default Hero;