import { useEffect, useState } from "react";
import type { NonSensitiveDiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import Header from "./components/Header";
import Entries from "./components/Entries";
import EntryForm from "./components/EntryForm";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const data = await diaryService.getAll();
      setDiaryEntries(data);
    };
    fetchDiaryEntries();
  }, []);

  return (
    <div>
      <EntryForm setDiaryEntries={setDiaryEntries} diaryEntries={diaryEntries}></EntryForm>
      <Header title={'Diary Entries'} />
      <Entries entries={diaryEntries} />
    </div>
  );
};

export default App;