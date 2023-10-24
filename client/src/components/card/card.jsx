import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

export default function Card({ country }) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const handleImageClick = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  const capital = country.capital || "Not Specified"; // Si la capital está vacía, muestra "Not Specified"

  return (
    <div className={style.card} key={country.idCode}>
      <div className={style.imgContainer}>
        <img
          className={style.profileImg}
          src={country.imageFlag}
          alt=""
          onClick={handleImageClick}
        />
      </div>
      <div className={style.textContainer}>
        <Link to={`/country/${country.idCode}`}>
          <div className={style.textName}>{country.name.toUpperCase()}</div>
        </Link>
        <div className={style.textStatus}>{capital}</div> {/* Muestra la capital o "Not Specified" */}
        <div className={style.textStatus}>{country.continent}</div>
        <div className={style.botContainer}></div>
      </div>
      {isImageExpanded && (
        <div
          className={style.expandedImage}
          onClick={handleImageClick}
        >
          <img src={country.imageFlag} alt="" />
        </div>
      )}
    </div>
  );
}
