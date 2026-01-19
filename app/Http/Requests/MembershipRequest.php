<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MembershipRequest extends FormRequest
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
        return [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'article_limit' => 'nullable|integer|min:0',
            'video_limit' => 'nullable|integer|min:0',
            'description' => 'required|string'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama membership wajib diisi.',
            'name.string'   => 'Nama harus berupa teks.',
            'name.max'      => 'Nama maksimal 255 karakter.',
            'price.required' => 'Harga wajib diisi.',
            'price.numeric'  => 'Harga harus berupa angka.',
            'price.min'      => 'Harga tidak boleh kurang dari 0.',
            'price.max'      => 'Harga yang dimasukkan terlalu besar (maksimal 999.999.999.999).',
            'article_limit.integer' => 'Limit artikel harus berupa angka bulat.',
            'article_limit.min'     => 'Limit artikel minimal adalah 0.',
            'video_limit.integer' => 'Limit video harus berupa angka bulat.',
            'video_limit.min'     => 'Limit video minimal adalah 0.',
            'description.required' => 'Deskripsi membership wajib diisi.',
            'description.string'   => 'Deskripsi harus berupa teks.',
        ];
    }
}
