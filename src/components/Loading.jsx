import "../styles/Loading.css";

/**
 * @component Loading
 * @description Displays a simple loading indicator while data is being fetched.
 */
export default function Loading() {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>Loading podcasts...</p>
    </div>
  );
}
