export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (value: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${
              number === currentPage ? "text-bold text-amber-500" : ""
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(number);
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Pagination;
