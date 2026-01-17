import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import {Link} from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const { user } = auth;

    const statusLabel = () => {
        if (user.role === 'Admin' || user.role === 'Author') {
            return user.role === 'Admin' ? 'Administrator' : 'Author';
        }
        return user.membership ? `${user.role} ${user.membership.name}`: 'Non-Membership';
    };

    const getBadgeColor = (type) => {
        const colors = {
            admin: 'bg-red-100 text-red-700 border-red-200',
            author: 'bg-purple-100 text-purple-700 border-purple-200',
            membership: 'bg-green-100 text-green-700 border-green-200',
            default: 'bg-gray-100 text-gray-700 border-gray-200'
        };
        return colors[type.toLowerCase()] || colors.default;
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Overview
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl border border-gray-100">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Selamat Datang, {user.name}! 👋
                                    </h1>
                                    <p className="mt-1 text-gray-500">
                                        Selamat belajar kembali di platform kami.
                                    </p>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
{/*                                    
                                    <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getBadgeColor(user.role)}`}>
                                        Role: {user.role}
                                    </span> */}
                                    
                                    {/* Badge Membership - Hanya muncul jika bukan Admin/Author atau jika ingin tetap ditampilkan */}
                                    <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getBadgeColor('membership')}`}>
                                        Status: {statusLabel()}
                                    </span>
                                </div>
                            </div>

                            <hr className="my-6 border-gray-100" />

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {user.role.toLowerCase() === 'admin' || user.role.toLowerCase() === 'author' ? (
                                    <div className="rounded-lg bg-indigo-50 p-6 border border-indigo-100">
                                        <h3 className="text-lg font-semibold text-indigo-900">Panel Manajemen</h3>
                                        <p className="mt-2 text-sm text-indigo-700">
                                            Sebagai **{user.role}**, Anda memiliki akses untuk mengelola konten, melihat statistik kursus, dan memantau aktivitas pengguna.
                                        </p>
                                        <Link 
                                            href={route('dashboard.videos.index')}
                                            className="mt-4 inline-block text-sm font-bold  transition-colors"
                                        >
                                            Buka Control Management &rarr;
                                        </Link>
                                    </div>
                                ) : (
                                    <div className={`rounded-lg p-6 border transition-all ${
                                        user.membership_id 
                                            ? "bg-emerald-50 border-emerald-100" 
                                            : "bg-red-50 border-red-100 shadow-sm"
                                    }`}>
                                        <h3 className={`text-lg font-semibold ${
                                            user.membership_id 
                                                ? "text-emerald-900" 
                                                : "text-red-800 opacity-90" 
                                        }`}>
                                            Status Belajar
                                        </h3>
                                        
                                        <p className={`mt-2 text-sm leading-relaxed ${
                                            user.membership_id 
                                                ? "text-emerald-700" 
                                                : "text-slate-500" 
                                        }`}>
                                            {user.membership_id 
                                                ? "Akses Premium aktif! Kamu bisa melanjutkan kelas yang terakhir kamu buka."
                                                : "Akun Anda saat ini belum memiliki paket membership aktif. Segera tingkatkan akunmu untuk akses materi."
                                            }
                                        </p>
                                        
                                        <Link 
                                            href={user.membership_id ? route('dashboard.videos.index') : route('membership')}
                                            className={`mt-4 inline-flex items-center gap-1 text-sm font-bold transition-all ${
                                                user.membership_id 
                                                    ? "text-emerald-600 hover:text-emerald-800" 
                                                    : "text-red-600 hover:text-red-700"
                                            }`}
                                        >
                                            {user.membership_id ? "Lanjut Belajar" : "Cek Paket Membership"} 
                                            <span className="text-lg">→</span>
                                        </Link>
                                    </div>
                                )}

                                <div className="rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Informasi Akun</h3>
                                    <div className="mt-3 space-y-2 text-sm text-gray-600">
                                        <div className="flex justify-between">
                                            <span>Email</span>
                                            <span className="font-medium">{user.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Member Sejak</span>
                                            <span className="font-medium">{new Date(user.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}