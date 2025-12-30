import "./LoadingSpinner.css";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <img 
          src="/images/loading.png" 
          alt="Loading" 
          className="spinner-image"
        />
      </div>
      <div className="loading-message">{message}</div>
    </div>
  );
}