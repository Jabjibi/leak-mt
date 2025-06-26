import { FiUpload, FiRefreshCw } from "react-icons/fi";

export default function FileUploader({
  file,
  onFileChange,
  onLoadExcel,
  onSendToN8N,
  loading,
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        ข้อมูลจาก Excel / Webhook (n8n)
      </h2>
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={onFileChange}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={onLoadExcel}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <FiUpload /> นำเข้า
        </button>
        <button
          onClick={onSendToN8N}
          disabled={loading}
          className="flex items-center gap-2 bg-black hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          <FiRefreshCw /> ดึงจาก N8N
        </button>
      </div>
    </div>
  );
}
