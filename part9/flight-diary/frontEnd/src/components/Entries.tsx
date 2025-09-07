import type { NonSensitiveDiaryEntry } from "../types";
import Entry from "./Entry";

interface EntriesProps {
  entries: NonSensitiveDiaryEntry[];
}

const Entries = (props: EntriesProps) => (
  <>
    {props.entries.map(entry => (
      <Entry key={entry.id} entry={entry} />
    ))}
  </>
);

export default Entries;