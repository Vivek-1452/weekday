import {  useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'
import { useSelector } from 'react-redux';

const MAPPING = {
    search: 'companyName',
    tech_stack: 'jobRole'
}

function Cards({setOffset=()=>{}, data={},isLoading=false}) {
    const [filteredList, setFilteredList] = useState([]);

    const {filters} = useSelector((state) => state);

    useEffect(() => {
        const finalFilters = Object.entries(filters || {})?.filter(([_, value]) => typeof value === 'object' ? value?.length > 0 : value );

        if (finalFilters.length > 0) {
            const finalList = (finalFilters || [])?.reduce((acc, [key, value]) => {

                let res = typeof value === 'object' 
                            ? (acc || [])?.filter((details) => {
                                const val = MAPPING[key] ? details?.[MAPPING[key]] : details?.[key];
                                
                                return (value?.includes(val))
                            })
                            : (acc || [])?.filter((details) => {
                                const val = MAPPING[key] ? details?.[MAPPING[key]] : details?.[key];
                                const final_val = typeof val === 'string' ? val?.toLowerCase() : val;
                                const filtered_val = typeof value === 'string' ? value?.toLowerCase() : value;


                                if (key === 'minJdSalary') {
                                    return final_val >= filtered_val
                                }

                                if (typeof val === 'string') {
                                    return final_val?.includes(filtered_val)
                                }
                                
                                return Number(final_val) === Number(filtered_val)
                            }) 

                return res;
            }, data?.jdList);

            setFilteredList([...finalList])
        } else {
            setFilteredList(data?.jdList || [])
        }
    }, [filters])

    useEffect(() => {
        setFilteredList(data?.jdList || [])
    }, [data])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
        }

        setOffset((prev) => prev + 12);
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

return (
    <div className={styles.cards_conatiner}>
        {!!filteredList?.length ? (filteredList || [])?.map((job_data, index) => {
        const {companyName='', logoUrl='', jobRole='', 
            location='', salaryCurrencyCode='', minJdSalary=0, maxJdSalary=0, jobDetailsFromCompany='', minExp=0} = job_data || {};

        return (
        <div className={styles.container} key={job_data?.jdUid}>
            <div className={styles.header}>
                <div className={styles.logo_container}>
                    <img src={logoUrl} width={20} height={20} alt={companyName.charAt(0) || 'NA'} />
                </div>

                <div className={styles.job_details}>
                    <div className={styles.company_name}>
                        {companyName || 'Company Name N.A'}
                    </div>

                    <div className={styles.job_role}>
                        {jobRole || 'Role N.A'}
                    </div>

                    <div className={styles.location}>
                        {location.length > 2 ? location[0].toUpperCase() + location.substring(1) : 'Loaction N.A'}
                    </div>
                </div>
            </div>

            <div className={styles.salary}>
                Estimated Salary: {minJdSalary ? `${minJdSalary}K - ` : null} {maxJdSalary}K {salaryCurrencyCode}
            </div>

            <div className={styles.about_company}>
                <div className={styles.title}>
                    About Comapny
                </div>

                <div className={styles.text}>
                    {jobDetailsFromCompany}
                </div>
            </div>

            <div className={styles.show_more}>
                        Show More
                    </div>
                
            <div className={styles.experience_info}>
                <div className={styles.title}>
                    Minimum Experience
                </div>

                <div className={styles.text}>
                    {minExp || 0} years
                </div>
            </div>

            <div className={styles.apply_button_container}>
                <button>⚡ Easy Apply</button>
            </div>
        </div>)
        }) : (
            <div className={styles.no_data}>
                <img width={200} src='https://jobs.weekday.works/_next/static/media/nothing-found.4d8f334c.png' alt=''/>

                <span>
                    Ouch! No Jobs available for this category at the moment
                </span>
            </div>
        )}
    </div>
)
}

export default Cards