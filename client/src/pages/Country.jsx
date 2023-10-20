import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './Country.module.css';
import { getCountry } from '../store/actions';
import { useNavigate } from 'react-router-dom';

function Country(props) {
  const { country } = props;
  const { idCode } = useParams(); // Obtener el idCode de los parámetros de la URL
  const navigate = useNavigate(); // Obtener la función de navegación

  useEffect(() => {
    // Llama a la acción getCountry con el idCode para cargar los datos del país
    props.getCountry(idCode);
  }, [idCode, props]);

  const handleHomeClick = () => {
    // Redirigir a la ruta "/"
    navigate('/');
  };

  return (
    country && (
      <div className={style.container}>
        <div className={style.textName}>{country.name}</div>
        <div className={style.inContainer}>
          <div className={style.leftContainer}>
          </div>
          <div className={style.rightContainer}>
            <div className={style.imgContainer}>
              <img className={style.profileImg} src={country.image} alt="" />
            </div>
          </div>
        </div>
        <button className={style.btnSearch} onClick={handleHomeClick}>
          Home
        </button>
      </div>
    )
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCountry: (idCode) => {
      dispatch(getCountry(idCode));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    country: state.country,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Country);
