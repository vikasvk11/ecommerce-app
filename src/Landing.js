import { useNavigate } from "react-router-dom";
import "./landing.css";

export function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <img
        onClick={() => navigate("/products")}
        className="banner"
        src="banner1.jpg"
        alt="banner"
      />
      <div onClick={() => navigate("/products")} className="image-card">
        <img className="landing-product" src="Nikon.jpeg" alt="cam" />
        <h2>Min 50% off</h2>
        <p>Mirrorless Cameras</p>
      </div>
      <div onClick={() => navigate("/products")} className="image-card">
        <img className="landing-product" src="canon.png" alt="cam" />
        <h2>Min 20% off</h2>
        <p>DSLR Cameras</p>
      </div>
      <img
        onClick={() => navigate("/products")}
        className="banner"
        src="banner2.jpg"
        alt="banner"
      />
      <div onClick={() => navigate("/products")} className="image-card">
        <img className="landing-product" src="djifpv.jpg" alt="cam" />
        <h2>New Launch</h2>
        <p>dji FPV</p>
      </div>
      <div onClick={() => navigate("/products")} className="image-card">
        <img className="landing-product" src="gopro.jpg" alt="cam" />
        <h2>Min 30% off</h2>
        <p>Action Cameras</p>
      </div>
    </div>
  );
}
