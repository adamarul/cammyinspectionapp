import React from "react";

function InspectionTable({ data }) {
  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    return `${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()} ${dateObj.getHours()}:${String(
      dateObj.getMinutes()
    ).padStart(2, "0")}`;
  }

  function handleRowClick(address) {
    // Construct the Google Maps URL
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;
    // Open this URL in a new browser tab
    window.open(mapsUrl, "_blank");
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-100">
              Real Estate Agent's Name
            </th>
            <th className="border border-gray-300 p-2 bg-gray-100">
              Property Address
            </th>
            <th className="border border-gray-300 p-2 bg-gray-100">
              Inspection Date and Time
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : ""}
              onClick={() => handleRowClick(row["Property Address"])}
            >
              <td className="border border-gray-300 p-2 cursor-pointer">
                {row["Real Estate Agent's Name"]}
              </td>
              <td className="border border-gray-300 p-2 cursor-pointer">
                {row["Property Address"]}
              </td>
              <td className="border border-gray-300 p-2 cursor-pointer">
                {formatDate(row["Inspection Date and Time"])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InspectionTable;
