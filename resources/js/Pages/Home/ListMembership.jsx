import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link, usePage } from '@inertiajs/react';
import { Check, Zap, Crown, Rocket, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ListMembership({ memberships }) {
    const { auth } = usePage().props;
    
    const getPlanStyle = (name) => {
        const t = (name).toLowerCase(); 

        if (t.includes('Gold') || t.includes('Platinum')) {
            return {
                icon: <Rocket className="w-12 h-12 text-purple-600" />,
                border: 'border-purple-500 shadow-purple-100',
                badge: 'bg-purple-600',
                button: 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'
            };
        }

        return {
            icon: <Zap className="w-12 h-12 text-blue-600" />,
            border: 'border-blue-200 shadow-blue-50',
            badge: 'bg-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
        };
    };

    return (
        <HomeLayout>
            <Head title="Pilih Paket Membership" />
            
            <section className="py-20 bg-slate-50 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">
                            Pilih Paket <span className="text-blue-600">Membership</span> Anda
                        </h1>
                        <p className="text-lg text-slate-600">
                            Akses strategi trading eksklusif, video tutorial premium, dan artikel mendalam untuk mempercepat profitabilitas Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {memberships.map((plan) => {
                            const style = getPlanStyle(plan.name);
                            return (
                                <div 
                                    key={plan.id} 
                                    className={`relative bg-white rounded-2xl border-2 p-8 transition-all hover:scale-105 hover:shadow-2xl ${style.border}`}
                                >
                                    {/* Badge untuk tipe populer */}
                                    {plan.name.toLowerCase().includes('Gold') && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                                            PALING POPULER
                                        </div>
                                    )}

                                    <div className="mb-6">{style.icon}</div>
                                    
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                    
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-4xl font-extrabold text-slate-900">
                                            Rp {new Intl.NumberFormat('id-ID').format(plan.price)}
                                        </span>
                                        <span className="text-slate-500">/selamanya</span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                            <span className="text-slate-600 font-medium">Akses {plan.video_limit} Video Tutorial</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                            <span className="text-slate-600 font-medium">{plan.article_limit} Artikel Eksklusif</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                            <span className="text-slate-600 font-medium">Update Market Setiap Hari</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                            <span className="text-slate-600 font-medium">Komunitas Diskusi</span>
                                        </div>
                                    </div>

                                    <Link 
                                        href={auth.user ? route('membership.checkout', plan.id) : route('login')}
                                        className={`w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-shadow shadow-lg ${style.button}`}
                                    >
                                        {auth.user ? `Pilih Paket ${plan.name}` : 'Login untuk Membeli'}
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Trust Factor Section */}
                    <div className="mt-20 flex flex-wrap justify-center gap-8 text-slate-400">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-green-500" />
                            <span className="font-semibold italic">Pembayaran Aman & Terenkripsi</span>
                        </div>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}