import React, { useState } from "react";
import moment from "moment"; // Import moment library
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from "../firebaseConfig"; // Update the path to match your project structure

const db = getFirestore(app);

function InspectionTable({ data, setData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Determine data for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Updated function to format dates with a check for invalid dates
  function formatDate(dateString) {
    // First, try to parse the date as-is.
    let dateObj = new Date(dateString);

    // If the date is invalid, attempt to parse with moment.js or another date library
    if (isNaN(dateObj.getTime())) {
      // Assuming you have moment.js installed; otherwise, you can use another library or custom parsing
      dateObj = moment(dateString, "MM/DD/YYYY HH:mm"); // Adjust the format to match your CSV format
      if (!dateObj.isValid()) {
        return 'Date format is incorrect'; // Provide a more specific error message
      }
    }

    // If the date is valid, format it.
    return `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${dateObj.getHours()}:${String(
      dateObj.getMinutes()
    ).padStart(2, "0")}`;
  }

  // Existing function for row click
  function handleRowClick(address) {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;
    window.open(mapsUrl, "_blank");
  }

  // Function to go to the next page
  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  // Function to go to the previous page
  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
          {currentItems.map((row, index) => (
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default InspectionTable;
