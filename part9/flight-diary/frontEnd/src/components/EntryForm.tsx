import React, { useState } from "react";
import axios from 'axios';
import diaryService from "../services/diaryService";
import { type Weather, type NewDiaryEntry, type NonSensitiveDiaryEntry, type Visibility } from "../types";

interface EntryFormProps {
  setDiaryEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  diaryEntries: NonSensitiveDiaryEntry[]
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility | undefined>(undefined);
  const [weather, setWeather] = useState<Weather | undefined>(undefined);
  const [comment, setComment] = useState('');
  const [notification, setNotification] = useState('');

  const submitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!visibility || !weather) {
      setNotification('Please select a visibility and weather option');
      setTimeout(() => setNotification(''), 5000);
      return;
    }
    try {
      const newEntry: NewDiaryEntry = {
        date,
        visibility,
        weather,
        comment
      };

      const returnedEntry = await diaryService.addEntry(newEntry);
      props.setDiaryEntries(props.diaryEntries.concat(returnedEntry));

      setDate('');
      setVisibility(undefined);
      setWeather(undefined);
      setComment('');

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setNotification(e.response?.data.slice(22) || 'An error occurred');
      } else {
        setNotification('An unknown error occurred');
      }
      setTimeout(() => setNotification(''), 5000);
    }
  };

  const onVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  }

  const onWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  }
  return (
    <div>
      <h1>Add new entry</h1>
      <h4 style={{color:"red"}}>{notification}</h4>
      <form onSubmit={submitEntry}>
        <div>
          <label htmlFor="date">date:</label>
          <input type="date" onChange={({target}) => setDate(target.value)} />
        </div>
        <div>
          <label htmlFor="great">great</label>
          <input type="radio" name="visibility" value="great" onChange={onVisibilityChange}/>
          <label htmlFor="good">good</label>
          <input type="radio" name="visibility" value="good" onChange={onVisibilityChange}/>
          <label htmlFor="ok">ok</label>
          <input type="radio" name="visibility" value="ok" onChange={onVisibilityChange}/>
          <label htmlFor="poor">poor</label>
          <input type="radio" name="visibility" value="poor" onChange={onVisibilityChange}/>
        </div>
        <div>
          <label htmlFor="sunny">sunny</label>
          <input type="radio" name="weather" value="sunny" onChange={onWeatherChange}/>
          <label htmlFor="rainy">rainy</label>
          <input type="radio" name="weather" value="rainy" onChange={onWeatherChange}/>
          <label htmlFor="cloud">cloudy</label>
          <input type="radio" name="weather" value="cloudy" onChange={onWeatherChange}/>
          <label htmlFor="stormy">stormy</label>
          <input type="radio" name="weather" value="stormy" onChange={onWeatherChange}/>
          <label htmlFor="windy">windy</label>
          <input type="radio" name="weather" value="windy" onChange={onWeatherChange}/>
        </div>
        <div>
          <label htmlFor="comment">comment:</label>
          <input type="text" onChange={({target}) => setComment(target.value)} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default EntryForm