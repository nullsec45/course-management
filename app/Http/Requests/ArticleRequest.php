<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $articleId = $this->route()->parameters['id'] ?? null;

        return [
            'title'       => ['required', 'string', 'max:255'],
            'content'     => ['required', 'string'],
            'description' => ['required', 'string', 'max:500'],
            'category_id' => ['required', 'exists:categories,id'],
            'status'      => ['required', Rule::in(['draft', 'published', 'archieved'])],
            'author'      => ['nullable', 'string', 'max:100'],
            'slug'        => [
                'nullable',
                'string',
                Rule::unique('articles', 'slug')->ignore($articleId)
            ],
            'thumbnail'   => [
                $articleId ? 'nullable' : 'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'       => 'Judul artikel wajib diisi.',
            'content.required'     => 'Isi konten artikel tidak boleh kosong.',
            'category_id.required' => 'Kategori artikel tidak boleh kosong.',
            'category_id.exists'   => 'Kategori yang dipilih tidak valid.',
            'status.required'      => 'Status tidak boleh kosong.',
            'status.in'            => 'Status harus berupa draft, published atau archived.',
            'slug.unique'          => 'Judul ini sudah digunakan, silakan gunakan judul lain agar slug tetap unik.',
            'thumbnail.image'      => 'File harus berupa gambar.',
            'thumbnail.max'        => 'Ukuran gambar maksimal adalah 2MB.',
            'description.required'  => 'Deskripsi tidak boleh kosong.',
            'description.max'       => 'Deskripsi maksimal 500 karakter'
        ];
    }
}
