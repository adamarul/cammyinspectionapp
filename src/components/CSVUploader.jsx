// src/components/CSVUploader.js
import React from "react";
import Papa from "papaparse";

function CSVUploader({ onDataUpload }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        console.log("Parsed CSV Data:", results.data); // Add this line
        onDataUpload(results.data);
      },
    });
  };

  return (
    <input
      type="file"
      accept=".csv"
      onChange={handleFileUpload}
      className="mb-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-blue-50 cursor-pointer"
    />
  );
}

export default CSVUploader;
