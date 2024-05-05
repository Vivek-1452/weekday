import { useEffect, useState } from 'react';
import styles from './styles.module.css'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import CloseIcon from '@mui/icons-material/Close';

function Select({data={}}) {
    const [isOpen, setIsOpen] = useState(false);

    const [filteredOptions, setFilteredOptions] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);

    const {placeholder, options, label} = data || {};

    const handleOptions = (event) => {
        if (filteredOptions?.length > 0) {
        const [label, value] = event.target.dataset.value?.split('::');

        setSelectedOption({label, value});
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

        setSelectedOption(null);
        setIsOpen(false);
    }

    useEffect(() => {
        setFilteredOptions(options);
    }, [options])

    return (
        <div className={styles.container}>
            {selectedOption ? (
                <div className={styles.label}>
                    {label}
                </div>
            ) : null}

            <div className={styles.select_container} onClick={() => setIsOpen(!isOpen)}>
                <input placeholder={selectedOption ? selectedOption?.label : placeholder} onChange={handleChange} />

                {selectedOption ? (
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

            {filteredOptions.length > 0 ? (filteredOptions || [])?.map((option) => {
                        const {label, value} = option || {};
                    
                        return (
                        <div className={styles.option} 
                            data-value={`${label}::${value}`} 
                            data-selected={selectedOption?.value === value ? 'true' : 'false'}>
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

export default Select