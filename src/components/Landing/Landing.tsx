import "./Landing.css";
import { Link } from "react-router-dom";

import img1 from "../../assets/fonts/iranyekan/Images/landingimage/hero-bg.png";
import img2 from "../../assets/fonts/iranyekan/Images/landingimage/slider-img.png";
import img3 from "../../assets/fonts/iranyekan/Images/landingimage/s1.png";
import img4 from "../../assets/fonts/iranyekan/Images/landingimage/s2.png";
import img5 from "../../assets/fonts/iranyekan/Images/landingimage/s3.png";
import img15 from "../../assets/fonts/iranyekan/Images/landingimage/client1.jpg";
import img16 from "../../assets/fonts/iranyekan/Images/landingimage/client2.jpg";
import img17 from "../../assets/fonts/iranyekan/Images/landingimage/انتخاب واحد2.jpg";
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
                        <h1 className="text-center">انتخاب واحد</h1>
                        <p className="text-justify">
                          انتخاب واحد، آسان‌تر از همیشه! به کمک سامانه هوشمند
                          انتخاب واحد، در کمترین زمان و بدون سردرگمی برنامه
                          تحصیلی خود را تنظیم کنید. ابزارها و امکانات پیشرفته ما
                          برای دانشجویان طراحی شده است تا تجربه‌ای سریع، مطمئن و
                          بدون استرس داشته باشند سامانه به طور خودکار اطلاعات
                          مربوط به پیش‌نیازها، دروس ارائه‌شده و زمان‌های خالی را
                          بررسی کرده و بهترین پیشنهادها را به شما ارائه می‌دهد.
                          این یعنی دیگر نیازی به جستجوی دستی و نگرانی درباره
                          انتخاب‌های نادرست ندارید
                        </p>
                        {/* <div className="btn-box items-center">
                          <Link to="" className="btn1">
                            ادامه مطلب
                          </Link>
                        </div> */}
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

      <section className="service_section">
        <div className="container flex flex-col">
          <div className="heading_container heading_center">
            <h2 className="fonty text-center">ویژگی های سامانه انتخاب واحد</h2>
          </div>
          <div className="row flex">
            <div className=" col-md-4 boxy me-3 ">
              <div className="box">
                <div className="img-box">
                  <img src={img3} alt="" />
                </div>
                <div className="detail-box">
                  <h5>پیشنهاد هوشمند دروس</h5>
                  <br />
                  <p className="text-justify">
                    سامانه ما با بررسی دقیق اطلاعات تحصیلی شما، از جمله رشته،
                    مقطع، دروس گذرانده‌شده و پیش‌نیازها، لیستی از واحدهای
                    پیشنهادی را به شما ارائه می‌دهد. این ویژگی به شما کمک می‌کند
                    تا انتخاب‌هایی هوشمندانه و متناسب با نیازهای آموزشی خود
                    داشته باشید
                  </p>
                  {/* <Link to="">Read More</Link> */}
                </div>
              </div>
            </div>
            <div className=" col-md-4 boxy me-3 ">
              <div className="box ">
                <div className="img-box">
                  <img src={img4} alt="" />
                </div>
                <div className="detail-box">
                  <h5>بررسی هم‌پوشانی کلاس‌ها</h5>
                  <br />
                  <p className="text-justify">
                    یکی از دغدغه‌های همیشگی دانشجویان، تداخل زمانی کلاس‌ها است.
                    سامانه هوشمند ما، به‌طور خودکار تمام گزینه‌های انتخابی شما
                    را بررسی کرده و از ایجاد هم‌پوشانی در زمان‌بندی کلاس‌ها
                    جلوگیری می‌کند. این یعنی برنامه‌ای بی‌نقص و هماهنگ، بدون
                    نیاز به تلاش اضافی.
                  </p>
                  {/* <Link to="">Read More</Link> */}
                </div>
              </div>
            </div>
            <div className="col-md-4 boxy me-3">
              <div className="box ">
                <div className="img-box">
                  <img src={img5} alt="" />
                </div>
                <div className="detail-box">
                  <h5>زمان‌بندی دقیق</h5>
                  <br />
                  <p className="text-justify">
                    امکان مشاهده زمان‌های آزاد و خالی در برنامه تحصیلی، یکی از
                    قابلیت‌های کلیدی این سامانه است. شما می‌توانید به راحتی
                    ساعات خالی خود را پیدا کرده و دروس دلخواه را بر اساس این
                    زمان‌بندی به برنامه خود اضافه کنید. این قابلیت به ویژه برای
                    دانشجویان مشغول به کار، بسیار کاربردی است.
                  </p>
                  {/* <Link to="">Read More</Link> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="btn-box mb-3">
            <Link to="" style={{ backgroundColor: "#070606" }}>
              مشاهده همه
            </Link>
          </div> */}
        </div>
      </section>

      <section className="about_section layout_padding flex justify-center">
        <div className="container flex flex-col">
          <div className="heading_container heading_center">
            <h2 className="fonty">درباره ما</h2>
          </div>
          <div className="row flex justify-between" dir="ltr">
            <div className="col-md-6 why ml-4">
              <div className="img-box">
                <img src={img17} alt="" />
              </div>
            </div>
            <div className="col-md-6 why me-5">
              <div className="detail-box text-center">
                <p className="text-right-justify">
                  ما در تیم توسعه سامانه انتخاب واحد هوشمند، با هدف ساده‌تر کردن
                  فرآیند برنامه‌ریزی تحصیلی برای دانشجویان، دست به طراحی و ایجاد
                  سیستمی پیشرفته و کاربرپسند زده‌ایم. دغدغه اصلی ما، ایجاد
                  تجربه‌ای بدون استرس، دقیق و سریع برای تمامی دانشجویان، از ترم
                  اولی‌ها گرفته تا دانشجویان سال‌های پایانی است. با ترکیب دانش
                  فنی، فناوری‌های نوین و آگاهی از نیازهای آموزشی، این سامانه
                  طراحی شده تا به عنوان یک دستیار مطمئن و همراه، فرآیند انتخاب
                  واحد را بهینه کند. ما معتقدیم که انتخاب واحد نباید یک فرآیند
                  زمان‌بر یا پیچیده باشد، بلکه فرصتی برای دانشجویان است تا
                  بتوانند به شکلی منظم و بدون نگرانی، برنامه‌ریزی خود را پیش
                  ببرند ویژگی‌های منحصربه‌فرد این سامانه، از جمله پیشنهاد دروس
                  متناسب با پیش‌نیازها، بررسی تداخل زمانی و اطلاع‌رسانی لحظه‌ای،
                  نتیجه تلاش مداوم ما برای درک بهتر مشکلات دانشجویان و ارائه
                  راه‌حل‌های کاربردی است. ما با تکیه بر بازخورد کاربران و بهبود
                  مستمر، به دنبال آن هستیم که همیشه بهترین خدمات ممکن را ارائه
                  دهیم. هدف ما این است که شما، دانشجوی گرامی، بتوانید بر روی
                  مهم‌ترین اهداف خود تمرکز کنید و انتخاب واحد را به سامانه‌ای
                  هوشمند و دقیق بسپارید
                </p>
                <p className="text-center font-bold">
                  با ما، انتخاب واحد دیگر یک چالش نیست، بلکه گامی ساده و لذت‌بخش
                  به سوی موفقیت تحصیلی است
                </p>
                {/* <Link to="" style={{ backgroundColor: "#070606" }}>
                  ادامه مطلب
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="client_section layout_padding flex justify-center">
        <div className="container flex flex-col">
          <div className="heading_container heading_center psudo_white_primary mb_45">
            <h2 className="fonty">
              نظر دانشجویان درباره سامانه انتخاب واحد ما
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
                        <p>علی حسینی</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>
                      <br />
                      استفاده از سامانه انتخاب واحد، تجربه‌ای عالی و بدون استرس
                      بود. پیشنهادات هوشمند دروس و جلوگیری از تداخل کلاس‌ها به
                      من کمک کرد برنامه‌ام را سریع و دقیق بچینم
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
                        <p>زهرا کمالی</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>
                      <br />
                      قبل از استفاده از این سامانه، همیشه نگران پر شدن ظرفیت
                      کلاس‌ها بودم. اما اطلاع‌رسانی لحظه‌ای این سیستم باعث شد
                      به‌موقع دروس موردنظرم را انتخاب کنم. فوق‌العاده کاربردی!
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
                        <p>محمد عباسی</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>
                      <br />
                      طراحی کاربرپسند این سامانه باعث شد حتی زمانی که در سفر
                      بودم و به لپ‌تاپ دسترسی نداشتم، بتوانم به‌راحتی با موبایلم
                      وارد شوم و انتخاب واحدم را انجام دهم و بسیار کاربردی است
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
                        <p>مهسا رضایی</p>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>
                      سامانه انتخاب واحد جدید، بهترین هدیه‌ای بود که می‌توانستم
                      دریافت کنم. این سامانه با ارائه یک راهکار هوشمند و کارآمد،
                      به من کمک می‌کند تا بدون اتلاف وقت، برنامه درسی‌ام را
                      تنظیم کنم و به اهداف تحصیلی‌ام برسم{" "}
                    </p>
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
              <div className="info_contact">
                <h4 className="text-center">آدرس</h4>
                <div className="contact_link_box">
                  <Link to="" className="flex">
                    <LiaMapMarkerAltSolid />
                    <span>مکان</span>
                  </Link>
                  <Link to="" className="text-nowrap flex">
                    <FaPhone className="me-1" />
                    <span>تماس +01 1234567890</span>
                  </Link>
                  <Link to="" className="flex">
                    <FaRegEnvelope className="me-1" />
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
            <div className="col-md-6 col-lg-3 info_col flex text-center mr-auto pl-4">
              <div className="info_detail">
                <h4>اطلاعات</h4>
                <p className="about-text">
                  سامانه انتخاب واحد هوشمند، ابزاری کاربردی و مدرن است که به شما
                  امکان می‌دهد در کمترین زمان و با بالاترین دقت، برنامه تحصیلی
                  خود را تنظیم کنید. از این سامانه برای مدیریت پیش‌نیازها، بررسی
                  ظرفیت کلاس‌ها و جلوگیری از تداخل زمانی استفاده کنید. ما
                  اینجاییم تا تجربه انتخاب واحد را برای شما آسان کنیم
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-2 info_col pl-4">
              <div className="info_link_box mr-9">
                <h4>Links</h4>
                <div className="info_links">
                  <Link className="" to="/profile">
                    پروفایل
                  </Link>
                  <Link className="" to="/courses">
                    دوره ها
                  </Link>
                  <Link className="" to="/schedule">
                    برنامه کلاس ها
                  </Link>
                  <Link className="" to="/professors">
                    اساتید
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-lg-2 info_col mr-9">
              <h4>مشترک شوید</h4>
              <form action="#">
                <input type="text" placeholder="Enter email" />
                <button type="submit">Subscribe</button>
              </form>
            </div> */}
          </div>
        </div>
      </section>

      <section className="footer_section flex justify-center ">
        <div className="container h-[15px]">
          <p>
            &copy;{" "}
            <span id="displayYear">
              {" "}
              حقوق معنوی این سامانه محفوظ بوده و هرگونه استفاده غیرمجاز از آن
              پیگرد قانونی دارد{" "}
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
