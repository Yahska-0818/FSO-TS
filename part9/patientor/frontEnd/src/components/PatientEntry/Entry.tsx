import { useEffect, useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types";
import diagnosis from "../../services/diagnosis";
import HospitalEntry from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcar";
import HealthCheck from "./HealthCheck";

interface EntryProps {
  entry: EntryWithoutId;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Entry = ({ entry }: EntryProps) => {
  const [diagnosisData, setDiagnosisData] = useState<Diagnosis[]>([]);

  useEffect(()=>{
    if (entry.diagnosisCodes) {
      diagnosis.getAll().then(data=>setDiagnosisData(data));
    }
  },[]);
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnosisData={diagnosisData} />;
      
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnosisData={diagnosisData} />;
      
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnosisData={diagnosisData} />;
      
    default:
      return assertNever(entry);
  }
};

export default Entry;