// components/LeakTable.js
"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import TableView from "./table";
import FileUploader from "./uploadfile";

export default function LeakTable() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loadingN8N, setLoadingN8N] = useState(false);
  const pageSize = 10;

  const toSnakeCase = (str) =>
    str
      .toLowerCase()
      .replace(/[\s-]/g, "_")
      .replace(/[^\w_]/g, "");

  const normalizeKeys = (data) =>
    data.map((item) => {
      const transformed = {};
      for (const key in item) {
        transformed[toSnakeCase(key)] = item[key];
      }
      return {
        email: transformed["email"] || "",
        password: transformed["password"] || "",
        event_url: transformed["event_url"] || "",
        source_name: transformed["source_name"] || "",
        source_url_of_event: transformed["source_url_of_event"] || "",
        magnitude: transformed["magnitude"] || "",
        assets_matched: transformed["assets_matched"] || "",
        url: transformed["url"] || "",
        scan_date: transformed["scan_date"] || "",
        first_time_discovered: transformed["first_time_discovered"] || "",
      };
    });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleLoadExcel = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const json = XLSX.utils.sheet_to_json(ws);
      const normalized = normalizeKeys(json);
      setData(normalized);
      setPage(1);
    };
    reader.readAsBinaryString(file);
  };

  const handleSendFileToN8N = async () => {
    if (!file) return;
    setLoadingN8N(true);

    try {
      const formData = new FormData();
      formData.append("data", file);

      const res = await fetch("https://ai.bmspcustomer.net/webhook/excel", {
        method: "POST",
        body: formData,
      });

      const result = await res.json(); 

      const normalized = normalizeKeys(result);
      setData(normalized); 
      setPage(1); 
    } catch (err) {
      console.error("❌ error sent file:", err);
    } finally {
      setLoadingN8N(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-full">
      <FileUploader
        file={file}
        onFileChange={handleFileChange}
        onLoadExcel={handleLoadExcel}
        onSendToN8N={handleSendFileToN8N}
        loading={loadingN8N}
      />
      <TableView
        data={data}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        pageSize={pageSize}
      />
    </div>
  );
}
