import "../styles/ErrorMessage.css";

/**
 * @component ErrorMessage
 * @description Displays an error block when the API fails or data cannot load.
 * @param {Object} props
 * @param {string} props.message - Error text to show.
 */
export default function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <p>{message || "Something went wrong. Please try again."}</p>
    </div>
  );
}
