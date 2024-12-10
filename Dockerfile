# مرحله اول: Build پروژه
FROM node:18.20.1 AS build

# تنظیم دایرکتوری کاری
WORKDIR /usr/local/app

# کپی فایل‌های موردنیاز برای نصب و بیلد
COPY package.json package-lock.json ./
RUN npm install

# کپی باقی فایل‌های پروژه
COPY . .

# ساخت پروژه React
RUN npm run build

# مرحله دوم: سرو کردن اپلیکیشن با Nginx
FROM nginx:latest

# کپی خروجی Build به Nginx
COPY --from=build /usr/local/app/build /usr/share/nginx/html

# باز کردن پورت
EXPOSE 80

# اجرای Nginx
CMD ["nginx", "-g", "daemon off;"]

