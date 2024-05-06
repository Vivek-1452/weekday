import { useCallback, useEffect, useState } from "react"

const useGetJobs = ({setIsLoading=()=>{}, offSet=0}) => {
  const [data, setData] = useState({});

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({limit: 12, offset: offSet});
  
  const requestOptions = {method: "POST", headers: myHeaders, body};

  // useCallback for minimal re-rendering 
  const getJobDetails = useCallback(async () => {
    try {
			const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
			const result = await response.json();

      // If offset changes, the new result will be get appended to the data that was previously fetched
      setData((prev) => ({jdList: [...(prev?.jdList || []), ...result?.jdList]}));
      setIsLoading(false);

			return result;

		} catch (err) {

      // if any error pops upload, data will be set to empty obj and consoles the error
			setData({});
      console.error(err);

			return err;
		}
  }, [body])

  // Whenever body i.e offset changes, fetching the data
  useEffect(() => {
    getJobDetails()
  }, [getJobDetails, body])

  return {data}
}

export default useGetJobs