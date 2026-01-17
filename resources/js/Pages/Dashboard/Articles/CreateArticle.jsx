import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from '@inertiajs/react'; 
import { AlertCircleIcon, Loader2, Save, FilePlus, CircleXIcon, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import InputError from "@/Components/InputError"; 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

export default function CreateArticle({ auth, categories }) {
    const [previewUrl, setPreviewUrl] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        category_id: '',
        content: '',
        thumbnail: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('thumbnail', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const clearImage = () => {
        setData('thumbnail', null);
        setPreviewUrl(null);
        document.getElementById('thumbnail').value = "";
    };

    function onSubmit(e) {
        e.preventDefault();
        post(route('dashboard.articles.store'), {
            forceFormData: true,
        });
    }

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2">
                        <FilePlus className="text-blue-600 h-8 w-8" />
                        Tulis Artikel Baru
                    </CardTitle>
                    <CardDescription>Bagikan pengetahuan Anda melalui artikel tutorial atau berita terbaru.</CardDescription>
                </CardHeader>
                <CardContent>
                    {errors.error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircleIcon className="h-4 w-4" />
                            <AlertTitle>Gagal Menyimpan</AlertTitle>
                            <AlertDescription>{errors.error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Judul Artikel</Label>
                                <Input 
                                    id="title"
                                    placeholder="Masukkan judul artikel yang menarik"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="space-y-2">
                                <Label>Kategori Artikel</Label>
                                <Select onValueChange={(val) => setData('category_id', val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category_id} />
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select 
                                    onValueChange={(val) => setData('status', val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi Singkat</Label>
                               <Textarea 
                                    id="description"
                                    placeholder="Tuliskan ringkasan artikel di sini (maks. 255 karakter)..." 
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Isi Artikel</Label>
                            <Textarea 
                                id="content"
                                placeholder="Tuliskan isi artikel Anda di sini..." 
                                rows={12}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                            />
                            <InputError message={errors.content} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="thumbnail">Gambar Sampul (Thumbnail)</Label>
                            <Input 
                                id="thumbnail"
                                type="file" 
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <InputError message={errors.thumbnail} />

                            {previewUrl && (
                                <div className="flex justify-center mt-4"> 
                                    <div className="relative w-80 h-80 bg-slate-50 rounded-lg border border-dashed border-slate-300 overflow-hidden flex items-center justify-center shadow-sm">
                                        <img 
                                            src={previewUrl} 
                                            className="max-w-full max-h-full object-contain" 
                                            alt="Preview" 
                                        />
                                        
                                        <button
                                            type="button"
                                            onClick={clearImage}
                                            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-all"
                                            title="Hapus Gambar"
                                        >
                                            <X className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <Button 
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                                type="button" 
                                variant="outline"
                                asChild
                            >
                                <Link href={route('dashboard.articles.index')}>
                                    <CircleXIcon className="mr-2 h-4 w-4" /> Batal
                                </Link>
                            </Button>

                            <Button 
                                type="submit" 
                                disabled={processing} 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                            >
                                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Simpan Artikel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}