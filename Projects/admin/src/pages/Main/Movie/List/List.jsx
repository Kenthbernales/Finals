import { useNavigate } from 'react-router-dom';
import './List.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const List = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const getMovies = () => {
    //get the movies from the api or database
    axios.get('/movies').then((response) => {
      setList(response.data);
    });
  };
  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = (id) => {
    const isConfirm = window.confirm(
      'Are you sure that you want to delete this data?'
    );
    if (isConfirm) {
      axios
        .delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          //update list by modifying the movie list array
          const tempList = [...list];
          const index = list.findIndex((movie) => movie.id === id);
          if (index !== undefined || index !== -1) {
            tempList.splice(index, 1);
            setList(tempList);
          }

          //update list by requesting again to api
          // getMovies();
        });
    }
  };

  return (
    <div className='list-container'>
      <div className='create-container'>
        <button
          type='button'
          onClick={() => {
            navigate('/main/movies/form');
          }}
        >
          Create new
        </button>
      </div>
      <div className='table-container'>
        <table className='movie-list'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((movie) => (
              <tr>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>
                  <button
                    type='button'
                    onClick={() => {
                      navigate('/main/movies/form/' + movie.id);
                    }}
                  >
                    Edit
                  </button>
                  <button type='button' onClick={() => handleDelete(movie.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;