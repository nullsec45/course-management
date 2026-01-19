<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

<p align="center">
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Laravel Version"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Course Management System

Course Management System adalah aplikasi berbasis web yang digunakan untuk mengelola kursus, materi pembelajaran, serta autentikasi pengguna menggunakan OAuth (Google & Facebook). Aplikasi ini dibangun dengan **Laravel + Inertia + React** untuk memberikan pengalaman Single Page Application (SPA) yang modern, cepat, dan scalable.

---

## 🚀 Fitur Utama

* Manajemen Course (CRUD)
* Manajemen User & Autentikasi
* Login dengan Google & Facebook (Social Login)
* SPA menggunakan Inertia.js + React
* UI modern menggunakan TailwindCSS & Shadcn UI
* SweetAlert2 untuk notifikasi interaktif

---

## 🛠️ Tech Stack

### Backend

* **Bahasa Pemrograman**: PHP 8+
* **Framework**: Laravel 12+
* **Library**:

  * Inertia Laravel v2+
  * Laravel Socialite v5+

### Frontend

* **Framework**: ReactJS 19+
* **Library**:

  * InertiaJS v2+
  * Axios v1.11.0
  * SweetAlert2 v11+
  * Shadcn UI

### Styling

* **CSS Framework**: TailwindCSS v4+

### Database

* **Database**: MySQL

---

## ⚙️ Instalasi & Setup Aplikasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd course-management
```

### 2. Install Dependency Backend

```bash
composer install
```

### 3. Install Dependency Frontend

```bash
npm install
```

### 4. Konfigurasi Environment

Salin file `.env.example` menjadi `.env`

```bash
cp .env.example .env
```

#### Konfigurasi Database

Sesuaikan konfigurasi database pada file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=course_management
DB_USERNAME=<DB_USERNAME>
DB_PASSWORD=<DB_PASSWORD>
```

Pastikan database **course_management** sudah dibuat di MySQL.

#### Konfigurasi OAuth (Google & Facebook)

Digunakan untuk login menggunakan Google dan Facebook.

**Facebook OAuth**

```env
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
FACEBOOK_CLIENT_REDIRECT=http://localhost:8000/auth/facebook/callback
```

**Google OAuth**

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CLIENT_REDIRECT=http://localhost:8000/auth/google/callback
```

> Pastikan URL redirect sesuai dengan yang terdaftar di Google Console & Facebook Developer Dashboard.

---

### 5. Generate Application Key

```bash
php artisan key:generate
```

### 6. Migrasi & Seeder Database

```bash
php artisan migrate --seed
```

### 7. Menjalankan Aplikasi

#### Jalankan Backend (Laravel)

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

#### Jalankan Frontend (Vite)

```bash
npm run dev
```

Aplikasi dapat diakses melalui:

```
http://localhost:8000
```

---

## 📁 Environment Default (Contoh)

```env
APP_NAME=Laravel
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=course_management
DB_USERNAME=<DB_USERNAME>
DB_PASSWORD=<DB_PASSWORD>

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

---

## 📚 Dokumentasi Tambahan

* Laravel Documentation: [https://laravel.com/docs](https://laravel.com/docs)
* InertiaJS: [https://inertiajs.com](https://inertiajs.com)
* ReactJS: [https://react.dev](https://react.dev)
* TailwindCSS: [https://tailwindcss.com](https://tailwindcss.com)

---

## 🤝 Kontribusi

Kontribusi sangat terbuka. Silakan buat pull request atau issue untuk perbaikan dan pengembangan fitur.

---

## 📄 Lisensi

Aplikasi ini menggunakan lisensi **MIT**.

---

Dibuat dengan ❤️ menggunakan Laravel & React
