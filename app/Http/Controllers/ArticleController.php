<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Media;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Http\Requests\ArticleRequest;

class ArticleController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();
        $query = Article::with(['media', 'category'])->latest();

        if ($user->role === 'Admin' || $user->role == 'Author') {
            if ($user->role == 'Author') {
                $query->where('author', $user->id);
            }
            $articles = $query->paginate(5);
        } else if ($user->membership) {
            $query->where('status', 'published');
            $totalAllowed = (int) $user->membership->video_limit;


            if (!is_null($totalAllowed) && (int)$totalAllowed > 0) {
                $articlesData = $query->limit((int)$totalAllowed)->get();
            } else {
                $articlesData = $query->get();
            }

            $currentPage = \Illuminate\Pagination\Paginator::resolveCurrentPage();
            $perPage = 5;
            $currentItems = $articlesData->slice(($currentPage - 1) * $perPage, $perPage)->values();

            $articles = new \Illuminate\Pagination\LengthAwarePaginator(
                $currentItems,
                $articlesData->count(),
                $perPage,
                $currentPage,
                ['path' => \Illuminate\Pagination\Paginator::resolveCurrentPath()]
            );
        } else {
            $articles = new \Illuminate\Pagination\LengthAwarePaginator([], 0, 10);
        }

        return Inertia::render('Dashboard/Articles/Index', [
            'articles' => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Dashboard/Articles/CreateArticle', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request)
    {
        DB::beginTransaction();
        $path = 'uploads/articles';
        $fileName = null;

        try {
            $data = $request->validated();
            $data['slug'] = Str::slug($request->title);
            $data['author'] = Auth::id();
            $article = Article::create($data);

            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                $fileName = $this->helper->fileUploadHandling($file, 'ART', $path, 'create');

                Media::create([
                    'model_type' => Article::class,
                    'model_id' => $article->id,
                    'uuid' => Str::uuid(),
                    'collection_name' => 'article_thumbnail',
                    'path' => $path,
                    'file_name' => $fileName,
                    'mime_type' => $file->getClientMimeType(),
                    'disk' => 'public',
                    'size' => $file->getSize(),
                    'manipulations' => '',
                    'custom_properties' => '',
                    'generated_conversions' => '',
                    'responsive_images' => '',
                    'order_column' => 1,
                    'conversions_disk' => 'public',
                ]);
            }

            DB::commit();
            return redirect()->route('dashboard.articles.index')->with('success', 'Artikel berhasil diterbitkan.');
        } catch (\Throwable $err) {
            DB::rollBack();
            $this->helper->fileDeleteHandling($path, $fileName);
            return back()->withInput()->withErrors(['error' => $err->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $article = Article::with('media', 'category', 'author')->findOrFail($id);

            return Inertia::render('Dashboard/Articles/ShowArticle', [
                'article' => $article,
            ]);
        } catch (\Throwable $err) {
            return back()->withInput()->withErrors(['error' => $err->getMessage()]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $article = Article::with('media')->findOrFail($id);
        $categories = Category::all();

        return Inertia::render('Dashboard/Articles/EditArticle', [
            'article' => $article,
            'categories' => $categories
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, string $id)
    {
        DB::beginTransaction();
        $path = 'uploads/articles';
        $fileName = null;

        try {
            $article = Article::findOrFail($id);

            if (Auth::user()->id !== $article->author) {
                abort(403, 'Anda tidak memiliki akses ke halaman ini.');
            }

            $data = $request->validated();
            $data['slug'] = Str::slug($request->title);

            $article->update($data);

            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');

                $oldFile = $article->media->first()?->file_name;
                $fileName = $this->helper->fileUploadHandling($file, 'ART', $path, 'update', $oldFile);

                Media::updateOrCreate(
                    [
                        'model_type' => Article::class,
                        'model_id' => $article->id,
                    ],
                    [
                        'uuid' => Str::uuid(),
                        'collection_name' => 'article_thumbnail',
                        'path' => $path,
                        'file_name' => $fileName,
                        'mime_type' => $file->getClientMimeType(),
                        'disk' => 'public',
                        'size' => $file->getSize(),
                        'order_column' => 1,
                        'conversions_disk' => 'public',
                    ]
                );
            }

            DB::commit();
            return redirect()->route('dashboard.articles.index')->with('success', 'Artikel berhasil diperbarui.');
        } catch (\Throwable $err) {
            DB::rollBack();
            $this->helper->fileDeleteHandling($path, $fileName);
            return back()->withInput()->withErrors(['error' => $err->getMessage()]);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $article = Article::findOrFail($id);

            if (Auth::user()->id !== $article->author) {
                abort(403, 'Anda tidak memiliki akses ke halaman ini.');
            }

            $media = $article->media->first();
            if ($media) {
                $this->helper->fileDeleteHandling($media->path, $media->file_name);
            }

            $article->delete();
            DB::commit();

            return redirect()->route('dashboard.articles.index')->with('success', 'Artikel berhasil dihapus.');
        } catch (\Throwable $err) {
            DB::rollBack();
            return back()->withErrors(['error' => $err->getMessage()]);
        }
    }
}
