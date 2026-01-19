<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;



class UserRequest extends FormRequest
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
        $userId = $this->route()->parameters['id'] ?? null;

        $checkRoute = $this->route()->getName();

        $rules = [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                Rule::unique('users', 'email')->ignore($userId)
            ],
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required|in:Admin,Author',
        ];


        if ($checkRoute === "dashboard.users.update") {

            $rules['password'][0] = 'nullable';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama user wajib diisi.',
            'name.string'   => 'Nama harus berupa teks.',
            'name.max'      => 'Nama maksimal 255 karakter.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email'    => 'Format email tidak valid.',
            'email.unique'   => 'Email ini sudah terdaftar di sistem.',
            'password.required' => 'Password wajib diisi.',
            'password.min'      => 'Password terlalu pendek.',
            'role.required' => 'Role user wajib dipilih.',
            'role.in'       => 'Role yang dipilih tidak tersedia (Admin/Author).',
        ];
    }
}
