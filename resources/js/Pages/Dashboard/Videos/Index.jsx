import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Plus, Clock, Video, Pencil, Trash2, PlayCircle } from "lucide-react";
import { useEffect } from "react";
import Swal from 'sweetalert2'; 

export default function Index({ auth, videos }) {
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard - Video</h2>}
        >
            <Head title="List Video" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold font-headline text-slate-900">List Video</h1>
                        <p className="text-muted-foreground mt-1">
                            {auth.user.role === 'Admin' 
                                ? 'Kelola semua konten video Anda.' 
                                : `Akses video eksklusif untuk member ${auth.user.membership?.type || 'Bronze'}.`}
                        </p>    
                    </div>
                    {auth.user.role === 'Admin' || auth.user.role === 'Author' && (
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                            <Link href="/dashboard/videos/create">
                                <Plus className="mr-2 h-4 w-4" /> Tambah Video
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.data && videos.data.length > 0 ? (
                        videos.data.map((vid) => (
                            <Card key={vid.id} className="group overflow-hidden border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col bg-white">
                                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                                    <img
                                        src={vid.media  ? vid.media.find(m => m.collection_name === 'video_thumbnail')?.original_url
                                            : "https://placehold.co/600x400/2e1065/ffffff?text=Video+Thumbnail"}
                                        alt={vid.title}
                                        className="h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                                    </div>
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                            {vid.category?.name || 'Video'}
                                        </span>
                                    </div>
                                </div>

                                <CardHeader className="p-4 pb-2">
                                    <h3 className="font-bold text-lg leading-tight text-slate-900 line-clamp-2">
                                        {vid.title}
                                    </h3>
                                    <div className="flex items-center text-xs text-slate-400 mt-2">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {new Date(vid.created_at).toLocaleDateString('id-ID')}
                                    </div>
                                </CardHeader>

                                <CardContent className="p-4 pt-0 flex-grow">
                                    <p className="text-sm text-slate-600">
                                        {truncateText(vid.description, 20)}
                                    </p>
                                </CardContent>

                                <CardFooter className="p-4 pt-4 mt-auto border-t bg-slate-50/50">
                                    <div className="flex items-center justify-between w-full">
                                        <Button variant="link" size="sm" asChild className="text-blue-600 hover:text-blue-800 p-0 h-auto font-bold">
                                            <Link href={`/dashboard/videos/${vid.id}/show`}>
                                                Tonton Sekarang
                                            </Link>
                                        </Button>
                                        
                                        {auth.user.role === 'Admin' || auth.user.role === 'Author' && (
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                                    <Link href={`/dashboard/videos/${vid.id}/edit`}>
                                                        <Pencil className="h-8 w-8 hover:bg-blue-50 text-blue-500 border-slate-200" />
                                                    </Link>
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    className="h-8 w-8 hover:bg-red-50 text-red-500 border-slate-200"
                                                    asChild
                                                >
                                                    <Link 
                                                        href={`/dashboard/videos/${vid.id}`} 
                                                        method="delete" 
                                                        as="button"
                                                        onBefore={() => confirm('Hapus video ini?')}
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
                            <Video className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                            <h2 className="text-xl font-semibold text-slate-900">Video tidak ditemukan</h2>
                            {auth.user.role === 'Admin' || auth.user.role === 'Author' ? (
                                <p className="text-slate-500">Upload dan Kelola Video.</p>
                            ) : (
                                <p className="text-slate-500">Upgrade paket Anda untuk membuka akses video premium.</p>
                            )}
                        </div>
                    )}
                </div>

                {videos.data && videos.data.length > 0 && (
                    <div className="mt-12 flex justify-center gap-2">
                        {videos.links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                        link.active 
                                            ? 'bg-blue-600 text-white shadow-md' // Berubah jadi Biru
                                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600' // Hover juga ke biru muda
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