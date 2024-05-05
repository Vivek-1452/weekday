import { useState } from "react"

const useGetJobs= () => {
  const [data, setData]  =useState(null);

  const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "limit": 10,
        "offset": 0
       });
       
       const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
       };
       
       fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((response) => response.text())
        .then((result) => setData(result))
        .catch((error) => console.error(error));

  return {data}
}

export default useGetJobs