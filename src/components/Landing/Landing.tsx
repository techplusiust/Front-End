import React from "react";
import "../Landing/Landing.css";
import {Link} from 'react-router-dom';

import img1 from "../../assets/fonts/iranyekan/Images/landingimage/hero-bg.png";
import img2 from "../../assets/fonts/iranyekan/Images/landingimage/slider-img.png";
import img3 from "../../assets/fonts/iranyekan/Images/landingimage/s1.png";
import img4 from "../../assets/fonts/iranyekan/Images/landingimage/s2.png";
import img5 from "../../assets/fonts/iranyekan/Images/landingimage/s3.png";
import img6 from "../../assets/fonts/iranyekan/Images/landingimage/about-img.png";
import img7 from "../../assets/fonts/iranyekan/Images/landingimage/w1.png";
import img8 from "../../assets/fonts/iranyekan/Images/landingimage/w2.png";
import img9 from "../../assets/fonts/iranyekan/Images/landingimage/w3.png";
import img10 from "../../assets/fonts/iranyekan/Images/landingimage/w4.png";
import img11 from "../../assets/fonts/iranyekan/Images/landingimage/team-1.jpg";
import img12 from "../../assets/fonts/iranyekan/Images/landingimage/team-2.jpg";
import img13 from "../../assets/fonts/iranyekan/Images/landingimage/team-3.jpg";
import img14 from "../../assets/fonts/iranyekan/Images/landingimage/team-4.jpg";
import img15 from "../../assets/fonts/iranyekan/Images/landingimage/client1.jpg";
import img16 from "../../assets/fonts/iranyekan/Images/landingimage/client2.jpg";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";
import { BsInstagram } from "react-icons/bs";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { FaPhone } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";



export default function Landing() {
  return (
    <>

      <div className="hero_area">
        <div className="hero_bg_box">
          <div className="bg_img_box">
            <img src={img1} alt="" />
          </div>
        </div>

        <header className="header_section flex justify-center">
          <div className="container">
            <nav className="navbar navbar-expand-lg custom_nav-container flex justify-between " dir="ltr">
              <Link className="navbar-brand" to="index.html" >
                <span>Finexo</span>
              </Link>

              {/* <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className=""> </span>
              </button> */}

              <div
              >
                <ul className="flex m-2 text-white">
                  <li className="nav-item active me-5">
                    <Link className="nav-link" to="/">
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link className="nav-link" to="/about">
                      {" "}
                      About
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link className="nav-link" to="/service">
                      Services
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link className="nav-link" to="/why">
                      Why Us
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link className="nav-link" to="/team">
                      Team
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link className="nav-link" to="/login">
                      {" "}
                      <i className="fa fa-user" aria-hidden="true"></i> Login
                    </Link>
                  </li>
                  <form className="form-inline">
                    <button
                      className="btn  my-2 my-sm-0 nav_search-btn"
                      type="submit"
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </form>
                </ul>
              </div>
            </nav>
          </div>
        </header>

        <section className="slider_section">
          <div
            id="customCarousel1"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner flex justify-center">
              <div className="carousel-item active">
                <div className="container ">
                  <div className="row flex" dir="ltr">
                    <div className="carous col-md-6 ">
                      <div className="detail-box">
                        <h1>
                          Crypto <br />
                          Currency
                        </h1>
                        <p>
                          Explicabo esse amet tempora quibusdam laudantium,<br/>
                          laborum eaque magnam fugiat hic? Esse dicta aliquid
                          error repudiandae earum suscipit fugiat molestias,
                          veniam, vel architecto veritatis delectus repellat
                          modi impedit sequi.
                        </p>
                        <div className="btn-box">
                          <Link to="" className="btn1">
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="carous col-md-6">
                      <div className="img-box">
                        <img src={img2} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <ol className="carousel-indicators">
              <li
                data-target="#customCarousel1"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#customCarousel1" data-slide-to="1"></li>
              <li data-target="#customCarousel1" data-slide-to="2"></li>
            </ol> */}
          </div>
        </section>
      </div>

      <section className="service_section layout_padding flex justify-center">
          <div className="container ">
            <div className="heading_container heading_center">
              <h2 className="fonty">
                Our <span>Services</span>
              </h2>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration
              </p>
            </div>
            <div className="row flex">
              <div className="boxy col-md-4 ml-2">
                <div className="box">
                  <div className="img-box">
                    <img src={img3} alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Currency Wallet</h5>
                    <p>
                      fact that a reader will be distracted by the readable
                      content of a page when looking at its layout. The point of
                      using
                    </p>
                    <Link to="">Read More</Link>
                  </div>
                </div>
              </div>
              <div className="boxy col-md-4 ml-2">
                <div className="box ">
                  <div className="img-box">
                    <img src={img4} alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Security Storage</h5>
                    <p>
                      fact that a reader will be distracted by the readable
                      content of a page when looking at its layout. The point of
                      using
                    </p>
                    <Link to="">Read More</Link>
                  </div>
                </div>
              </div>
              <div className="boxy col-md-4 ml-2">
                <div className="box ">
                  <div className="img-box">
                    <img src={img5} alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Expert Support</h5>
                    <p>
                      fact that a reader will be distracted by the readable
                      content of a page when looking at its layout. The point of
                      using
                    </p>
                    <Link to="">Read More</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-box">
              <Link to="">View All</Link>
            </div>
          </div>
       
      </section>

      <section className="about_section layout_padding flex justify-center">
        <div className="container">
          <div className="heading_container heading_center">
            <h2 className="fonty">
              About <span>Us</span>
            </h2>
            <p>
              Magni quod blanditiis non minus sed aut voluptatum illum quisquam
              aspernatur ullam vel beatae rerum ipsum voluptatibus
            </p>
          </div>
          <div className="row flex justify-between" dir="ltr">
            <div className="custom col-md-6">
              <div className="img-box">
                <img src={img6} alt="" />
              </div>
            </div>
            <div className="custom col-md-6">
              <div className="detail-box text-center">
                <h3>We Are Finexo</h3>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority <br/>have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text. All
                </p>
                <p>
                  Molestiae odio earum non qui cumque provident voluptates,
                  repellendus exercitationem, possimus at iste corrupti officiis
                  unde alias eius ducimus reiciendis soluta eveniet. Nobis ullam
                  ab omnis quasi expedita.
                </p>
                <Link to="">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why_section layout_padding flex justify-center">
      <div className="container">
        <div className="heading_container heading_center">
          <h2 className="fonty">
            Why Choose <span>Us</span>
          </h2>
        </div>
        <div className="why_container ">
          <div className="why box">
            <div className="img-box">
              <img src={img7} alt=""/>
            </div>
            <div className="detail-box">
              <h5>
                Expert Management
              </h5>
              <p>
                Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia id, aspernatur nihil.
                Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat veritatis unde reiciendis possimus animi autem natus
              </p>
            </div>
          </div>
          <div className="why box">
            <div className="img-box">
              <img src={img8} alt=""/>
            </div>
            <div className="detail-box">
              <h5>
                Secure Investment
              </h5>
              <p>
                Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia id, aspernatur nihil.
                Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat veritatis unde reiciendis possimus animi autem natus
              </p>
            </div>
          </div>
          <div className="why box">
            <div className="img-box">
              <img src={img9} alt=""/>
            </div>
            <div className="detail-box">
              <h5>
                Instant Trading
              </h5>
              <p>
                Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia id, aspernatur nihil.
                Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat veritatis unde reiciendis possimus animi autem natus
              </p>
            </div>
          </div>
          <div className="why box">
            <div className="img-box">
              <img src={img10} alt=""/>
            </div>
            <div className="detail-box">
              <h5>
                Happy Customers
              </h5>
              <p>
                Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia id, aspernatur nihil.
                Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat veritatis unde reiciendis possimus animi autem natus
              </p>
            </div>
          </div>
        </div>
        <div className="btn-box">
          <Link to="">
            Read More
          </Link>
        </div>
      </div>
      </section>

      <section className="team_section layout_padding flex justify-center">
        <div className="container-fluid">
          <div className="heading_container heading_center">
            <h2 className="fonty">
              Our <span> Team</span>
            </h2>
          </div>
          <div className="team_container">
            <div className="row flex justify-center">
              <div className="team col-lg-3 col-sm-6 me-3">
                <div className="box w-[290px]">
                  <div className="img-box">
                    <img src={img11} className="img1" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Joseph Brown</h5>
                    <p>Marketing Head</p>
                  </div>
                  <div className="info_social flex justify-center">
                    <Link to="" className="ml-2">
                      <FaFacebookF />
                    </Link>
                    <Link to="" className="ml-2">
                      <RiTwitterXFill />
                    </Link>
                    <Link to="" className="ml-2">
                      <SlSocialLinkedin />
                    </Link>
                    <Link to="" className="ml-2">
                      <BsInstagram />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team col-lg-3 col-sm-6 me-3">
                <div className="box w-[290px]">
                  <div className="img-box">
                    <img src={img12} className="img1" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Nancy White</h5>
                    <p>Marketing Head</p>
                  </div>
                  <div className="info_social flex justify-center">
                    <Link to="" className="ml-2">
                      <FaFacebookF />
                    </Link>
                    <Link to="" className="ml-2">
                      <RiTwitterXFill />
                    </Link>
                    <Link to="" className="ml-2">
                      <SlSocialLinkedin />
                    </Link>
                    <Link to="" className="ml-2">
                      <BsInstagram />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="teamcol-lg-3 col-sm-6 me-3">
                <div className="box w-[290px]">
                  <div className="img-box">
                    <img src={img13} className="img1" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Earl Martinez</h5>
                    <p>Marketing Head</p>
                  </div>
                  <div className="info_social flex justify-center">
                    <Link to="" className="ml-2">
                      <FaFacebookF />
                    </Link>
                    <Link to="" className="ml-2">
                      <RiTwitterXFill />
                    </Link>
                    <Link to="" className="ml-2">
                      <SlSocialLinkedin />
                    </Link>
                    <Link to="" className="ml-2">
                      <BsInstagram />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team col-lg-3 col-sm-6 me-3">
                <div className="box w-[290px]">
                  <div className="img-box">
                    <img src={img14} className="img1" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Josephine Allard</h5>
                    <p>Marketing Head</p>
                  </div>
                  <div className="info_social flex justify-center">
                    <Link to="" className="ml-2">
                      <FaFacebookF />
                    </Link>
                    <Link to="" className="ml-2">
                      <RiTwitterXFill />
                    </Link>
                    <Link to="" className="ml-2">
                      <SlSocialLinkedin />
                    </Link>
                    <Link to="" className="ml-2">
                      <BsInstagram />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="client_section layout_padding flex justify-center">
        <div className="container">
          <div className="heading_container heading_center psudo_white_primary mb_45">
            <h2 className="fonty">
              What says our <span>Customers</span>
            </h2>
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
                        <h6>LusDen</h6>
                        <p>magna aliqua. Ut</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis{" "}
                    </p>
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
                        <h6>Zen Court</h6>
                        <p>magna aliqua. Ut</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="box">
                  <div className="img-box">
                    <img src={img15} alt="" className="box-img" />
                  </div>
                  <div className="detail-box">
                    <div className="client_id">
                      <div className="client_info">
                        <h6>LusDen</h6>
                        <p>magna aliqua. Ut</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis{" "}
                    </p>
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
                        <h6>Zen Court</h6>
                        <p>magna aliqua. Ut</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info_section layout_padding2 flex justify-center">
        <div className="container ">
          <div dir="ltr" className="row flex">
            <div className="col-md-6 col-lg-3 info_col">
              <div className="info_contact">
                <h4>Address</h4>
                <div className="contact_link_box">
                  <Link to="" className="flex">
                  <LiaMapMarkerAltSolid />
                    <span>Location</span>
                  </Link>
                  <Link to="" className="text-nowrap flex">
                    <FaPhone className="me-1"/>
                    <span>Call +01 1234567890</span>
                  </Link>
                  <Link to="" className="flex">
                  <FaRegEnvelope className="me-1"/>
                    <span>demo@gmail.com</span>
                  </Link>
                </div>
              </div>
              <div className="info_social">
                <Link to="">
                  <FaFacebookF />
                </Link>
                <Link to="">
                  <RiTwitterXFill />
                </Link>
                <Link to="">
                  <SlSocialLinkedin />
                </Link>
                <Link to="">
                  <BsInstagram />
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 info_col flex text-center mr-4">
              <div className="info_detail">
                <h4>Info</h4>
                <p className="text-balance">
                  necessary, making this the first true generator on the<br/>
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with a handful
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-2 info_col">
              <div className="info_link_box mr-9">
                <h4>Links</h4>
                <div className="info_links">
                  <Link className="active" to="index.html">
                    Home
                  </Link>
                  <Link className="" to="about.html">
                    About
                  </Link>
                  <Link className="" to="service.html">
                    Services
                  </Link>
                  <Link className="" to="why.html">
                    Why Us
                  </Link>
                  <Link className="" to="team.html">
                    Team
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 info_col mr-9">
              <h4>Subscribe</h4>
              <form action="#">
                <input type="text" placeholder="Enter email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="footer_section flex justify-center">
        <div className="container">
          <p>
            &copy; <span id="displayYear"></span> All Rights Reserved By
            <Link to="https://html.design/">Free Html Templates</Link>
          </p>
        </div>
      </section>

      <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>

      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      ></script>

      <script type="text/javascript" src="js/bootstrap.js"></script>

      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
      ></script>

      <script type="text/javascript" src="js/custom.js"></script>

      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh39n5U-4IoWpsVGUHWdqB6puEkhRLdmI&callback=myMap"></script>
    </>
  );
}
