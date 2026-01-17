import HomeLayout from "@/Layouts/HomeLayout";
import { Head, usePage, useForm } from '@inertiajs/react';
import { ShieldCheck, CreditCard, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Checkout({ membership }) {
    const { auth } = usePage().props;

    const { data, post, processing } = useForm({
        membership_id: membership.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('membership.process'));
    };

    return (
        <HomeLayout>
            <Head title={`Konfirmasi - ${membership.name}`} />
            
            <div className="py-16 bg-slate-50 min-h-[80vh]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <button 
                        onClick={() => window.history.back()} 
                        className="flex items-center text-slate-500 hover:text-slate-800 mb-8 transition-colors"
                        disabled={processing}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <CreditCard className="text-blue-600 w-5 h-5" /> Konfirmasi Pesanan
                                </h2>
                                
                                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-100 mb-6">
                                    <div>
                                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Paket Terpilih</p>
                                        <h3 className="text-2xl font-bold text-slate-900">{membership.name}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-blue-700">
                                            Rp {new Intl.NumberFormat('id-ID').format(membership.price)}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-slate-800 text-sm">Benefit Paket:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> {membership.video_limit} Video Tutorial
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> {membership.article_limit} Artikel Pro
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex gap-3 text-sm text-emerald-700 italic">
                                <ShieldCheck className="flex-shrink-0 w-5 h-5" />
                                Akses membership akan langsung aktif setelah Anda menekan tombol konfirmasi.
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-fit">
                            <h3 className="font-bold text-slate-900 mb-4">Ringkasan Akun</h3>
                            <div className="space-y-4 mb-8">
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Nama</p>
                                    <p className="text-sm text-slate-700 font-medium">{auth.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Email</p>
                                    <p className="text-sm text-slate-700 font-medium truncate">{auth.user.email}</p>
                                </div>
                            </div>

                            <form onSubmit={submit}>
                                <Button 
                                    type="submit"
                                    className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-lg font-bold"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        'Konfirmasi Sekarang'
                                    )}
                                </Button>
                            </form>
                            
                            <p className="mt-4 text-[10px] text-center text-slate-400">
                                Dengan mengklik tombol, Anda menyetujui syarat dan ketentuan layanan kami.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}