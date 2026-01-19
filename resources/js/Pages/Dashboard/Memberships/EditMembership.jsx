import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from '@inertiajs/react'; 
import { AlertCircleIcon, Loader2, ChevronLeft, Save, CreditCard, CircleXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import InputError from "@/Components/InputError"; 

export default function EditMembership({ auth, membership }) {
    const { data, setData, put, processing, errors } = useForm({
        name: membership.name || '',
        price: membership.price || '',
        article_limit: membership.article_limit || '',
        video_limit: membership.video_limit || '',
        description: membership.description || '',
    });

    function onSubmit(e) {
        e.preventDefault();
        put(route('dashboard.memberships.update', membership.id));
    }

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2 text-blue-900">
                        <CreditCard className="h-8 w-8 text-blue-600" />
                        Edit Paket: {membership.name}
                    </CardTitle>
                    <CardDescription>Perbarui rincian harga dan batasan konten untuk paket ini.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="type">Tipe Paket</Label>
                                <Input 
                                    id="type"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Harga (IDR)</Label>
                                <Input 
                                    id="price"
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                />
                                <InputError message={errors.price} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="article_limit">Limit Artikel</Label>
                                <Input 
                                    id="article_limit"
                                    type="number"
                                    value={data.article_limit}
                                    placeholder="Kosongkan jika tidak terbatas"
                                    onChange={(e) => setData('article_limit', e.target.value)}
                                />
                                <InputError message={errors.article_limit} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="video_limit">Limit Video</Label>
                                <Input 
                                    id="video_limit"
                                    type="number"
                                    value={data.video_limit}
                                    placeholder="Kosongkan jika tidak terbatas"
                                    onChange={(e) => setData('video_limit', e.target.value)}
                                />
                                <InputError message={errors.video_limit} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea 
                                id="description"
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
                                {processing ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="mr-2 h-4 w-4" />
                                )}
                                Simpan 
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}