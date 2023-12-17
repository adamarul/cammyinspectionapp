import React, { useState } from "react";
import CSVUploader from "./components/CSVUploader";
import InspectionTable from "./components/InspectionTable";
import CurrentTimeDisplay from "./components/CurrentTimeDisplay";
import { app } from './firebaseConfig'; // Ensure this import points to the correct file
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Initialize Firestore outside of the component
const db = getFirestore(app);

function App() {
  const [data, setData] = useState([]);

  // Function to save data to Firestore
  const saveDataToFirestore = async () => {
    const collectionRef = collection(db, 'inspections');
    for (let item of data) {
      try {
        const docRef = await addDoc(collectionRef, item);
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        Cammy's Inspection App
      </h1>
      <div className="mb-4 bg-white p-4 rounded shadow-md">
        <CSVUploader onDataUpload={setData} />
        <button onClick={saveDataToFirestore} className="bg-green-500 text-white px-4 py-2 rounded shadow">
          Save Data
        </button>
      </div>
      {data.length > 0 && (
        <InspectionTable data={data} setData={setData} />
      )}
      <CurrentTimeDisplay />
    </div>
  );
}

export default App;
