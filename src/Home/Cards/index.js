import {  useEffect, useState } from 'react';
import styles from './styles.module.css'
import { useSelector } from 'react-redux';

const MAPPING = {
    search: 'companyName',
    tech_stack: 'jobRole'
}

function Cards({setOffset=()=>{}, data={},isLoading=false}) {
    const [filteredList, setFilteredList] = useState([]);

    //Filters from the values saved in redux store
    const {filters} = useSelector((state) => state);

    useEffect(() => {

        // clearing the empty filters
        const finalFilters = Object.entries(filters || {})?.filter(([_, value]) => typeof value === 'object' ? value?.length > 0 : value );

        // if filters present, filtering out the list fetched
        if (finalFilters.length > 0) {

            // using reduce as there might be multiple filters
            const finalList = (finalFilters || [])?.reduce((acc, [key, value]) => {

                // multi-select filters has value in arrays, select has value in string
                let res = typeof value === 'object' 
                            ? (acc || [])?.filter((details) => {

                                //getting the value from the fetched list
                                const val = MAPPING[key] ? details?.[MAPPING[key]] : details?.[key];
                                
                                // return the data, if the value exists in the filter 
                                return (value?.includes(val))
                            })
                            : (acc || [])?.filter((details) => {
                                //getting the value from the fetched list
                                const val = MAPPING[key] ? details?.[MAPPING[key]] : details?.[key];

                                //If the type of value is string, return string with lowering the case. if the it's a number, then return as is
                                const final_val = typeof val === 'string' ? val?.toLowerCase() : val;
                                const filtered_val = typeof value === 'string' ? value?.toLowerCase() : value;


                                // if filter is min expected salary, check if the expected salary is equal or greated than the salary in jd
                                if (key === 'minJdSalary') {
                                    return final_val >= filtered_val
                                }

                                // If val type is string, implemented includes()
                                if (typeof val === 'string') {
                                    return final_val?.includes(filtered_val)
                                }
                                
                                // If val is a number, return data if both are same
                                return Number(final_val) === Number(filtered_val)
                            }) 

                return res;
            }, data?.jdList);

            // Finally set the filtered list after satisfying all the about conditions
            setFilteredList([...finalList])
        } else {
            setFilteredList(data?.jdList || [])
        }
    }, [filters])

    useEffect(() => {
        setFilteredList(data?.jdList || [])
    }, [data])


    // If the scroll bar reaches bottom of the window, which increases the offset by 12. Thus calls the api
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
        }

        setOffset((prev) => prev + 12);
    };
    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        //cleanup function for added even listener
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

                {/* comapny logo */}
                <div className={styles.logo_container}>
                    <img src={logoUrl} width={20} height={20} alt={companyName.charAt(0) || 'NA'} />
                </div>

                <div className={styles.job_details}>

                    {/* companu name */}
                    <div className={styles.company_name}>
                        {companyName || 'Company Name N.A'}
                    </div>

                    {/* job role */}
                    <div className={styles.job_role}>
                        {jobRole || 'Role N.A'}
                    </div>

                    {/* job location */}
                    <div className={styles.location}>
                        {location.length > 2 ? location[0].toUpperCase() + location.substring(1) : 'Loaction N.A'}
                    </div>
                </div>
            </div>

            {/* est. salary */}
            <div className={styles.salary}>
                Estimated Salary: {minJdSalary ? `${minJdSalary}K - ` : null} {maxJdSalary}K {salaryCurrencyCode}
            </div>

            {/* job details */}
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
                
            {/* Ein Experience */}
            <div className={styles.experience_info}>
                <div className={styles.title}>
                    Minimum Experience
                </div>

                <div className={styles.text}>
                    {minExp || 0} years
                </div>
            </div>

            {/* Apply button */}
            <div className={styles.apply_button_container}>
                <button>⚡ Easy Apply</button>
            </div>
        </div>)
        }) : (
            // if no data found then return the custom empty handler
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