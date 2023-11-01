import React from "react";

function InspectionTable({ data, onComplete }) {
  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    return `${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()} ${dateObj.getHours()}:${String(
      dateObj.getMinutes()
    ).padStart(2, "0")}`;
  }

  function handleRowClick(address, event) {
    event.stopPropagation(); // Stop the event from triggering any parent handlers
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;
    window.open(mapsUrl, "_blank");
  }

  function handleCompletedClick(id, event) {
    event.stopPropagation(); // Stop the event from triggering any parent handlers
    onComplete(id);
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
            <th className="border border-gray-300 p-2 bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="border border-gray-300 p-2">
                {row["Real Estate Agent's Name"]}
              </td>
              <td
                className="border border-gray-300 p-2 cursor-pointer"
                onClick={(e) => handleRowClick(row["Property Address"], e)}
              >
                {row["Property Address"]}
              </td>
              <td className="border border-gray-300 p-2">
                {formatDate(row["Inspection Date and Time"])}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  onClick={(e) => handleCompletedClick(row.id, e)}
                >
                  Completed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InspectionTable;
