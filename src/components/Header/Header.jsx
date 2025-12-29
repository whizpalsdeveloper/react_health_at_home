import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-text">
          <span className="main-logo-text">HEALTH AT H<span className="red-cross">✕</span>ME</span>
          <span className="powered-text">POWERED BY DR.NOW</span>
        </div>
      </div>
      <div className="header-right">
        <div className="logo-text">
          <span className="main-logo-text">DR.N<span className="red-cross">✕</span>W</span>
          <span className="powered-text">PRESCRIPTIONS</span>
        </div>
      </div>
    </header>
  );
}
