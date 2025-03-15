import {
  isRouteErrorResponse,
  Links,
  Meta,
  Routes,
  Route,
  Scripts,
  ScrollRestoration,
  redirect,
} from "react-router";
import Route from "react-router";

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center text-center bg-white">
      <div className="p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600">{message}</h1>
        <p className="text-stone-700 mt-2">{details}</p>
        <a
          href="/"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Go back to the main page
        </a>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto bg-gray-100 border rounded-md mt-4 text-left text-sm">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
