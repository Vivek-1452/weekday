import useGetJobs from './hooks/useGetJobs'
import Cards from './Cards';
import { useState } from 'react';
import styles from './styles.module.css'
import Select from './common/Select';
import getFilters from './config/getFilters';
import MultiSelect from './common/MultiSelect';
import Search from './common/Search';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const COMPONENT_MAPPING = {
    multi_select: MultiSelect,
    select: Select,
    search: Search
}

function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const [offSet, setOffset] = useState(0);

    const [showFilters, setShowFilters] = useState(true);
    
    const {data} = useGetJobs({setIsLoading, offSet});

    const jobs_data = typeof(data) === 'string' ? JSON.parse(data) : data;

    const {filters: filterOptions} = getFilters();

    if (isLoading) {
        return <div className={styles.loader_container}><span className={styles.loader}></span></div>
    }

    return (
        <>
            <div className={styles.container}>

                {showFilters ? (
                    <div className={styles.filters_container}>

                        <span className={styles.details}>
                            Done by: vivekpaidi4519@gmail.com
                        </span>

                        {filterOptions?.map((filters) => {
                            const {type} = filters || {};
                            const Component = COMPONENT_MAPPING[type] || Select;
                            
                            return (
                                <Component data={filters} />
                            )
                        })}
                    </div>
                ) : null}

                {showFilters ? (
                    <div className={styles.btn_container}>
                        <button onClick={() => setShowFilters(false)}><KeyboardArrowUpIcon /> Hide Filters</button>
                    </div>
                ) : (
                    <div className={styles.btn_container}>
                        <button onClick={() => setShowFilters(true)}><KeyboardArrowDownIcon /> Show Filters</button>
                    </div>
                )}
            </div>

            <Cards setOffset={setOffset} data={jobs_data} isLoading={isLoading} />
        </>
    )
}

export default Home