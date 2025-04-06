import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h2>404 - Page Not Found</h2>
      <p>Oops! Looks like you took a wrong turn.</p>
      <Link style={{ color: "white", textDecoration: "underline" }} to="/">
        Go Back Home
      </Link>
    </main>
  );
};

export default NotFound;
