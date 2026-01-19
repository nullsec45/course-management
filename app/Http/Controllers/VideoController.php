<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoRequest;
use Illuminate\Http\Request;
use App\Models\Video;
use App\Models\Media;
use App\Models\Category;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();
        $query = Video::with(['media', 'category'])->latest();


        if ($user->role === 'Admin' || $user->role === 'Author') {
            if ($user->role == 'Author') {
                $query->where('author', $user->id);
            }
            $videos = $query->paginate(5);
        } else  if ($user->membership) {
            $query->where('status', 'published');

            $totalAllowed = (int) $user->membership->video_limit;

            if (!is_null($totalAllowed) && (int)$totalAllowed > 0) {
                $videosData = $query->limit((int)$totalAllowed)->get();
            } else {
                $videosData = $query->get();
            }

            $currentPage = \Illuminate\Pagination\Paginator::resolveCurrentPage();
            $perPage = 5;
            $currentItems = $videosData->slice(($currentPage - 1) * $perPage, $perPage)->values();

            $videos = new \Illuminate\Pagination\LengthAwarePaginator(
                $currentItems,
                $videosData->count(),
                $perPage,
                $currentPage,
                ['path' => \Illuminate\Pagination\Paginator::resolveCurrentPath()]
            );
        } else {
            $videos = new \Illuminate\Pagination\LengthAwarePaginator([], 0, 10);
        }


        return Inertia::render('Dashboard/Videos/Index', [
            'videos' => $videos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Dashboard/Videos/CreateVideo', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VideoRequest $request)
    {
        DB::beginTransaction();
        $pathThumbnail = 'uploads/videos/thumbnails';
        $pathVideo = 'uploads/videos/files';
        $fileThumbName = null;
        $fileVideoName = null;

        try {
            $video = Video::create([
                'title' => $request->title,
                'description' => $request->description,
                'slug' => Str::slug($request->title),
                'status' => $request->status ?? 'published',
                'author' => Auth::user()->id,
                'category_id' => $request->category_id,
            ]);

            if ($request->hasFile('thumbnail')) {
                $fileThumb = $request->file('thumbnail');
                $fileThumbName = $this->helper->fileUploadHandling($fileThumb, 'VTH', $pathThumbnail, 'create');

                Media::create([
                    'model_type' => Video::class,
                    'model_id' => $video->id,
                    'uuid' => Str::uuid(),
                    'collection_name' => 'video_thumbnail',
                    'path' => $pathThumbnail,
                    'file_name' => $fileThumbName,
                    'mime_type' => $fileThumb->getClientMimeType(),
                    'disk' => 'public',
                    'size' => $fileThumb->getSize(),
                ]);
            }

            if ($request->hasFile('video_file')) {
                $fileVideo = $request->file('video_file');
                $fileVideoName = $this->helper->fileUploadHandling($fileVideo, 'VID', $pathVideo, 'create');

                Media::create([
                    'model_type' => Video::class,
                    'model_id' => $video->id,
                    'uuid' => Str::uuid(),
                    'collection_name' => 'video_content',
                    'path' => $pathVideo,
                    'file_name' => $fileVideoName,
                    'mime_type' => $fileVideo->getClientMimeType(),
                    'disk' => 'public',
                    'size' => $fileVideo->getSize(),
                ]);
            }

            DB::commit();
            return redirect()->route('dashboard.videos.index')->with('success', 'Video dan Thumbnail berhasil diupload.');
        } catch (\Throwable $err) {
            DB::rollBack();
            $this->helper->fileDeleteHandling($pathThumbnail, $fileThumbName);
            $this->helper->fileDeleteHandling($pathVideo, $fileVideoName);
            return back()->withInput()->withErrors(['error' => $err->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $video = Video::with('media', 'category')->findOrFail($id);

            return Inertia::render('Dashboard/Videos/ShowVideo', [
                'video' => $video,
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
        try {
            $video = Video::with('media')->findOrFail($id);
            $categories = Category::all();

            return Inertia::render('Dashboard/Videos/EditVideo', [
                'video' => $video,
                'categories' => $categories
            ]);
        } catch (\Throwable $err) {
            return back()->withInput()->withErrors(['error' => $err->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VideoRequest $request, string $id)
    {
        DB::beginTransaction();
        $pathThumbnail = 'uploads/videos/thumbnails';
        $pathVideo = 'uploads/videos/files';

        $newThumbName = null;
        $newVideoName = null;

        try {
            $video = Video::with('media')->findOrFail($id);

            if (Auth::user()->id !== $video->author) {
                abort(403, 'Anda tidak memiliki akses ke halaman ini.');
            }

            $video->update([
                'title' => $request->title,
                'description' => $request->description,
                'slug' => Str::slug($request->title),
                'status' => $request->status,
                'category_id' => $request->category_id,
            ]);

            if ($request->hasFile('thumbnail')) {
                $fileThumb = $request->file('thumbnail');

                $oldThumb = $video->media->where('collection_name', 'video_thumbnail')->first();

                $newThumbName = $this->helper->fileUploadHandling(
                    $fileThumb,
                    'VTH',
                    $pathThumbnail,
                    'update',
                    $oldThumb?->file_name
                );

                Media::updateOrCreate(
                    [
                        'model_type' => Video::class,
                        'model_id' => $video->id,
                        'collection_name' => 'video_thumbnail',
                    ],
                    [
                        'uuid' => \Illuminate\Support\Str::uuid(),
                        'path' => $pathThumbnail,
                        'file_name' => $newThumbName,
                        'mime_type' => $fileThumb->getClientMimeType(),
                        'disk' => 'public',
                        'size' => $fileThumb->getSize(),
                    ]
                );
            }

            if ($request->hasFile('video_file')) {
                $fileVid = $request->file('video_file');

                $oldVid = $video->media->where('collection_name', 'video_content')->first();

                $newVideoName = $this->helper->fileUploadHandling(
                    $fileVid,
                    'VID',
                    $pathVideo,
                    'update',
                    $oldVid?->file_name
                );

                Media::updateOrCreate(
                    [
                        'model_type' => Video::class,
                        'model_id' => $video->id,
                        'collection_name' => 'video_content',
                    ],
                    [
                        'uuid' => \Illuminate\Support\Str::uuid(),
                        'path' => $pathVideo,
                        'file_name' => $newVideoName,
                        'mime_type' => $fileVid->getClientMimeType(),
                        'disk' => 'public',
                        'size' => $fileVid->getSize(),
                    ]
                );
            }

            DB::commit();
            return redirect()->route('dashboard.videos.index')->with('success', 'Video berhasil diperbarui.');
        } catch (\Throwable $err) {
            DB::rollBack();

            if ($newThumbName) $this->helper->fileDeleteHandling($pathThumbnail, $newThumbName);
            if ($newVideoName) $this->helper->fileDeleteHandling($pathVideo, $newVideoName);

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
            $video = Video::findOrFail($id);

            if (Auth::user()->id !== $video->author) {
                abort(403, 'Anda tidak memiliki akses ke halaman ini.');
            }

            $media = $video->media->first();

            if ($media) {
                $this->helper->fileDeleteHandling($media->path, $media->file_name);
            }

            $video->delete();
            DB::commit();

            return redirect()->route('dashboard.videos.index')->with('success', 'Video berhasil dihapus.');
        } catch (\Throwable $err) {
            DB::rollBack();
            return back()->withErrors(['error' => $err->getMessage()]);
        }
    }
}
