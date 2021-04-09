import "./landing.css";

export function Landing() {
  return (
    <div className="landing-container">
      <img className="banner" src="banner1.jpg" alt="banner" />
      <div className="image-card">
        <img className="landing-product" src="Nikon.jpeg" alt="cam" />
        <h2>Min 50% off</h2>
        <p>Mirrorless Cameras</p>
      </div>
      <div className="image-card">
        <img className="landing-product" src="canon.png" alt="cam" />
        <h2>Min 20% off</h2>
        <p>DSLR Cameras</p>
      </div>
      <img className="banner" src="banner2.jpg" alt="banner" />
      <div className="image-card">
        <img className="landing-product" src="djifpv.jpg" alt="cam" />
        <h2>New Launch</h2>
        <p>dji FPV</p>
      </div>
      <div className="image-card">
        <img className="landing-product" src="gopro.jpg" alt="cam" />
        <h2>Min 30% off</h2>
        <p>Action Cameras</p>
      </div>
    </div>
  );
}
