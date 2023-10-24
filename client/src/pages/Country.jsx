import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './Country.module.css';
import { getCountry, getActivities, getActivity } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/button/button';

const Country = ({ country, getCountry, getActivities, getActivity }) => {
  const { idCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (idCode) {
      getCountry(idCode);
      getActivities();
      getActivity(idCode);
    }
  }, [idCode, getCountry, getActivities, getActivity]);

  const handleHomeClick = () => navigate('/list');

  // Función para mostrar "Not Specified" en caso de capital vacía
  const renderCapital = () => {
    if (country.capital && country.capital.trim() !== '') {
      return country.capital;
    } else {
      return 'Not Specified';
    }
  };

  return country && (
    <div className={style.container}>
      <div className={style.title}>{country.name}</div>
      <div className={style.detailsContainer}>
        <div className={style.leftContainer}>
          <div className={style.textContainer}>
            <div><b>Country Code:</b> {country.idCode}</div>
            <div><b>Continent:</b> {country.continent}</div>
            <div><b>Capital:</b> {renderCapital()}</div> {/* Utiliza la función renderCapital */}
            <div><b>Subregion:</b> {country.subregion ? country.subregion : 'Not specified'}</div>
            <div><b>Area:</b> {country.area ? country.area : 'Not specified'}</div>
            <div><b>Population:</b> {country.population}</div>

            <div><b>Activities:</b>
              <ul>
                {Array.isArray(country.activities) ? (
                  country.activities.map((activity, index) => (
                    <li key={index}>{activity.name}</li>
                  ))
                ) : (
                  <li>No activities available.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className={style.rightContainer}>
          <img className={style.imgFlag} src={country.imageFlag} alt={country.name} />
        </div>
      </div>
      <CustomButton onClick={handleHomeClick} content="BACK" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  country: state.country,
});

const mapDispatchToProps = {
  getCountry,
  getActivities,
  getActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Country);
