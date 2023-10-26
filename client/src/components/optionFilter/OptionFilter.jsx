import React from "react";
import { useAppDispatch } from "../../redux-hooks";
import style from './OptionFilter.module.css';
import { setFilter } from "../../store/actions";

const OptionFilter = ({ item, type, selected }) => {
    const dispatch = useAppDispatch();

    // Manejar el clic en un elemento de filtro
    const handleClick = (value) => {
        // Disparar la acción para establecer un filtro con el tipo y valor correspondientes
        dispatch(setFilter({ type, value }));
    }

    return (
        <div className={style.btnSearch} onClick={() => handleClick(item.name)}>
            <div className={selected ? style.selectedElement : ''}>{item.name}</div>
        </div>
    );
};

export default OptionFilter;
