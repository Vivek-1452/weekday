import { useCallback, useEffect, useState } from "react"

const useGetJobs = ({setIsLoading=()=>{}, pageLimit=10}) => {
  const [data, setData] = useState({});

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({limit: pageLimit, offset: 0});
  
  const requestOptions = {method: "POST", headers: myHeaders, body};

  const getJobDetails = useCallback(async () => {
    try {
			const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
			const result = await response.text();

      setData(result);
      setIsLoading(false);

			return result;

		} catch (err) {
			setData({});
      console.error(err);

			return err;
		}
  }, [requestOptions, pageLimit])

  useEffect(() => {
    getJobDetails()
  }, [getJobDetails, pageLimit])

  return {data}
}

export default useGetJobs