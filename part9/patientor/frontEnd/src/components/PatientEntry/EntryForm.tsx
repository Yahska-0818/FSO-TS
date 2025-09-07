import { Button, TextField, Typography, Alert, Select, MenuItem, InputLabel, FormControl,OutlinedInput,Checkbox,SelectChangeEvent} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Patient, EntryWithoutId, HealthCheckRating, OccupationalHealthcareEntry, HospitalEntry, Diagnosis } from "../../types";
import patients from "../../services/patients";
import { useParams } from "react-router-dom";
import axios from "axios";
import diagnosisService from "../../services/diagnosis";

interface FormProps {
  setPatientData: React.Dispatch<React.SetStateAction<Patient | null>>;
}

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";

const extractErrorMessage = (rawErrorString: string): string => {
  try {
    const jsonStartIndex = rawErrorString.indexOf('{');
    if (jsonStartIndex === -1) {
      return rawErrorString;
    }
    const jsonString = rawErrorString.substring(jsonStartIndex);
    const errorData = JSON.parse(jsonString);
    if (errorData && typeof errorData.error === 'string') {
        return errorData.error;
    }
    return rawErrorString;
  } catch (error) {
    console.error("Failed to parse error data:", error);
    return rawErrorString;
  }
};

const EntryForm = ({ setPatientData }: FormProps) => {
  const { id } = useParams<{ id: string }>();
  
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState('');
  
  const [allDiagnoses, setAllDiagnoses] = useState<Diagnosis[]>([]);
  
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await diagnosisService.getAll();
        setAllDiagnoses(data);
      } catch (e) {
        console.error("Failed to fetch diagnoses:", e);
      }
    };
    void fetchDiagnoses();
  }, []);

  const resetFormFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
    setDischargeDate('');
    setDischargeCriteria('');
    setNotification('');
  };

  const onFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!id) return;

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    let newEntry: EntryWithoutId;

    switch (entryType) {
      case "HealthCheck":
        newEntry = { ...baseEntry, type: "HealthCheck", healthCheckRating };
        break;
      case "OccupationalHealthcare":
        const occupationalEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName,
        };
        if (sickLeaveStartDate && sickLeaveEndDate) {
            occupationalEntry.sickLeave = { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate };
        }
        newEntry = occupationalEntry;
        break;
      case "Hospital":
        const hospitalEntry: Omit<HospitalEntry, 'id'> = {
            ...baseEntry,
            type: "Hospital",
        };
        if (dischargeDate && dischargeCriteria) {
            hospitalEntry.discharge = { date: dischargeDate, criteria: dischargeCriteria };
        }
        newEntry = hospitalEntry;
        break;
      default:
        throw new Error(`Unsupported entry type: ${entryType}`);
    }

    try {
      const updatedPatientData = await patients.addEntry(id, newEntry);
      setPatientData(updatedPatientData);
      setShowForm(false);
      resetFormFields();
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (axios.isAxiosError(error)) {
        errorMessage = (error.response && error.response.data)
          ? extractErrorMessage(error.response.data)
          : error.message;
      }
      setNotification(errorMessage);
      setTimeout(() => setNotification(''), 5000);
    }
  };
  
  const handleDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const { target: { value } } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const renderTypeSpecificFields = () => {
    switch (entryType) {
        case "HealthCheck":
          return (
            <FormControl fullWidth>
              <InputLabel>HealthCheck Rating</InputLabel>
              <Select
                value={healthCheckRating}
                label="HealthCheck Rating"
                onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
                required
              >
                {Object.values(HealthCheckRating).filter(v => typeof v === 'number').map(v => 
                  <MenuItem key={v as number} value={v as number}>
                    {v as number} - {HealthCheckRating[v as number]}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          );
        case "OccupationalHealthcare":
          return (
            <>
              <TextField label="Employer Name" fullWidth value={employerName} onChange={({ target }) => setEmployerName(target.value)} required />
              <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Sick Leave (Optional)</Typography>
              <TextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} fullWidth value={sickLeaveStartDate} onChange={({ target }) => setSickLeaveStartDate(target.value)} />
              <TextField label="End Date" type="date" InputLabelProps={{ shrink: true }} fullWidth value={sickLeaveEndDate} onChange={({ target }) => setSickLeaveEndDate(target.value)} />
            </>
          );
        case "Hospital":
          return (
            <>
              <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Discharge (Optional)</Typography>
              <TextField label="Discharge Date" type="date" InputLabelProps={{ shrink: true }} fullWidth value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)} />
              <TextField label="Discharge Criteria" fullWidth value={dischargeCriteria} onChange={({ target }) => setDischargeCriteria(target.value)} />
            </>
          );
        default:
          return null;
      }
  };

  return (
    <div>
      {notification && <Alert severity="error" style={{ marginTop: "10px" }}>{notification}</Alert>}
      <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Entry'}
      </Button>

      {showForm && (
        <div style={{ border: '1px solid lightgray', borderRadius: '5px', padding: '15px', marginTop: '10px' }}>
          <form style={{ display: "flex", flexDirection: "column", gap: "15px" }} onSubmit={onFormSubmit}>
            <FormControl fullWidth>
              <InputLabel>Entry Type</InputLabel>
              <Select value={entryType} label="Entry Type" onChange={({ target }) => setEntryType(target.value as EntryType)}>
                <MenuItem value="HealthCheck">Health Check</MenuItem>
                <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
              </Select>
            </FormControl>

            <TextField label="Description" fullWidth value={description} onChange={({ target }) => setDescription(target.value)} required />
            <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} fullWidth value={date} onChange={({ target }) => setDate(target.value)} required />
            <TextField label="Specialist" fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)} required />

            <FormControl fullWidth>
              <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
              <Select
                labelId="diagnosis-codes-label"
                multiple
                value={diagnosisCodes}
                onChange={handleDiagnosisChange}
                input={<OutlinedInput label="Diagnosis Codes" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {allDiagnoses.map((diagnosis) => (
                  <MenuItem key={diagnosis.code} value={diagnosis.code}>
                    <Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
                    {diagnosis.code} - {diagnosis.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {renderTypeSpecificFields()}

            <Button variant="contained" color="primary" style={{ marginTop: "10px" }} type="submit">
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EntryForm;