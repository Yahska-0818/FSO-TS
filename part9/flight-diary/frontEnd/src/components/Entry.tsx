import type { NonSensitiveDiaryEntry } from "../types";

interface EntryProps {
  entry: NonSensitiveDiaryEntry;
}

const Entry = (props:EntryProps) => (
  <div>
    <h3>{props.entry.date}</h3>
    <p>visibility: {props.entry.visibility}</p>
    <p>weather: {props.entry.weather}</p>
  </div>
);

export default Entry;