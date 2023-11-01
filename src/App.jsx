import React, { useState, useEffect } from "react";
import CSVUploader from "./components/CSVUploader";
import InspectionTable from "./components/InspectionTable";
import CurrentTimeDisplay from "./components/CurrentTimeDisplay";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./firebaseConfig";

export default function App() {
  const [data, setData] = useState([]);
  const sortedData = data.sort(
    (a, b) =>
      new Date(a["Inspection Date and Time"]) -
      new Date(b["Inspection Date and Time"])
  );

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const q = query(collection(db, "inspections"));
      const querySnapshot = await getDocs(q);
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const handleDataUpload = (uploadedData) => {
    setData(uploadedData);
  };

  const handlePushToFirebase = async () => {
    const db = getFirestore();
    const inspectionsCollection = collection(db, "inspections");

    for (const inspection of data) {
      const q = query(
        inspectionsCollection,
        where(
          "Real Estate Agent's Name",
          "==",
          inspection["Real Estate Agent's Name"]
        ),
        where("Property Address", "==", inspection["Property Address"]),
        where(
          "Inspection Date and Time",
          "==",
          inspection["Inspection Date and Time"]
        )
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(inspectionsCollection, inspection);
      }
    }
  };

  const handleCompletion = async (id) => {
    // Remove from Firestore
    const db = getFirestore();
    await deleteDoc(doc(db, "inspections", id));

    // Remove from local state
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
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
          <InspectionTable data={data} onComplete={handleCompletion} />
        </div>
      )}

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePushToFirebase}
        >
          Push to Firebase
        </button>
      </div>

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
