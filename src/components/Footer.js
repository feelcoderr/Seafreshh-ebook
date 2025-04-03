export default function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-left">
        <div className="footer-icon">
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="4"
              width="20"
              height="16"
              rx="2"
              stroke="white"
              strokeWidth="2"
            />
            <path d="M2 7L12 14L22 7" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className="footer-company-info">
          <h3 className="footer-company-name">SEA FRESHH</h3>
          <p>Contact : +91 9557676740</p>
          <p>Email : seafreshh@gmail.com</p>
          <p>Business Hours : Mon-Sat (11:00AM - 7:00PM)</p>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-icon">
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 13C10 13.4295 10.0776 13.8507 10.2224 14.2405C10.3671 14.6304 10.5767 14.9815 10.8393 15.2728C11.1019 15.5641 11.4123 15.7993 11.7537 15.9649C12.0951 16.1305 12.4602 16.2229 12.8295 16.2373C13.1988 16.2516 13.5658 16.1875 13.9138 16.0487C14.2618 15.9099 14.5829 15.6991 14.8601 15.4285C15.1372 15.158 15.3644 14.8333 15.5293 14.4732C15.6941 14.1131 15.7933 13.7248 15.821 13.331C15.8487 12.9373 15.8045 12.5424 15.6908 12.1652C15.5771 11.788 15.396 11.4361 15.1581 11.127C14.9202 10.8179 14.6304 10.5577 14.3053 10.3612C13.9802 10.1646 13.6259 10.0353 13.2579 9.9797C12.8898 9.924 12.5153 9.9431 12.154 10.0357C11.7926 10.1283 11.4518 10.2928 11.1498 10.5203C10.8478 10.7477 10.59 11.0339 10.3904 11.361C10.1907 11.6881 10.0527 12.0498 9.983 12.4304C9.91324 12.811 9.9129 13.202 9.983 13.583"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 11L6 9L8 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 17L18 15L16 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="footer-links">
          <h3 className="footer-links-title">IMPORTANT LINKS</h3>
          <ul>
            <li>
              <a href="#">CONTACT</a>
            </li>
            <li>
              <a href="#">PRIVACY POLICY</a>
            </li>
            <li>
              <a href="#">REFUND POLICY</a>
            </li>
            <li>
              <a href="#">TERM OF SERVICES</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
