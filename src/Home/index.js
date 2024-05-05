import useGetJobs from './hooks/useGetJobs'
import Cards from './Cards';
import { useState } from 'react';
import styles from './styles.module.css'
import Select from './common/Select';
import getFilters from './config/getFilters';
import MultiSelect from './common/MultiSelect';
import Search from './common/Search';

const COMPONENT_MAPPING = {
    multi_select: MultiSelect,
    select: Select,
    search: Search
}

function Home() {
    const [filters, setFilters] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const {data} = useGetJobs({filters, setIsLoading});

    const jobs_data = typeof(data) === 'string' ? JSON.parse(data) : data;

    const {filters: filterOptions} = getFilters();

    if (isLoading) {
        return <div className={styles.loader_container}><span className={styles.loader}></span></div>
    }

    return (
        <div>
            <div className={styles.container}>
                {filterOptions?.map((filters) => {
                    const {type} = filters || {};
                    const Component = COMPONENT_MAPPING[type] || Select;
                    
                    return (
                        <Component data={filters} />
                    )
                })}
            </div>

            <Cards data={jobs_data} setFilters={setFilters} />
        </div>
    )
}

export default Home