import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface EntryProps {
  entry: Omit<HospitalEntry, "id">;
  diagnosisData: Diagnosis[];
}

const Hospital = (props:EntryProps) => (
  <div style={{border:"solid 2px black", padding:"5px",borderRadius:"10px",marginTop:"20px"}}>
    <p style={{display:"flex",alignItems:"center",gap:"10px"}}>{props.entry.date} <LocalHospitalIcon></LocalHospitalIcon></p> 
    <em>{props.entry.description}</em>
    <p>diagnose by {props.entry.specialist}</p>
  </div>
);

export default Hospital;