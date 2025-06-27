import "../contents/styles/main.css"
export default function TableView({
  data,
  page,
  setPage,
  search,
  setSearch,
  pageSize,
}) {
  const filteredData = data.filter(
    (item) =>
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.event_url?.toLowerCase().includes(search.toLowerCase())
  );
  const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <>
      <div className="relative w-full max-h-[65vh] overflow-auto border border-gray-300 rounded-xl">
        <table className="min-w-[1200px] table-fixed border-collapse w-full text-sm text-left">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {[
                "#",
                "Email",
                "Password",
                "Event URL",
                "Source Name",
                "Source URL",
                "Magnitude",
                "Assets Matched",
                "URL",
                "Scan Date",
                "First Time Discovered",
              ].map((header, i) => (
                <th key={i} className="resizable-header px-4 py-2 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border whitespace-nowrap">
                  {(page - 1) * pageSize + idx + 1}
                </td>
                {[
                  item.email,
                  item.password,
                  item.event_url,
                  item.source_name,
                  item.source_url_of_event,
                  item.magnitude,
                  item.assets_matched,
                  item.url,
                  item.scan_date,
                  item.first_time_discovered,
                ].map((value, i) => (
                  <td
                    key={i}
                    className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                    title={value}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          หน้า {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
