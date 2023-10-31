import React, { useState } from "react";
import CSVUploader from "./components/CSVUploader";
import InspectionTable from "./components/InspectionTable";
import CurrentTimeDisplay from "./components/CurrentTimeDisplay";

export default function App() {
  const [data, setData] = useState([]);
  const sortedData = data.sort(
    (a, b) =>
      new Date(a["Inspection Date and Time"]) -
      new Date(b["Inspection Date and Time"])
  );

  const handleDataUpload = (uploadedData) => {
    setData(uploadedData);
  };

  return (
    <div className="container mx-auto p-4 h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        Cammy's Inspection App
      </h1>

      <div className="mb-4 bg-white p-4 rounded shadow-md">
        <CSVUploader onDataUpload={handleDataUpload} />
      </div>

      {data.length > 0 && (
        <div className="mb-4 bg-white p-4 rounded shadow-md">
          <InspectionTable data={data} />
        </div>
      )}

      <div className="bg-white p-4 rounded shadow-md">
        <CurrentTimeDisplay
          nextInspectionTime={
            sortedData && sortedData.length > 0
              ? sortedData[0]["Inspection Date and Time"]
              : null
          }
        />
      </div>
    </div>
  );
}
