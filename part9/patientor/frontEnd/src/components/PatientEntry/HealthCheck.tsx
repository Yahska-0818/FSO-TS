import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface EntryProps {
  entry: Omit<HealthCheckEntry, "id">;
  diagnosisData: Diagnosis[];
}

const getHeartColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "green";
    case HealthCheckRating.LowRisk:
      return "orange";
    case HealthCheckRating.HighRisk:
      return "red";
    case HealthCheckRating.CriticalRisk:
      return "darkred";
    default:
      return "grey";
  }
};

const HealthCheck = (props: EntryProps) => (
  <div style={{ border: "solid 2px black", padding: "5px", borderRadius: "10px", marginTop: "20px" }}>
    <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {props.entry.date} <MedicalServicesIcon />
    </p>
    <em>{props.entry.description}</em> <br />
    <FavoriteIcon
      sx={{
        color: getHeartColor(props.entry.healthCheckRating),
        marginTop: "10px"
      }}
    />
    <p>diagnose by {props.entry.specialist}</p>
  </div>
);

export default HealthCheck;