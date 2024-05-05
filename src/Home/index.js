import useGetJobs from './hooks/useGetJobs'
import Cards from './Cards';
import { useState } from 'react';

import styles from './styles.module.css'

const no_employees_options = [
    {label: '1-10', value: '1::10'},
    {label: '11-20', value: '11::20'},
    {label: '21-50', value: '21::50'},
    {label: '51-100', value: '51::100'},
    {label: '101-200', value: '101::200'},
    {label: '201-500', value: '201::500'},
    {label: '500+', value: '500'},
]


function Home() {
    const [filters, setFilters] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const {data} = useGetJobs({filters, setIsLoading});

    const jobs_data = typeof(data) === 'string' ? JSON.parse(data) : data;

    if (isLoading) {
        return <div className={styles.loader_container}><span className={styles.loader}></span></div>
    }

return (
    <div>

    <select name="no_employees">
        {no_employees_options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>

        <Cards data={jobs_data} setFilters={setFilters} />
    </div>
)
}

export default Home