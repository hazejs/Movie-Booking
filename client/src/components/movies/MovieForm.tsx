import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { RootState, useAppDispatch } from '../../store/store';
import { createNewMovie } from '../../store/actions/movie-actions';
import { mB20 } from '../../utils/js-styles';
import { useSelector } from 'react-redux';

interface ComponentProps {
  isAdd?: boolean;
  callback: () => void;
}

type FormData = {
  title: string;
  duration: number;
  showtimes: moment.Moment[] | any;
  description: string;
};

const MovieFormComponent: React.FC<ComponentProps> = ({ isAdd, callback }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    duration: 0,
    showtimes: [],
    description: '',
  });

  const { title, duration, showtimes, description } = formData;

  const handleAddShowtime = () => {
    setFormData({ ...formData, showtimes: [...showtimes, moment()] });
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowtimeChange = (newValue: moment.Moment, index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      showtimes: [
        ...prevState.showtimes.slice(0, index),
        newValue,
        ...prevState.showtimes.slice(index + 1),
      ],
    }));
  };

  const submitNewMovie = async () => {
    try {
      callback();
      setFormData({
        title: '',
        duration: 0,
        showtimes: [],
        description: '',
      });
      await dispatch(createNewMovie(formData));
    } catch (error) {}
  };

  return (
    <div className='movie-form-container'>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <h1>Add Movie</h1>
        <TextField
          style={mB20}
          id='outlined-basic'
          label='Movie Title'
          variant='outlined'
          name='title'
          value={title}
          onChange={handleChange}
        />
        <TextField
          style={mB20}
          id='outlined-basic'
          label='Duration (In Minutes)'
          type='number'
          variant='outlined'
          name='duration'
          value={duration}
          onChange={handleChange}
        />
        <TextField
          style={mB20}
          id='outlined-basic'
          label='Description'
          variant='outlined'
          name='description'
          value={description}
          onChange={handleChange}
        />

        {showtimes.map((showtime: any, index: number) => (
          <DateTimePicker
            className='custom-datetimepicker'
            key={`Showtime ${index + 1}`}
            label={`Showtime ${index + 1}`}
            value={showtime}
            onChange={(newValue: any) => handleShowtimeChange(newValue, index)}
          />
        ))}

        <button className='form-buttons' onClick={handleAddShowtime}>
          Add Showtime
        </button>
        <button className='form-buttons' onClick={submitNewMovie}>
          Add Movie
        </button>
      </LocalizationProvider>
    </div>
  );
};

export default MovieFormComponent;
