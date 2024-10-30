<?php

namespace App\Http\Requests\API;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserAPIRequest extends FormRequest
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
            'name' => ['required', 'string', 'regex:/^[a-zA-Z\s]+$/'],
            'score' => ['required', 'integer', 'between:0,100'],
            'dob' => ['required', 'date_format:Y-m-d']
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name field must be a string.',

            'score.required' => 'The score field is required.',
            'score.integer' => 'The score field must be an integer.',
            'score.between' => 'The score field must be between 0 and 100.',

            'dob.required' => 'The dob field is required.',
            'dob.date_format' => 'The dob field must be in the format Y-m-d.'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'The given data was invalid.',
            'errors' => $validator->errors()
        ], 422));
    }

}
