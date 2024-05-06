import { createRef, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'

const dummy_data = {
    "jdUid": "cfff35ac-053c-11ef-83d3-06301d0a7178-92010",
    "jdLink": "https://weekday.works",
    "jobDetailsFromCompany": "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.",
    "maxJdSalary": 61,
    "minJdSalary": null,
    "salaryCurrencyCode": "USD",
    "location": "delhi ncr",
    "minExp": 3,
    "maxExp": 6,
    "jobRole": "frontend",
    "companyName": "Dropbox",
    "logoUrl": "https://logo.clearbit.com/dropbox.com"
}

function Cards({data={}}) {
    const cardContainerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = cardContainerRef.current.scrollHeight;
        
            const scrollTop = cardContainerRef.current.scrollTop;

            if (scrollHeight - scrollTop < 1000) console.log(scrollTop, scrollHeight);

        }


        if (cardContainerRef.current) {
			cardContainerRef.current.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (cardContainerRef.current) {
				cardContainerRef.current.removeEventListener('scroll', handleScroll);
			}
		};
    }, [])

return (
    <div className={styles.cards_conatiner} ref={cardContainerRef}>
        {(data?.jdList || [])?.map((job_data, index) => {
        const {companyName='', logoUrl='', jobRole='', 
            location='', salaryCurrencyCode='', minJdSalary=0, maxJdSalary=0, jobDetailsFromCompany='', minExp=0} = job_data || {};

        return (
        <div className={styles.container} key={index}>
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
                Estimated Salary: {minJdSalary ? `${minJdSalary}k - ` : null} {maxJdSalary}k {salaryCurrencyCode}
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
        })}
    </div>
)
}

export default Cards