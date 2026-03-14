import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faCloud,
  faSun,
  faArrowRight,
  faShieldAlt,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

function Landing() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="landing-hero">
      {/* Ambient blobs */}
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />

      <div className={`landing-content ${visible ? "visible" : ""}`}>
        {/* Floating icons row */}
        <div className="anim-icons mb-3">
          <FontAwesomeIcon
            icon={faSun}
            size="2x"
            className="text-warning me-3"
          />
          <FontAwesomeIcon
            icon={faWind}
            size="2x"
            className="text-info   me-3"
          />
          <FontAwesomeIcon icon={faCloud} size="2x" className="text-light" />
        </div>

        {/* Title */}
        <h1 className="landing-title">
          <span className="text-info">Breeze</span>
          <span className="text-white">plan</span>
        </h1>

        {/* Subtitle */}
        <p className="landing-sub text-light">
          Plan your outdoor adventures with{" "}
          <span className="text-info fw-semibold">
            real-time weather intelligence
          </span>
          .
          <br />
          No guessing. Just breeze through it.
        </p>

        {/* Glass card */}
        <div className="glass-card mb-4">
          <p
            className="text-light mb-4"
            style={{
              textAlign: "justify",
              lineHeight: "1.85",
              fontSize: "0.97rem",
            }}
          >
            With Breezeplan you can plan your outdoor activities without any
            tension. Based on accurate weather information, Breezeplan gives you
            all the possible outdoor activities you can engage in. We are{" "}
            <strong className="text-info">not storing your data</strong> — your
            privacy is our priority.
          </p>

          {/* Feature badges */}
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <span className="feature-badge">
              <FontAwesomeIcon icon={faSun} className="me-2 text-warning" />
              Real-time Weather
            </span>
            <span className="feature-badge">
              <FontAwesomeIcon icon={faBolt} className="me-2 text-warning" />
              Smart Suggestions
            </span>
            <span className="feature-badge">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="me-2 text-success"
              />
              Privacy First
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link to="/Getsuggestion" className="cta-btn">
          Explore Breezeplan <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
}

export default Landing;
