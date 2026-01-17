import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    ChevronRight, 
    Home, 
    PlayCircle, 
    Pencil, 
    ChevronLeft, 
    Calendar, 
    Tag, 
    Info,
    Download,
    FileVideo
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Show({ auth, video }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Video</h2>}
        >
            <Head title={`Video - ${video.title}`} />

            <div className="space-y-6">
                <nav className="flex items-center text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
                    <Link href={route('dashboard.videos.index')} className="flex items-center hover:text-blue-600">
                        <Home className="w-4 h-4 mr-1" /> List Video
                    </Link>                    
                    <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
                    <span className="text-slate-900 font-medium truncate">{video.title}</span>
                </nav>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-3xl font-bold text-slate-900 font-headline">{video.title}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden border-slate-200 shadow-sm">
                            <div className="aspect-video bg-black flex items-center justify-center">
                                <video 
                                    controls 
                                    className="w-full h-full"
                                    poster={video.thumbnail_url} 
                                    controlsList="nodownload" 
                                >
                                    <source src={video.video_url} type="video/mp4" />
                                    Maaf, browser Anda tidak mendukung tag video.
                                </video>
                            </div>
                            
                            <CardContent className="p-8">
                                <div className="flex items-center gap-6 mb-6 text-sm text-slate-500 border-b pb-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                        Diupload pada {formatDate(video.created_at)}
                                    </div>
                                    <div className="flex items-center">
                                        <Tag className="w-4 h-4 mr-2 text-blue-500" />
                                        {video.category?.name || 'Uncategorized'}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <Info className="w-5 h-5 text-blue-600" />
                                        Deskripsi Materi
                                    </h3>
                                    <div className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                                        {video.description || "Tidak ada deskripsi untuk video ini."}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader className="bg-slate-50/50 border-b">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                    <FileVideo className="w-4 h-4" /> Detail File
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-5">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">File Status</label>
                                    <p className="text-sm font-medium text-green-600 flex items-center gap-1 mt-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        Video Aktif & Tersedia
                                    </p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Internal Path</label>
                                    <p className="text-xs font-mono text-slate-600 bg-slate-100 p-2 rounded mt-1 break-all leading-relaxed">
                                        {video.video_path || 'No local path found'}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-slate-100">
                                    <Button variant="outline" className="w-full text-blue-600 border-blue-100 hover:bg-blue-50" asChild>
                                        <a href={video.video_url} download>
                                            <Download className="w-4 h-4 mr-2" /> Download Video
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                            <p className="text-xs text-blue-700 leading-relaxed">
                                <strong>Tips:</strong> Gunakan thumbnail dengan rasio 16:9 untuk hasil terbaik pada pemutar video.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}