import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entry from "./Entry";
import EntryForm from "./EntryForm";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patientData, setPatientData] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const data = await patients.getOne(id);
          setPatientData(data);
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patientData) {
    return <h3>Loading patient data...</h3>;
  }

  return (
    <div>
      <Typography variant="h5" style={{ marginTop: "0.5em" }}>
        {patientData.name} {patientData.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </Typography>

      <Typography variant="body1" style={{ marginTop: "0.5em" }}>
        ssn: {patientData.ssn}
        <br />
        occupation: {patientData.occupation}
      </Typography>
      <EntryForm setPatientData={setPatientData}></EntryForm>
      {patientData.entries.length > 0 && (
        <>
          <Typography variant="h6" style={{ marginTop: "1em" }}>
            Entries
          </Typography>
          {patientData.entries.map(entry => (
            <Entry key={entry.id} entry={entry} />
          ))}
        </>
      )}
    </div>
  );
};

export default PatientPage;