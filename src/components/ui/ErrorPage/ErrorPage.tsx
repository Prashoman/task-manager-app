/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error: any = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <h1 className="text-9xl font-bold text-red-500">Oops!</h1>
      <h2 className="text-3xl font-semibold mt-4">
        Something went wrong!
      </h2>
      <p className="text-lg mt-2 text-gray-600">
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;