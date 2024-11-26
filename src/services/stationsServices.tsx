import { collection, addDoc, updateDoc, doc, getDocs, setDoc } from "firebase/firestore";
import db from "../firebase";
import { Station } from "../types/station";

const COLLECTION_NAME = "stations";

export const saveStation = async (station: any) => {

  try {
    const stationId= station.id
    const timestamp = new Date().toISOString();
    const documentId = `save_${stationId}_${timestamp}`;
    const stationVolume = station.volume
    await setDoc(doc(db, "collectionLogs", documentId), {
      stationId,
      timestamp,
      stationVolume,
      status: "collection confirmed",
    });
    const stationRef = doc(db, COLLECTION_NAME, stationId);
    await updateDoc(stationRef, station);
  } catch (e) {
    await addDoc(collection(db, COLLECTION_NAME), station);
  }
};

export const saveCollectionLog = async (station: Station, date: Date) => {
  const timestamp = date.toISOString();
  const documentId = `request_${station.id}_${timestamp}`;
  const stationVolume = station.volume
  const stationId= station.id

  try {
    await setDoc(doc(db, "collectionLogs", documentId), {
      stationId,
      timestamp,
      stationVolume,
      status: "collection requested",
    });
    console.log(`Log de coleta salvo com ID: ${documentId}`);
  } catch (error) {
    console.error("Erro ao salvar log de coleta:", error);
  }

  const logRef = collection(db, "collectionLogs");
  await addDoc(logRef, { stationId, date, type: "log" });
};

export const getStations = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
