import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { getMovies } from '../store/actions/movie-actions';
import TableComponent from '../components/movies/Table';
import { HOME_SUBTITLE, HOME_TITLE } from '../utils/consts';

interface ComponentProps {}

const HomePage: React.FC<ComponentProps> = ({}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAllMovies = async () => {
      await dispatch(getMovies());
    };
    getAllMovies();
  }, []);

  return (
    <div className='home-page-container'>
      <div className='home-titles'>
        <h1>{HOME_TITLE}</h1>
        <p>{HOME_SUBTITLE}</p>

        <TableComponent />
      </div>
    </div>
  );
};

export default HomePage;
