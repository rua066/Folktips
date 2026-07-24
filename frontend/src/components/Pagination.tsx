type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {

    return (

        <div className="mt-10 flex justify-center gap-2">

            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded border px-4 py-2"
            >
                ◀
            </button>

            {Array.from(
                { length: totalPages },
                (_, i) => (

                    <button
                        key={i}
                        onClick={() => onPageChange(i + 1)}
                        className={`rounded px-4 py-2 ${
                            currentPage === i + 1
                                ? "bg-blue-600 text-white"
                                : "border"
                        }`}
                    >
                        {i + 1}
                    </button>

                )
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded border px-4 py-2"
            >
                ▶
            </button>

        </div>

    );

}

export default Pagination;
