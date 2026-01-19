import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Plus, Clock, FileText, Pencil, Trash2 } from "lucide-react";
import Swal from 'sweetalert2'; 
import { useEffect } from "react";

export default function Index({ auth, articles }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: flash.success,
                timer: 3000,
                showConfirmButton: false
            });
        }
        if (flash.error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: flash.error,
                timer: 3000,
                showConfirmButton: false
            });
        }
    }, [flash]);

    const truncateText = (text, length) => {
        if (!text) return "";
        return text.length > length ? text.substring(0, length) + "...." : text;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard - Artikel</h2>}
        >
            <Head title="List Artikel" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold font-headline text-slate-900">List Artikel</h1>
                        <p className="text-muted-foreground mt-1">
                            {auth.user.role === 'Admin' 
                                ? 'Kelola semua konten artikel di sini.' 
                                : `Menampilkan artikel pilihan untuk paket ${auth.user.membership?.type || 'Anda'}.`}
                        </p>
                    </div>
                    {auth.user.role === 'Admin' || auth.user.role === 'Author' && (
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                            <Link href="/dashboard/articles/create">
                                <Plus className="mr-2 h-4 w-4" /> Tambah Artikel
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.data && articles.data.length > 0 ? (
                        articles.data.map((article) => (
                            <Card key={article.id} className="group overflow-hidden border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col bg-white">
                                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                    <img
                                        src={article.media?.[0]?.file_name 
                                            ? `/storage/uploads/articles/${article.media[0].file_name}` 
                                            : "https://placehold.co/600x400?text=No+Image"}
                                        alt={article.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-blue-600 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                                            {article.category?.name || 'Uncategorized'}
                                        </span>
                                    </div>
                                </div>

                                <CardHeader className="p-4 pb-2">
                                    <h3 className="font-bold text-lg leading-tight text-slate-900 line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center text-xs text-slate-400 gap-3 mt-2">
                                        <div className="flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {new Date(article.created_at).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-4 pt-0 flex-grow">
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {truncateText(article.content, 20)}
                                    </p>
                                </CardContent>

                                <CardFooter className="p-4 pt-4 mt-auto border-t bg-slate-50/50">
                                    <div className="flex items-center justify-between w-full">
                                        <Button variant="link" size="sm" asChild className="text-blue-600 hover:text-blue-800 p-0 h-auto font-bold">
                                            <Link href={`/dashboard/articles/${article.id}/show`}>
                                                Baca Selengkapnya
                                            </Link>
                                        </Button>
                                        
                                        {auth.user.role === 'Admin' || auth.user.role === 'Author' && (
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8 border-slate-200 hover:bg-slate-100" asChild title="Edit">
                                                    <Link href={`/dashboard/articles/${article.id}/edit`}>
                                                        <Pencil className="h-8 w-8 hover:bg-blue-50 text-blue-500 border-slate-200" />
                                                    </Link>
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    className="h-8 w-8 hover:bg-red-50 text-red-500 border-slate-200"
                                                    asChild
                                                    title="Hapus"
                                                >
                                                    <Link 
                                                        href={`/dashboard/articles/${article.id}`} 
                                                        method="delete" 
                                                        as="button"
                                                        onBefore={() => confirm('Hapus artikel ini secara permanen?')}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white border border-dashed rounded-xl border-slate-200">
                            <FileText className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                            <h2 className="text-xl font-semibold text-slate-900">Tidak ada artikel</h2>
                            {auth.user.role === 'Admin' || auth.user.role === 'Author' ? (
                                <p className="text-slate-500">Upload dan Kelola Video.</p>
                            ) : (
                                <p className="text-slate-500">Upgrade paket Anda untuk membuka akses video premium.</p>
                            )}
                        </div>
                    )}
                </div>

                {articles.data && articles.data.length > 0 && (
                    <div className="mt-12 flex justify-center gap-2">
                        {articles.links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                        link.active 
                                            ? 'bg-blue-600 text-white shadow-md' 
                                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600'
                                    }`}
                                    dangerouslySetInnerHTML={{ 
                                        __html: link.label
                                            .replace('&laquo; Previous', 'Sebelumnya')
                                            .replace('Next &raquo;', 'Selanjutnya') 
                                    }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="px-4 py-2 text-sm font-medium rounded-md opacity-50 border border-slate-100 text-slate-300 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{ 
                                        __html: link.label
                                            .replace('&laquo; Previous', 'Sebelumnya')
                                            .replace('Next &raquo;', 'Selanjutnya') 
                                    }}
                                />
                            )
                        ))}
                    </div>
                )}
                
            </div>
        </AuthenticatedLayout>
    );
}