<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\CategoryRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::paginate(10);

        return Inertia::render('Dashboard/Categories/Index', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Categories/CreateCategory');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();

            Category::create($data);

            DB::commit();

            return redirect()->route('dashboard.categories.index')->with('success', 'Kategori berhasil dibuat.');
        } catch (\Throwable $err) {
            DB::rollBack();

            return back()
                ->withInput()
                ->withErrors(['error' => $err->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::findOrFail($id);

        return Inertia::render('Dashboard/Categories/Show', ['category' => $category]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = Category::findOrFail($id);

        return Inertia::render('Dashboard/Categories/EditCategory', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, string $id)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();

            $category = Category::findOrFail($id);
            $category->update($data);

            DB::commit();

            return redirect()->route('dashboard.categories.index')->with('success', 'Kategori berhasil diubah.');
        } catch (\Throwable $err) {
            DB::rollBack();

            return back()
                ->withInput()
                ->withErrors(['error' => $err->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $category = Category::findOrFail($id);

            $category->delete();

            DB::commit();

            return redirect()->route('dashboard.categories.index')->with('success', 'Kategori berhasil dihapus.');
        } catch (\Throwable $err) {
            DB::rollBack();

            return back()
                ->withInput()
                ->withErrors(['error' => $err->getMessage()]);
        }
    }
}
