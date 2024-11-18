import { useEffect, useState } from 'react';
import { token } from '../config';

const useFetchData = (url) => {
    const [data, setData] = useState(null); // Initialized as null
    const [loading, setLoading] = useState(true); // Start as loading
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // Set loading to true when starting the fetch request

            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message || 'Something went wrong. 🤢');
                }

                // Ensure data is valid and handle accordingly
                if (result.data) {
                    setData(result.data); // Assuming result.data is the desired data
                } else {
                    throw new Error('No data available.');
                }

                setLoading(false);  // Set loading to false after successful fetch
            } catch (err) {
                setLoading(false);
                setError(err.message || 'An unknown error occurred'); // Store the error message
            }
        };

        fetchData();
    }, [url]); // Runs again only if URL changes

    return {
        data,
        loading,
        error,
    };
};

export default useFetchData;
