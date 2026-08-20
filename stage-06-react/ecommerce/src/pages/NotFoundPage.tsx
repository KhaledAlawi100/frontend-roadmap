import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h2 className="text-4xl font-bold">404</h2>
      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded bg-black px-4 py-2 text-white "
      >
        Back to Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
