import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../store/actions';
import axios from 'axios';

function List() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    axios.get('http://localhost:3001/countries')
      .then((response) => {
        dispatch(setCountries(response.data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [dispatch]);

  return (
    <div>
      <h2>Lista</h2>
      <ul>
        {countries.map((country) => (
          <li key={countries.id}>{countries.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default List;
