import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
    ChevronRight, 
    Home, 
    Calendar, 
    User, 
    Tag, 
    Pencil, 
    ChevronLeft,
    Clock
} from "lucide-react";

export default function Show({ auth, article }) {
    console.log(article);
    // Fungsi untuk format tanggal
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Artikel</h2>}
        >
            <Head title={`Detail - ${article.title}`} />

            <div className="space-y-6">
                <nav className="flex items-center text-sm text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href={route('dashboard.articles.index')} className="flex items-center hover:text-blue-600">
                        <Home className="w-4 h-4 mr-1" /> List Artikel
                    </Link>                   
                    <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
                    <span className="text-slate-900 font-medium truncate">{article.title}</span>
                </nav>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 font-headline">{article.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-1.5 text-blue-500" />
                                {article.author.name || 'Admin'}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1.5 text-blue-500" />
                                {formatDate(article.created_at)}
                            </div>
                            <div className="flex items-center">
                                <Tag className="w-4 h-4 mr-1.5 text-blue-500" />
                                {article.category?.name || 'Tanpa Kategori'}
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                article.status === 'published' 
                                    ? 'bg-green-100 text-green-700' 
                                    : article.status === 'Draft'
                                    ? 'bg-slate-100 text-slate-700'
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {article.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="shadow-sm border-slate-200">
                            {article.thumbnail_url && (
                                <div className="w-full aspect-video overflow-hidden rounded-t-lg">
                                    <img 
                                        src={article.thumbnail_url} 
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <CardContent className="p-8">
                                <div className="prose prose-slate max-w-none prose-headings:font-headline prose-headings:text-slate-900 prose-p:leading-relaxed prose-p:text-slate-700">
                                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card className="shadow-sm border-slate-200">
                            <CardHeader className="border-b bg-slate-50/50 p-4">
                                <h3 className="font-bold text-slate-900 flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                                    Informasi Metadata
                                </h3>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Slug URL</label>
                                    <p className="text-sm text-slate-600 font-mono bg-slate-50 p-2 rounded mt-1 break-all">
                                        /{article.slug}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Deskripsi Singkat (SEO)</label>
                                    <p className="text-sm text-slate-600 mt-1 italic">
                                        {article.description || 'Tidak ada deskripsi SEO.'}
                                    </p>
                                </div>
                                <div className="pt-2 border-t">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Terakhir Diperbarui</label>
                                    <p className="text-sm text-slate-600 mt-1">
                                        {formatDate(article.updated_at)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}