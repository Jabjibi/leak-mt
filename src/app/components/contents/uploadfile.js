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
          onClick={async () => {
            await onLoadExcel(); // อ่าน Excel แล้วเซ็ตข้อมูลในตาราง
            await onSendToN8N(); // ส่งไฟล์ไป n8n แล้วดึงผลกลับมา
          }}
          disabled={loading}
          className="flex items-center gap-2 bg-black hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          <FiUpload /> นำเข้า & ส่งไป N8N
        </button>
      </div>
    </div>
  );
}
