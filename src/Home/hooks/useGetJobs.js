import { useCallback, useEffect, useState } from "react"

const useGetJobs = ({setIsLoading=()=>{}, offSet=0}) => {
  const [data, setData] = useState({});

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({limit: 12, offset: offSet});
  
  const requestOptions = {method: "POST", headers: myHeaders, body};

  const getJobDetails = useCallback(async () => {
    try {
			const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
			const result = await response.json();

      setData((prev) => ({jdList: [...(prev?.jdList || []), ...result?.jdList]}));
      setIsLoading(false);

			return result;

		} catch (err) {
			setData({});
      console.error(err);

			return err;
		}
  }, [body])

  useEffect(() => {
    getJobDetails()
  }, [getJobDetails, body])

  return {data}
}

export default useGetJobs