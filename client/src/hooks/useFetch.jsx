import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const baseURL = process.env.REACT_APP_BASE_URL;

const useFetch = (urlSegment) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(`Calling ${baseURL}${urlSegment}`);
        const response = await axios.get(`${baseURL}${urlSegment}`, {
          headers: {
            Authorization: `Bearer ${authContext.token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [urlSegment]);

  return { data, loading, error };
};

export default useFetch;
