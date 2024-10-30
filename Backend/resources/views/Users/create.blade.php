@php
use Illuminate\Support\Facades\Auth;
$id = Auth::id();
@endphp

<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Students') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 text-center">
                    <h2>CRUD in LARAVEL</h2>
                </div>
                <div class="d-flex justify-content-end mx-auto col-lg-8 col-md-10">
                    <a class="btn btn-primary" href="{{ route('users.index') }}"> Back</a>
                </div>
                <form id='add-user' autocomplete="off" action="{{route('users.store')}}" method="POST" class="border rounded border-secondary bg-light p-4 mx-auto m-4 col-lg-8 col-md-10" enctype="multipart/form-data">
                    @csrf
                    <input autocomplete="false" name="hidden" type="text" style="display:none;">

                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" id="name" class="form-control" name="name">
                        @error('name')
                        <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="score" class="form-label">Score</label>
                        <input type="number" id="score" class="form-control" name="score">
                        @error('score')
                        <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="dob" class="form-label">Date of Birth</label>
                        <input type="date" id="dob" class="form-control" name="dob">
                        @error('dob')
                        <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="text-center">
                        <input type="submit" name='submit' class="btn btn-primary" id="submit" style="background-color: #0d6efd;">
                        <input type="number" name='user_id' id="user_id" value={{$id}} hidden>
                    </div>

                </form>
            </div>
        </div>
    </div>
</x-app-layout>
