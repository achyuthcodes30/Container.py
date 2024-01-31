import "../styles/Home.css";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const pageRef = useRef(null);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div ref={pageRef} className="layout">
        <h1
          data-aos="fade-down"
          data-aos-duration="1200"
          data-aos-easing="ease-sine"
          data-aos-delay="400"
          className="title"
        >
          My Task Manager
        </h1>
        <div className="box">
          <div className="hr"></div>
        </div>
      </div>
    </>
  );
}
export default Home;
