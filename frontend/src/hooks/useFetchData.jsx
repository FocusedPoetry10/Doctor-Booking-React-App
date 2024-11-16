import { useEffect, useState } from 'react';
import { token } from '../config';

const useFetchData = (url) => {
    const [data, setData] = useState(null); // Initialized as null
    const [loading, setLoading] = useState(true); // Start as loading
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new error(result.message || 'Something went wrong. 🤢');
                }

                setData(result.data); // Ensure data is always an array
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
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
