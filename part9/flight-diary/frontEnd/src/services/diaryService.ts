import axios from "axios";
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const baseUrl = '/api/diaries';

const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};

const addEntry = async (newEntry: NewDiaryEntry) => {
  const response = await axios.post<NonSensitiveDiaryEntry>(baseUrl, newEntry);
  return response.data;
};


export default { getAll, addEntry };