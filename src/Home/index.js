import styles from './styles.module.css'
import useGetJobs from './hooks/useGetJobs'
import Cards from './Cards';


function Home() {
    const {data} = useGetJobs();

    const jobs_data = JSON.parse(data);


  return (
    <Cards data={jobs_data} />
  )
}

export default Home