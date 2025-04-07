import { Link } from "react-router-dom";

export default function NoPermission() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600">404</h1>
      <p className="text-3xl font-bold">Page Not Found</p>
      <p className="text-gray-700 mt-2">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Go to Home
      </Link>
    </div>
  );
}
