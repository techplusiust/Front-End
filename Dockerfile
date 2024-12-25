# مرحله اول: Build پروژه
FROM node:18-alpine AS build

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
FROM nginx:1.23.4-alpine

# کپی خروجی Build به Nginx
COPY --from=build /usr/local/app/dist /usr/share/nginx/html


# باز کردن پورت
EXPOSE 80

# اجرای Nginx
CMD ["nginx", "-g", "daemon off;"]

