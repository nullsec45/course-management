import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from '@inertiajs/react'; 
import { AlertCircleIcon, Loader2, ChevronLeft, Save, Zap,  CircleXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import InputError from "@/Components/InputError"; 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CreateMembership({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        article_limit: '',
        video_limit: '',
        description: '',
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route('dashboard.memberships.store'));
    }

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2">
                        <Zap className="text-blue-600 h-8 w-8" />
                        Buat Paket Membership
                    </CardTitle>
                    <CardDescription>
                        Tentukan konfigurasi paket langganan baru untuk pengguna Anda.
                    </CardDescription>
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
                                <Label htmlFor="name">Tipe / Nama Paket</Label>
                                <Input 
                                    id="name"
                                    placeholder="Contoh: Gold, Platinum, Pro"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Harga Paket (IDR)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-medium">Rp</span>
                                    <Input 
                                        id="price"
                                        type="number"
                                        className="pl-9"
                                        placeholder="50000"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.price} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="article_limit">Limit Artikel</Label>
                                <Input 
                                    id="article_limit"
                                    type="number"
                                    placeholder="Contoh: 10 (Kosongkan jika tak terbatas)"
                                    value={data.article_limit}
                                    onChange={(e) => setData('article_limit', e.target.value)}
                                />
                                <InputError message={errors.article_limit} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="video_limit">Limit Video</Label>
                                <Input 
                                    id="video_limit"
                                    type="number"
                                    placeholder="Contoh: 5 (Kosongkan jika tak terbatas)"
                                    value={data.video_limit}
                                    onChange={(e) => setData('video_limit', e.target.value)}
                                />
                                <InputError message={errors.video_limit} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi Keuntungan</Label>
                            <Textarea 
                                id="description"
                                placeholder="Jelaskan apa saja yang didapat pengguna pada paket ini..." 
                                rows={5}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <Button 
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                                type="button" 
                                variant="outline"
                                asChild
                            >
                                <Link href={route('dashboard.memberships.index')}>
                                    <CircleXIcon className="mr-2 h-4 w-4" /> Batal
                                </Link>
                            </Button>

                            <Button 
                                type="submit" 
                                disabled={processing} 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
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