import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link, Head } from '@inertiajs/react'; 
import { Loader2, Save, Video, CircleXIcon, Image as ImageIcon, FileVideo, X,AlertCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import InputError from "@/Components/InputError"; 
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function EditVideo({ auth, video, categories }) {
    const [thumbPreview, setThumbPreview] = useState(video.media.find(m => m.collection_name === 'video_thumbnail')?.original_url || null);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: video.title || '',
        status: video.status || '',
        category_id: String(video.category_id) || '',
        description: video.description || '',
        thumbnail: null,
        video_file: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('thumbnail', file);
            setThumbPreview(URL.createObjectURL(file));
        }
    };

    const clearImage = () => {
        setData('thumbnail', null);
        setThumbPreview(null);
        document.getElementById('thumbnail').value = "";
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('dashboard.videos.update', video.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Video</h2>}
        >
            <Head title={`Edit Video - ${video.title}`} />
            
            <Card className="border-slate-200">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2 text-slate-900">
                        <Video className="text-blue-600 h-8 w-8" />
                        Edit Materi Video
                    </CardTitle>
                    <CardDescription>Perbarui informasi materi, kategori, atau file video Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                     {errors.error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircleIcon className="h-4 w-4" />
                            <AlertTitle>Terjadi Kesalahan</AlertTitle>
                            <AlertDescription>{errors.error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul Video</Label>
                                    <Input 
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="space-y-2">
                                    <Label>Kategori Materi</Label>
                                    <Select 
                                        onValueChange={(val) => setData('category_id', val)}
                                        defaultValue={data.category_id}
                                    >
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
                                        defaultValue={data.status}
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
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <Textarea 
                                        id="description"
                                        rows={6}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2 ">
                                    <Label className="flex items-center gap-2">
                                        Update  Video
                                    </Label>
                                    <Input 
                                        type="file" 
                                        accept="video/*"
                                        onChange={(e) => setData('video_file', e.target.files[0])}
                                        className="bg-white"
                                    />
                                    <p className="text-[11px] text-slate-500 italic">Biarkan kosong jika tidak ingin mengganti file video saat ini.</p>
                                    <InputError message={errors.video_file} />
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
        
                                    {thumbPreview && (
                                        <div className="flex justify-center mt-4"> 
                                            <div className="relative w-80 h-80 bg-slate-50 rounded-lg border border-dashed border-slate-300 overflow-hidden flex items-center justify-center shadow-sm">
                                                <img 
                                                    src={thumbPreview} 
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
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
                            <Button variant="outline" className="text-slate-600" asChild>
                                <Link href={route('dashboard.videos.index')}>
                                    <CircleXIcon className="mr-2 h-4 w-4" /> Batal
                                </Link>
                            </Button>

                            <Button 
                                type="submit" 
                                disabled={processing} 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-10"
                            >
                                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Simpan 
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}