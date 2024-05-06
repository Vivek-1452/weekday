import { useCallback, useEffect, useState } from "react"

const useGetJobs = ({setIsLoading=()=>{}}) => {
  const [data, setData] = useState({});

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({limit: 10, offset: 0});
  
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
  }, [requestOptions])

  useEffect(() => {
    getJobDetails()
  }, [getJobDetails])

  return {data}
}

export default useGetJobs