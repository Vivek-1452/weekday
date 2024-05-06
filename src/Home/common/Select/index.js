import { useEffect, useState } from 'react';
import styles from './styles.module.css'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import CloseIcon from '@mui/icons-material/Close';

import { useDispatch } from 'react-redux';
import { setFilters } from '../../../store/filterSlice';

function Select({data={}}) {
    const [isOpen, setIsOpen] = useState(false);

    const [filteredOptions, setFilteredOptions] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);

    const dispatch = useDispatch();

    const {placeholder, options, label, name} = data || {};

    // handling the selected option
    const handleOptions = (event) => {
        if (filteredOptions?.length > 0) {
        const [label, value] = event.target.dataset.value?.split('::');

        setSelectedOption({label, value});
        setIsOpen(false);
        }
    }

    // Filtering the options on search
    const handleChange = (event) => {
        const value = event.target.value;

        const filtered_options = (options || [])?.filter((option) => option?.value?.includes(value));

        setFilteredOptions(filtered_options);
    }

    // Handling the option when cleared
    const handleClear = (event) => {
        event.stopPropagation();

        setSelectedOption(null);
        setIsOpen(false);
    }

    // setting the filtered options with all options on mounting/updating the options
    useEffect(() => {
        setFilteredOptions(options);
    }, [options])

    // Saving it to the store when an option is selected
    useEffect(() => {
        dispatch(setFilters({name, value: selectedOption?.value}));
    }, [selectedOption])

    return (
        <div className={styles.container}>

            {/* lable is only visible if an option is selected */}
            {selectedOption ? (
                <div className={styles.label}>
                    {label}
                </div>
            ) : null}

            <div className={styles.select_container} onClick={() => setIsOpen(!isOpen)}>
                <input placeholder={selectedOption ? selectedOption?.label : placeholder} onChange={handleChange} />

                {/* Close icon for clearing selected option */}
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
            <div className={styles.overlap}>
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
            </div>
        ) : null}

        </div>
    )
}

export default Select