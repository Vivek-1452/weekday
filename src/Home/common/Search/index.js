import { useState } from 'react';
import styles from './styles.module.css'
import { setFilters } from '../../../store/filterSlice';
import { useDispatch } from 'react-redux';

function Search({data={}}) {
    const [searchVal, setSearchVal] = useState(null);

    const dispacth = useDispatch();

    const {placeholder, label, name} = data || {};

    const handleChange = (event) => {
        const value = event.target.value;

        setSearchVal(value);
        dispacth(setFilters({name, value: value}));
    }

    return (
        <div className={styles.container}>

            {searchVal ? (
                <div className={styles.label}>
                    {label}
                </div>
            ) : null}

            <div className={styles.select_container}>
                <input placeholder={placeholder} onChange={handleChange} value={searchVal} />
            </div>
        </div>
    )
}

export default Search