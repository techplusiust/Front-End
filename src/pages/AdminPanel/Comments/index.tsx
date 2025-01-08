import React, { useState } from "react";
import "./Comments.css";
import { useTranslation } from "react-i18next";

interface Comment {
  id: number;
  text: string;
  rating: number | null;
}


const initialComments: Comment[] = [
    { id: 1, text: "بسیار خوب و کاربردی بود!", rating: null },
    { id: 2, text: "مطالب نیاز به بهبود بیشتری دارد.", rating: null },
    { id: 3, text: "سایت بسیار کاربرپسند است.", rating: null },
    { id: 4, text: "زمان بارگذاری صفحات طولانی بود.", rating: null },
    { id: 5, text: "پشتیبانی بسیار سریع و عالی بود.", rating: null },
    { id: 6, text: "کیفیت محتوا بسیار خوب است.", rating: null },
    { id: 7, text: "استفاده از وب‌سایت آسان و سریع بود.", rating: null },
    { id: 8, text: "دسترسی به مطالب کمی دشوار بود.", rating: null },
    { id: 9, text: "رابط کاربری بهبود نیاز دارد.", rating: null },
    { id: 10, text: "پاسخگویی تیم پشتیبانی بسیار عالی بود.", rating: null },
    { id: 11, text: "تجربه کاربری بسیار خوبی داشتم.", rating: null },
    { id: 12, text: "برخی از مطالب به‌روزرسانی نیاز دارد.", rating: null },
    { id: 13, text: "زمان بارگذاری سایت قابل قبول است.", rating: null },
    { id: 14, text: "نظرات کاربران بسیار مفید بود.", rating: null },
    { id: 15, text: "کیفیت مطالب نسبت به قبل بهتر شده است.", rating: null },
    { id: 16, text: "برخی از لینک‌ها کار نمی‌کنند.", rating: null },
    { id: 17, text: "اطلاعات ارائه شده دقیق و کاربردی است.", rating: null },
    { id: 18, text: "طراحی گرافیکی سایت چشم‌نواز است.", rating: null },
    { id: 19, text: "مطالب ارائه شده جامع و کامل است.", rating: null },
    { id: 20, text: "سرعت پاسخ‌دهی به درخواست‌ها بالاست.", rating: null },
    { id: 21, text: "برخی از قسمت‌ها باگ دارند.", rating: null },
    { id: 22, text: "محتوای سایت به‌خوبی دسته‌بندی شده است.", rating: null },
    { id: 23, text: "لینک‌های دانلود به‌خوبی عمل می‌کنند.", rating: null },
    { id: 24, text: "وب‌سایت نیاز به طراحی مجدد دارد.", rating: null },
    { id: 25, text: "تیم پشتیبانی بسیار حرفه‌ای است.", rating: null },
    { id: 26, text: "نقشه سایت واضح و قابل درک است.", rating: null },
    { id: 27, text: "زمان آپلود فایل‌ها کمی طولانی بود.", rating: null },
    { id: 28, text: "سایت برای موبایل بهینه‌سازی خوبی دارد.", rating: null },
    { id: 29, text: "امکان جستجوی پیشرفته بسیار مفید بود.", rating: null },
    { id: 30, text: "تنظیمات حساب کاربری آسان و سریع است.", rating: null },
  ];

  const Comments: React.FC = () => {
    const { t } = useTranslation();
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [searchTerm, setSearchTerm] = useState<string>("");
  
    const filteredComments = comments.filter((comment) =>
      comment.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleRating = (id: number, rating: number) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, rating } : comment
        )
      );
    };
  
    return (
      <div className="comments">
        <h1 className="comments-title">{t("comments.title")}</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("comments.search_placeholder")}
          className="comments-search"
        />
        <div className="comment-cards">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <p className="comment-text">{comment.text}</p>
                <div className="comment-rating">
                  <strong>{t("comments.rating_label")}:</strong>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      className={`rating-button ${
                        comment.rating === score ? "selected" : ""
                      }`}
                      onClick={() => handleRating(comment.id, score)}
                    >
                      {score}
                    </button>
                  ))}
                </div>
                {comment.rating && (
                  <p className="rating-result">
                    {t("comments.your_rating")}: {comment.rating}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="no-results">{t("comments.no_results")}</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Comments;
  