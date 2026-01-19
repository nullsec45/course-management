<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VideoRequest extends FormRequest
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
        $videoId = $this->route()->parameters['id'] ?? null;

        return [
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['required', 'string', 'max:500'],
            'status'      => ['required', Rule::in(['draft', 'published', 'archived'])],
            'author'      => ['required', 'string'],
            'slug'        => [
                'nullable',
                'string',
                Rule::unique('videos', 'slug')->ignore($videoId)
            ],
            'thumbnail'   => [
                $videoId ? 'nullable' : 'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048'
            ],
            'video_file'  => [
                $videoId ? 'nullable' : 'required',
                'file',
                'mimetypes:video/mp4,video/x-matroska,video/quicktime',
                'max:102400'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'        => 'Judul video tidak boleh kosong.',
            'category_id.required'  => 'Kategori video tidak boleh kosong.',
            'category_id.exists'    => 'Kategori yang dipilih tidak terdaftar.',
            'status.required'       => 'Status tidak boleh kosong.',
            'status.in'             => 'Status harus berupa draft, published atau archived.',
            'video_file.required'   => 'File video wajib diunggah.',
            'video_file.mimetypes'  => 'Format video harus berupa MP4 atau MKV.',
            'thumbnail.required'    => 'Gambar sampul (thumbnail) wajib diunggah.',
            'thumbnail.max'         => 'Ukuran thumbnail maksimal 2MB.',
            'thumbnail.mimetypes'   => 'Format video harus berupa JPG,JPEG,PNG,atau WEBP.',
            'description.required'  => 'Deskripsi tidak boleh kosong.',
            'description.max'       => 'Deskripsi maksimal 500 karakter'
        ];
    }
}
