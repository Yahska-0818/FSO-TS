import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

interface EntryProps {
  entry: Omit<OccupationalHealthcareEntry, "id">;
  diagnosisData: Diagnosis[];
}

const OccupationalHealthcare = (props:EntryProps) => (
  <div style={{border:"solid 2px black", padding:"5px",borderRadius:"10px",marginTop:"20px"}}>
    <p style={{display:"flex",alignItems:"center",gap:"10px"}}>{props.entry.date} <WorkIcon></WorkIcon> {props.entry.employerName}</p> 
    <em>{props.entry.description}</em>
    <p>diagnose by {props.entry.specialist}</p>
  </div>
);

export default OccupationalHealthcare;