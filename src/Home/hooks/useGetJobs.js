import { useState } from "react"

const useGetJobs = ({filters={}, setIsLoading=()=>{}}) => {
  const [data, setData] = useState({});

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({limit: 10, offset: 0});
  
  const requestOptions = {method: "POST", headers: myHeaders, body};
  
  fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
    .then((response) => response.text())
    .then((result) => {setData(result); setIsLoading(false)})
    .catch((error) => console.error(error));

  return {data}
}

export default useGetJobs