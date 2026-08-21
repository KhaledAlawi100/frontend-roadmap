// Warning / Alert Triangle SVG Icon
const AlertIcon = () => (
  <svg
    className="h-16 w-16 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  // Provide a default reload function if resetErrorBoundary isn't passed
  const handleReset = resetErrorBoundary || (() => window.location.reload());

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <AlertIcon />
      <h2 className="mt-6 text-2xl font-semibold text-gray-800">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-md text-gray-600">
        We are sorry, but an unexpected error occurred. Please try refreshing
        the page.
      </p>
      {error && (
        <p className="mt-4 max-w-lg text-sm text-gray-500 wrap-break-word border border-gray-200 bg-gray-50 p-3 rounded-md">
          {error.message}
        </p>
      )}
      <button
        onClick={handleReset}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {/* Refresh Icon SVG */}
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        Try Again
      </button>
    </div>
  );
}

export default ErrorFallback;
