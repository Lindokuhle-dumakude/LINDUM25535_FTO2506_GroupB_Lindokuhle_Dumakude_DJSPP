import { useNavigate } from "react-router-dom";
import "../styles/BackButton.css";

/**
 * Back button that preserves homepage filters, search, sort & page.
 */
export default function BackButton({ previousState }) {
  const navigate = useNavigate();

  function handleBack() {
    if (previousState) {
      navigate("/", { state: previousState });
    } else {
      navigate("/");
    }
  }

  return (
    <button className="back-btn" onClick={handleBack}>
      ← Back
    </button>
  );
}
