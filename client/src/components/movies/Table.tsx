import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { formatDateObjects } from '../../utils/functions';
import { setSelectedMovie } from '../../store/movieSlice';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { actionsWrapper, fontS16, fontS18 } from '../../utils/js-styles';
import { deleteMovieByID } from '../../store/actions/movie-actions';

interface ComponentProps {
  isAdminPage?: boolean;
}

const TableComponent: React.FC<ComponentProps> = ({ isAdminPage }) => {
  const { movies } = useSelector((state: RootState) => state.movies);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickMovie = (movie: any) => {
    dispatch(setSelectedMovie(movie));
    navigate('/movie-order');
  };

  return (
    <TableContainer component={Paper}>
      {!!movies.length && (
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell style={fontS16}>Title</TableCell>
              <TableCell
                style={fontS16}
                align={isAdminPage ? 'inherit' : 'right'}
              >
                Dates
              </TableCell>
              {isAdminPage && (
                <TableCell style={fontS16} align='right'>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {movies &&
              movies.map((row: any, index: number) => {
                const formattedString = formatDateObjects(row.showtimes);

                return (
                  <TableRow
                    onClick={() => {
                      if (!isAdminPage) clickMovie(row);
                    }}
                    style={{ cursor: isAdminPage ? '' : 'pointer' }}
                    key={`${row.title} - ${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row' style={fontS18}>
                      {row.title}
                    </TableCell>
                    <TableCell
                      style={fontS18}
                      align={isAdminPage ? 'inherit' : 'right'}
                    >
                      <div>{formattedString ?? ''}</div>
                    </TableCell>
                    {isAdminPage && (
                      <TableCell>
                        <div style={actionsWrapper}>
                          <DeleteIcon
                            onClick={() => dispatch(deleteMovieByID(row._id))}
                            style={{ cursor: 'pointer', marginLeft: 10 }}
                          />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default TableComponent;
