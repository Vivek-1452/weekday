import { useEffect, useState } from 'react';
import styles from './styles.module.css'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import CloseIcon from '@mui/icons-material/Close';
import { setFilters } from '../../../store/filterSlice';
import { useDispatch } from 'react-redux';

function MultiSelect({data={}}) {
    const [isOpen, setIsOpen] = useState(false);

    const [filteredOptions, setFilteredOptions] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState([]);

    const dispatch = useDispatch();

    const {label, placeholder, options, name} = data || {};

    // handling the selected option
    const handleOptions = (event) => {
        if (filteredOptions?.length > 0) {
            const [label, value] = event.target.dataset.value?.split('::');
    
            // if an option is already selectedOptions, no further changes will be made on clicking the same option
            if (!selectedOptions?.some((item) => item.value === value)) {
                setSelectedOptions((prev) => ([...prev, {label, value}]));
            }
    
            setIsOpen(false);
        }
    }

    // Filtering the options on search
    const handleChange = (event) => {
        const value = event.target.value;

        const filtered_options = (options || [])?.filter((option) => option?.value?.includes(value));

        setFilteredOptions(filtered_options);
    }

    // Handling the options when cleared
    const handleClear = (event) => {
        event.stopPropagation();

        setSelectedOptions([]);
        setIsOpen(false);
    }

    // Handling each one of the option when cleared
    const handleClearOption = (value) => {
        const options = selectedOptions?.filter((item) => item?.value !== value);

        setSelectedOptions(options);
    }

    // setting the filtered options with all options on mounting/updating the options
    useEffect(() => {
        setFilteredOptions(options);
    }, [options])

    // Saving it to the store when an option is selected
    useEffect(() => {
        dispatch(setFilters({name, value: (selectedOptions || [])?.map((option) => option.value)}));
    }, [selectedOptions])

    const isSelectedOptionsEmpty = selectedOptions?.length === 0

    return (
        <div className={styles.container}>

            {/* lable is only visible if an option is selected */}
            {!isSelectedOptionsEmpty ? (
                <div className={styles.label}>
                    {label}
                </div>
            ) : null}

            <div className={styles.select_container} onClick={() => setIsOpen(!isOpen)}>

                {/* mapping all the selected options */}
                {!isSelectedOptionsEmpty ? ( (selectedOptions || [])?.map((option) => (
                    <div className={styles.selected_option_container}>
                        <div className={styles.selected_option}>{option?.label}</div>
                        
                        {/* each and every selected option can be cleared by this close icon */}
                        <span className={styles.clear_option}>
                            <CloseIcon onClick={(e) => {e.stopPropagation(); handleClearOption(option?.value)}} />
                        </span>
                    </div>
                ))
                ) : null}

                <input placeholder={!isSelectedOptionsEmpty ? '' : placeholder} onChange={handleChange} />

                {/* Close icon to clear all the options/values */}
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
            <div className={styles.overlap}>
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
            </div>
        ) : null}

        </div>
    )
}

export default MultiSelect