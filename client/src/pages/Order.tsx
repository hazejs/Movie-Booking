import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { useEffect, useRef, useState } from 'react';
import { clearMoviesState, setSelectedShowtime } from '../store/movieSlice';
import {
  getAllShowtimesByMovieId,
  orderMovie,
} from '../store/actions/movie-actions';
import { useNavigate } from 'react-router-dom';

interface ComponentProps {}

const OrderPage: React.FC<ComponentProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { selectedMovie, bookedSuccess, showtimes, selectedShowtime } =
    useSelector((state: RootState) => state.movies);
  const { user } = useSelector((state: RootState) => state.auth);
  const { seats } = selectedShowtime ?? {};
  const seatRef = useRef<HTMLDivElement>(null);
  const [selectedSeat, setSelectedSeat] = useState<any>({});
  const [value, setValue] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const getShowtimes = async () => {
      if (!!selectedMovie)
        await dispatch(getAllShowtimesByMovieId(selectedMovie._id));
    };

    getShowtimes();

    return () => {
      dispatch(clearMoviesState());
    };
  }, []);

  useEffect(() => {
    if (bookedSuccess) {
      dispatch(clearMoviesState());
      navigate('/');
    }
  });

  useEffect(() => {
    dispatch(setSelectedShowtime(showtimes[0]));
  }, [showtimes]);

  const renderSeat = (seat: any): JSX.Element => {
    const className = `seat ${
      seat.isBooked
        ? 'booked'
        : !!selectedSeat && selectedSeat === seat
        ? 'selected'
        : 'available'
    }`;
    return (
      <div
        key={`${seat.row}-${seat.seat}`}
        ref={seatRef}
        className={className}
        onClick={() => setSelectedSeat(seat)}
      ></div>
    );
  };

  const bookASeat = async () => {
    await dispatch(
      orderMovie({
        movieId: selectedMovie._id,
        userId: user._id,
        seatRow: selectedSeat.row,
        seatNumber: selectedSeat.seat,
        showtimeId: selectedShowtime._id,
      })
    );
  };

  return (
    <div className='order-page-container'>
      <div className='movie-data'></div>
      <div className='movie-theatre'>
        <div className='movie-map-details'>
          <div className='seat-container'>
            <span>Available</span>
            <div className='seat available'></div>
          </div>
          <div className='seat-container'>
            <span>Selected</span>
            <div className='seat selected'></div>
          </div>
          <div className='seat-container'>
            <span>Booked</span>
            <div className='seat booked'></div>
          </div>
        </div>
        <div className='screen'></div>
        <div className='seats-container'>
          {!!seats &&
            seats.map((row: any, rowIndex: number) => (
              <div key={`row-${rowIndex}`} className='seat-row'>
                {row.map((seat: any) => renderSeat(seat))}
              </div>
            ))}
        </div>
      </div>

      {selectedSeat && selectedSeat.hasOwnProperty('row') && (
        <button className='book-btn' onClick={bookASeat}>
          Book The Seat
        </button>
      )}

      <div className='showtimes-container'>
        <span>Showtimes:</span>
        {selectedShowtime &&
          showtimes.map((s: any, i) => {
            const date = new Date(showtimes[i].date);

            // Extract day, month, year, hours, minutes, and seconds components
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            // Format the date components
            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
            return (
              <div key={`btn-${i}`} className='showtimes-wrapper'>
                <button
                  onClick={() => dispatch(setSelectedShowtime(s))}
                  style={
                    s?._id === selectedShowtime?._id
                      ? { background: '#62e0f8' }
                      : {}
                  }
                >
                  {formattedDate}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OrderPage;
