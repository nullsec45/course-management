import HomeLayout from "@/Layouts/HomeLayout";
import { Link } from '@inertiajs/react';

import { 
  Play, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle, 
  Star,
  ArrowRight,
  Zap
} from 'lucide-react';

export default function Index({ courses, articles, videos, popularCourses }) {
  return (
    <HomeLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-4 inline-block">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md">
                ✨ Mulai Perjalanan Trading Anda Hari Ini
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Kuasai Seni Trading dengan <span className="text-yellow-300">Kursus Terbaik</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed">
              Belajar dari praktisi trading berpengalaman. Tingkatkan skill Anda dengan kurikulum yang dirancang khusus untuk pemula hingga advanced trader.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/login" className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105">
                Mulai Belajar Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#courses" className="inline-flex items-center justify-center bg-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all backdrop-blur-md border border-white/30">
                Lihat Kursus
                <Play className="ml-2 h-5 w-5" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
                <div className="text-blue-50 text-sm md:text-base">Peserta Aktif</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
                <div className="text-blue-50 text-sm md:text-base">Kursus Tersedia</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">4.9★</div>
                <div className="text-blue-50 text-sm md:text-base">Rating Rata-rata</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mengapa Memilih Kami?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Kami menyediakan platform pembelajaran trading yang komprehensif dengan instruktur berpengalaman dan materi berkualitas tinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Strategi Terbukti</h3>
              <p className="text-slate-600">Pelajari strategi trading yang telah terbukti efektif dari trader profesional dengan track record cemerlang.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Materi Lengkap</h3>
              <p className="text-slate-600">Akses materi pembelajaran yang terstruktur dengan baik, dari fundamental hingga advanced trading techniques.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Komunitas Suportif</h3>
              <p className="text-slate-600">Bergabunglah dengan komunitas trader yang saling mendukung dan berbagi pengalaman serta insights pasar.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sertifikasi</h3>
              <p className="text-slate-600">Dapatkan sertifikat yang diakui setelah menyelesaikan kursus untuk meningkatkan kredibilitas Anda.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-xl border border-cyan-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-cyan-600 rounded-lg flex items-center justify-center mb-6">
                <Play className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Video On-Demand</h3>
              <p className="text-slate-600">Tonton video pembelajaran berkualitas HD kapan saja dan dimana saja sesuai dengan jadwal Anda.</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Live Trading Sessions</h3>
              <p className="text-slate-600">Ikuti sesi trading langsung dengan mentor untuk melihat real-time decision making dan analisis pasar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section id="courses" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Kursus Populer</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Pilih dari berbagai kursus yang dirancang untuk meningkatkan kemampuan trading Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Course Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <TrendingUp className="h-20 w-20 text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Beginner</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Fondasi Trading Forex</h3>
                <p className="text-slate-600 text-sm mb-4">Pelajari dasar-dasar trading forex dari nol hingga bisa melakukan trading sendiri dengan percaya diri.</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-slate-600 ml-2">(128)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">Rp 299K</div>
                    <div className="text-sm text-slate-500 line-through">Rp 599K</div>
                  </div>
                  <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                    Daftar
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow relative">
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">TRENDING</div>
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <TrendingUp className="h-20 w-20 text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">Intermediate</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Analisis Teknikal Pro</h3>
                <p className="text-slate-600 text-sm mb-4">Kuasai teknik analisis teknikal advanced untuk memprediksi pergerakan harga dengan akurasi tinggi.</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-slate-600 ml-2">(256)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">Rp 499K</div>
                    <div className="text-sm text-slate-500 line-through">Rp 899K</div>
                  </div>
                  <Link href="/login" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold">
                    Daftar
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <TrendingUp className="h-20 w-20 text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Advanced</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Manajemen Portfolio & Risk</h3>
                <p className="text-slate-600 text-sm mb-4">Belajar cara mengelola portofolio trading dan risk management untuk melindungi modal Anda.</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-slate-300" />
                    <span className="text-sm text-slate-600 ml-2">(89)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">Rp 699K</div>
                    <div className="text-sm text-slate-500 line-through">Rp 1.2M</div>
                  </div>
                  <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">
                    Daftar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/courses" className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
              Lihat Semua Kursus
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Apa Kata Peserta Kami?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ribuan trader telah meningkatkan skill mereka melalui platform kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "Kursus ini benar-benar mengubah cara saya trading. Dari rugi terus-menerus, sekarang saya bisa konsisten profit setiap bulannya. Terima kasih!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  AR
                </div>
                <div>
                  <div className="font-bold text-slate-900">Ahmad Rafiq</div>
                  <div className="text-sm text-slate-600">Trader Profesional</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "Mentor-mentornya sangat responsif dan materi yang diberikan sangat praktis. Saya langsung bisa menerapkan apa yang dipelajari di market."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  SS
                </div>
                <div>
                  <div className="font-bold text-slate-900">Siti Salsabila</div>
                  <div className="text-sm text-slate-600">Content Creator</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "Platform ini adalah investasi terbaik yang pernah saya buat. Komunitas yang supportif dan akses ke live trading sessions sangat membantu."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  BH
                </div>
                <div>
                  <div className="font-bold text-slate-900">Budi Hermawan</div>
                  <div className="text-sm text-slate-600">Business Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Siap Mengubah Karir Trading Anda?
            </h2>
            <p className="text-lg text-blue-50 mb-8">
              Bergabunglah dengan ribuan trader sukses yang telah mengambil langkah pertama mereka. Diskon 50% untuk pendaftar baru bulan ini!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105">
                Daftar Sekarang
                <CheckCircle className="ml-2 h-5 w-5" />
              </Link>
              <a href="mailto:info@coursetrading.com" className="inline-flex items-center justify-center bg-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all backdrop-blur-md border border-white/30">
                Hubungi Support
              </a>
            </div>

            <p className="text-blue-100 text-sm mt-8">
              ✓ Akses seumur hidup  ✓ Garansi uang kembali 30 hari  ✓ Support 24/7
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pertanyaan Umum</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Temukan jawaban atas pertanyaan yang sering ditanyakan tentang platform kami.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {/* FAQ Item 1 */}
            <details className="group bg-slate-50 rounded-lg p-6 border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
              <summary className="flex items-center justify-between font-semibold text-slate-900 group-open:text-blue-600">
                <span>Apakah saya perlu pengalaman trading sebelumnya?</span>
                <span className="transition group-open:rotate-180">➔</span>
              </summary>
              <p className="text-slate-600 mt-4">
                Tidak! Kursus kami dirancang untuk pemula. Kami mulai dari dasar-dasar trading dan secara bertahap meningkatkan tingkat kesulitan. Jika Anda sudah berpengalaman, kursus level advanced juga tersedia.
              </p>
            </details>

            {/* FAQ Item 2 */}
            <details className="group bg-slate-50 rounded-lg p-6 border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
              <summary className="flex items-center justify-between font-semibold text-slate-900 group-open:text-blue-600">
                <span>Berapa lama waktu yang dibutuhkan untuk menyelesaikan kursus?</span>
                <span className="transition group-open:rotate-180">➔</span>
              </summary>
              <p className="text-slate-600 mt-4">
                Tergantung level kursus. Kursus beginner membutuhkan sekitar 4-6 minggu, intermediate 6-8 minggu, dan advanced 8-12 minggu. Namun, Anda bisa belajar sesuai ritme Anda sendiri.
              </p>
            </details>

            {/* FAQ Item 3 */}
            <details className="group bg-slate-50 rounded-lg p-6 border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
              <summary className="flex items-center justify-between font-semibold text-slate-900 group-open:text-blue-600">
                <span>Apakah ada jaminan uang kembali?</span>
                <span className="transition group-open:rotate-180">➔</span>
              </summary>
              <p className="text-slate-600 mt-4">
                Ya! Kami menawarkan garansi uang kembali 100% selama 30 hari jika Anda tidak puas dengan kursus kami, tanpa pertanyaan yang diajukan.
              </p>
            </details>

            {/* FAQ Item 4 */}
            <details className="group bg-slate-50 rounded-lg p-6 border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
              <summary className="flex items-center justify-between font-semibold text-slate-900 group-open:text-blue-600">
                <span>Bagaimana dengan live trading sessions?</span>
                <span className="transition group-open:rotate-180">➔</span>
              </summary>
              <p className="text-slate-600 mt-4">
                Live trading sessions diadakan setiap hari Jumat pukul 19:00 WIB. Anda dapat bertanya langsung kepada mentor dan melihat bagaimana mereka melakukan trading secara real-time.
              </p>
            </details>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}
