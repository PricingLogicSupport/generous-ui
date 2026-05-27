import { Button } from "./button";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const safePageCount = Math.max(1, pageCount);
  const safePage = Math.min(Math.max(1, page), safePageCount);

  return (
    <nav className="gui-pagination" aria-label="Pagination">
      <Button disabled={safePage <= 1} onClick={() => onPageChange(safePage - 1)}>
        Previous
      </Button>
      <span>
        Page <strong>{safePage}</strong> of <strong>{safePageCount}</strong>
      </span>
      <Button disabled={safePage >= safePageCount} onClick={() => onPageChange(safePage + 1)}>
        Next
      </Button>
    </nav>
  );
}
