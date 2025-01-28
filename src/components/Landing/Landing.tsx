import { Link } from "react-router-dom";
import "./Landing.css";

import img15 from "../../assets/fonts/iranyekan/Images/landingimage/client1.jpg";
import img16 from "../../assets/fonts/iranyekan/Images/landingimage/client2.jpg";
import img1676 from "../../assets/fonts/iranyekan/Images/aabbaabb.jpg";

import img1 from "../../assets/fonts/iranyekan/Images/landingimage/hero-bg.png";
import img4 from "../../assets/fonts/iranyekan/Images/landingimage/s2.png";
import img5 from "../../assets/fonts/iranyekan/Images/landingimage/s3.png";
import img2 from "../../assets/fonts/iranyekan/Images/landingimage/slider-img.png";
import img17 from "../../assets/fonts/iranyekan/Images/landingimage/انتخاب واحد2.jpg";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Landing() {
  const { t , i18n} = useTranslation();
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage === "fa" || storedLanguage === "en" ? storedLanguage : "fa";
    i18n.changeLanguage(language);
  }, [i18n]);
  return (
    <>
      <div className="hero_area">
        <div className="hero_bg_box">
          <div className="bg_img_box">
            <img src={img1} alt="" />
          </div>
        </div>
        <section className="slider_section">
          <div
            id="customCarousel1"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row flex">
                    <div className=" col-md-6 custom mr-3">
                      <div className="detail-box">
                        <h1 className="text-center">{t("landing.title")}</h1>
                        <p className="text-justify">{t("landing.description")}</p>
                      </div>
                    </div>
                    <div className=" col-md-6 custom ">
                      <div className="img-box">
                        <img src={img2} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="service_section">
        <div className="container flex flex-col">
          <div className="heading_container heading_center">
            <h2 className="fonty text-center">{t("landing.features_title")}</h2>
          </div>
          <div className="row flex">
            <div className=" col-md-4 boxy me-3 ">
              <div className="box ">
                <div className="img-box">
                  <img src={img4} alt="" />
                </div>
                <div className="detail-box">
                  <h5>{t("feature1.title")}</h5>
                  <br />
                  <p className="text-justify">{t("feature1.description")}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 boxy me-3">
              <div className="box ">
                <div className="img-box">
                  <img src={img5} alt="" />
                </div>
                <div className="detail-box">
                  <h5>{t("feature2.title")}</h5>
                  <br />
                  <p className="text-justify">{t("feature2.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about_section layout_padding flex justify-center">
        <div className="container flex flex-col">
          <div className="heading_container heading_center">
            <h2 className="fonty">{t("about.title")}</h2>
          </div>
          <div className="row flex justify-between" dir="ltr">
            <div className="col-md-6 why ml-4">
              <div className="img-box">
              <img src={img17} alt="" style={{ width: "70%", height: "auto" }} />

              </div>
            </div>
            <div className="col-md-6 why me-5" style={{ width: "120%", height: "auto" }}>
              <div className="detail-box text-center">
                <p className="text-right-justify">{t("about.description")}</p>
                <p className="text-center font-bold">{t("about.highlight")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="client_section layout_padding flex justify-center">
        <div className="container flex flex-col">
          <div className="heading_container heading_center psudo_white_primary mb_45">
            <h2 className="fonty">{t("testimonials.title")}</h2>
          </div>
          <div className="carousel-wrap">
            <div className="owl-carousel client_owl-carousel flex ">
              <div className="item">
                <div className="box">
                  <div className="img-box">
                    <img src={img15} alt="" className="box-img" />
                  </div>
                  <div className="detail-box">
                    <div className="client_id">
                      <div className="client_info">
                        <p>{t("testimonials.client1.name")}</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>{t("testimonials.client1.feedback")}</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="box">
                  <div className="img-box">
                    <img src={img16} alt="" className="box-img" />
                  </div>
                  <div className="detail-box">
                    <div className="client_id">
                      <div className="client_info">
                        <p>{t("testimonials.client2.name")}</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>{t("testimonials.client2.feedback")}</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="box">
                  <div className="img-box">
                    <img src={img1676} alt="" className="box-img" />
                  </div>
                  <div className="detail-box">
                    <div className="client_id">
                      <div className="client_info">
                        <p>{t("testimonials.client3.name")}</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>{t("testimonials.client3.feedback")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info_section layout_padding2 flex justify-center">
        <div className="container ml-[200px]">
          <div dir="ltr" className="row flex">
            <div className="col-md-6 col-lg-3 info_col ml-5 pl-4">
            </div>
            <div className="col-md-6 col-lg-3 info_col flex text-center mr-auto pl-4">
              <div className="info_detail">
                <h4>{t("info.title")}</h4>
                <p className="about-text">{t("info.description")}</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-2 info_col pl-4">
              <div className="info_link_box mr-9">
                <h4>{t("info.links_title")}</h4>
                <div className="info_links">
                  <Link className="" to="/profile">
                    {t("info.links.profile")}
                  </Link>
                  <Link className="" to="/courses">
                    {t("info.links.courses")}
                  </Link>
                  <Link className="" to="/schedule">
                    {t("info.links.schedule")}
                  </Link>
                  <Link className="" to="/professors">
                    {t("info.links.professors")}
                  </Link>
                  <Link className="" to="/feedbackform">
                    {t("info.links.feedback_form")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footer_section flex justify-center ">
        <div className="container h-[15px]">
          <p>
            &copy;{" "}
            <span id="displayYear">
              {" "}
              {t("footer.copyright")}
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
