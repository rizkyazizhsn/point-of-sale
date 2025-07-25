import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PaginationDataTable from "./pagination-data-table";

type Props = {
  header: string[];
  data: (string | React.ReactNode)[][];
  isLoading?: boolean;
  totalPages: number;
  currentPage: number;
  currentLimit: number;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
};

const DataTable = ({ header, data, isLoading, currentLimit, totalPages, currentPage, onChangePage, onChangeLimit }: Props) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Card className="p-0">
        <Table className="w-full rounded-lg overflow-hidden">
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              {header.map((column) => (
                <TableHead key={`th-${column}`} className="px-6 py-3">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={`tr-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={`tc-${rowIndex}-${cellIndex}`} className="px-6 py-3">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={header.length} className="h-24 text-center">
                  No Result Data.
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={header.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex items-center justify-between">
        <div></div>
        {totalPages > 1 && (
          <PaginationDataTable currentPage={currentPage} currentLimit={currentLimit} totalPages={totalPages} onChangePage={onChangePage} onChangeLimit={onChangeLimit} />
        )}
      </div>
    </div>
  );
};

export default DataTable;
