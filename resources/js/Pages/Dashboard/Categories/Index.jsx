import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash, Plus, Folder } from "lucide-react";

export default function Index({ auth, categories }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard - Kategori</h2>}
        >
            <Head title="Dashboard - Kategori" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold font-headline">Daftar Kategori</h1>
                    <p className="text-muted-foreground">Kelola kategori untuk konten video dan artikel.</p>
                </div>
                
                <Button className="mb-5 bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/dashboard/categories/create">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Kategori
                    </Link>
                </Button>

                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead>Nama Kategori</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.data.length > 0 ? (
                                    categories.data.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium text-slate-900">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="text-slate-500 italic">
                                                {item.slug}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                   <Button 
                                                        size="sm" 
                                                        asChild 
                                                        className="h-8 bg-blue-600 text-white hover:bg-blue-700 border-none shadow-sm transition-colors"
                                                    >
                                                        <Link href={`/dashboard/categories/${item.id}/edit`}>
                                                            <Pencil className="w-3.5 h-3.5 mr-2" />
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button variant="destructive" size="sm" asChild className="h-8 text-white">
                                                        <Link 
                                                            href={`/dashboard/categories/${item.id}`} 
                                                            method="delete" 
                                                            as="button"
                                                            onBefore={() => confirm('Hapus kategori ini?')}
                                                        >
                                                            <Trash className="w-3.5 h-3.5 mr-1" /> Hapus
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-40 text-center text-slate-400">
                                            <Folder className="mx-auto h-8 w-8 opacity-20 mb-2" />
                                            Belum ada kategori.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Pagination Biru */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {categories.links.map((link, index) => (
                        link.url ? (
                            <Link
                                key={index}
                                href={link.url}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                    link.active 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label.replace('&laquo; Previous', 'Sebelumnya').replace('Next &raquo;', 'Selanjutnya') }}
                            />
                        ) : (
                            <span
                                key={index}
                                className="px-4 py-2 text-sm font-medium rounded-md opacity-50 border border-slate-100 text-slate-300 cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: link.label.replace('&laquo; Previous', 'Sebelumnya').replace('Next &raquo;', 'Selanjutnya') }}
                            />
                        )
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}