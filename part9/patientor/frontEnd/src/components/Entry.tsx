import { useEffect, useState } from "react";
import { Diagnosis, EntryWithoutId } from "../types";
import diagnosis from "../services/diagnosis";

interface EntryProps {
  entry: EntryWithoutId;
}

const Entry = ({ entry }: EntryProps) => {
  const [diagnosisData, setDiagnosisData] = useState<Diagnosis[]>([]);

  useEffect(()=>{
    if (entry.diagnosisCodes) {
      diagnosis.getAll().then(data=>setDiagnosisData(data));
    }
  },[]);

  return (
    <div>
      <p>{entry.date} <em>{entry.description}</em></p>
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>{code} {diagnosisData.find(data=>data.code==code)?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Entry;