import FishLogo from "./FishLogo";

export default function Header() {
  return (
    <header className="sticky-header">
      <div className="logo-container">
        <FishLogo width={40} height={40} />
        {/* <div className="logo-text">
          Sea<span className="blue-text">freshh</span>
        </div> */}
      </div>
    </header>
  );
}
