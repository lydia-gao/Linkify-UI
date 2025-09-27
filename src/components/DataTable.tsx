interface DataTableProps {
  headers: string[];
  data: Array<Record<string, string | number>>;
  title?: string;
}

export default function DataTable({ headers, data, title }: DataTableProps) {
  return (
    <div className="bg-white shadow rounded-md p-4">
      {title && <p className="font-bold text-gray-800 mb-4">{title}</p>}
      <table className="w-full border-collapse">
        <thead className="text-sm">
          <tr className="border-b bg-gray-50">
            {headers.map((header, index) => (
              <th key={index} className="py-3 px-2 font-medium text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y text-xs">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 1 ? "bg-gray-50" : ""}
            >
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="py-3 px-2 text-center">
                  {row[header.toLowerCase().replace(/\s+/g, "")]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
