import styles from './styles.module.css'

function Search({data={}}) {

    const {placeholder, options, label} = data || {};

    const handleChange = (event) => {
        const value = event.target.value;

        const filtered_options = (options || [])?.filter((option) => option?.companyName?.includes(value));

        // setFilteredOptions(filtered_options); use redux
    }

    return (
        <div className={styles.container}>

{/* {!isSelectedOptionsEmpty ? (
                <div className={styles.label}>
                    {label}
                </div>
            ) : null} */}

            <div className={styles.select_container}>
                <input placeholder={placeholder} onChange={handleChange} />
            </div>
        </div>
    )
}

export default Search