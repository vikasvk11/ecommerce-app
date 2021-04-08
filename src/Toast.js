import "./styles.css";

export function Toast({ message }) {
  return (
    <div className="toast toast-visible">
      <p>{message}</p>
      <span className="material-icons">close</span>
    </div>
  );
}
