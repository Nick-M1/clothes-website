'use client'; // Error components must be Client components

import { useEffect } from 'react';
import Error404Page from "../../components/error/Error404Page";

export default function Error({ error, reset }: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <Error404Page reset={reset}/>
    );
}