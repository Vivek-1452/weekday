import { useEffect, useState } from 'react';
import styles from './styles.module.css'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import CloseIcon from '@mui/icons-material/Close';

function MultiSelect({data={}}) {
    const [isOpen, setIsOpen] = useState(false);

    const [filteredOptions, setFilteredOptions] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState([]);

    const {label, placeholder, options} = data || {};

    const handleOptions = (event) => {
        if (filteredOptions?.length > 0) {
            const [label, value] = event.target.dataset.value?.split('::');
    
            if (!selectedOptions?.some((item) => item.value === value)) {
                setSelectedOptions((prev) => ([...prev, {label, value}]));
            }
    
            setIsOpen(false);
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;

        const filtered_options = (options || [])?.filter((option) => option?.value?.includes(value));

        setFilteredOptions(filtered_options);
    }

    const handleClear = (event) => {
        event.stopPropagation();

        setSelectedOptions([]);
        setIsOpen(false);
    }

    const handleClearOption = (value) => {
        const options = selectedOptions?.filter((item) => item?.value !== value);

        setSelectedOptions(options);
    }

    useEffect(() => {
        setFilteredOptions(options);
    }, [options])

    const isSelectedOptionsEmpty = selectedOptions?.length === 0

    return (
        <div className={styles.container}>
            
            {!isSelectedOptionsEmpty ? (
                <div className={styles.label}>
                    {label}
                </div>
            ) : null}

            <div className={styles.select_container} onClick={() => setIsOpen(!isOpen)}>

                {!isSelectedOptionsEmpty ? ( (selectedOptions || [])?.map((option) => (
                    <div className={styles.selected_option_container}>
                        <div className={styles.selected_option}>{option?.label}</div>
                        
                        <span className={styles.clear_option}>
                            <CloseIcon onClick={(e) => {e.stopPropagation(); handleClearOption(option?.value)}} />
                        </span>
                    </div>
                ))
                ) : null}

                <input placeholder={!isSelectedOptionsEmpty ? '' : placeholder} onChange={handleChange} />

                {!isSelectedOptionsEmpty ? (
                    <span className={styles.clear}>
                        <CloseIcon onClick={handleClear} />
                    </span>
                ) : null }

                <span>
                    <KeyboardArrowDownIcon />
                </span>
            </div>

        {isOpen ? (
            <div className={styles.options_container} onClick={handleOptions}>
                {filteredOptions?.length > 0 ? (filteredOptions || [])?.map((option) => {
                    const {label, value} = option || {};

                    return (
                    <div className={styles.option} 
                        data-value={`${label}::${value}`} 
                        data-selected={selectedOptions?.some((item) => item.value === value) ? 'true' : 'false'}>
                            {label}
                    </div>
                )}) : (
                        <div className={styles.no_data}>
                            No Options Found
                        </div>
                    )
                }
            </div>
        ) : null}

        </div>
    )
}

export default MultiSelect