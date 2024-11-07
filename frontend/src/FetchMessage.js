import React, { useEffect, useState } from 'react';

const FetchMessage = () => {
    const [message, sentMessage] = useState("");

    useEffect(() => {
        fetch('/api')
        .then(response => response.json())
        .then(data => sentMessage(data.message));
    }, []);

    return <div>{message}</div>;
};

export default
FetchMessage;