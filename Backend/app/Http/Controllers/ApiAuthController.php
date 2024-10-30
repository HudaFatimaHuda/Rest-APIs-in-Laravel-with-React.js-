<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;



class ApiAuthController extends Controller
{
    public function register(Request $request){
        $validateData = $request->validate([
            'name' => 'required',
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['min:8', 'confirmed']
        ]);

        // Check if the email is already registered
        if (User::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'The email is already registered.'], 422);
        }

        // Create the new user
        $user = User::create($validateData);

        // Generate and return the token
        $token = $user->createToken('auth_token')->accessToken;
        return response()->json([
            'token' => $token,
            'user' => $user,
            'message' => 'User created successfully',
            'status' => 1
        ]);
    }


    public function login(Request $request){
        $validateData = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        // Find the user by email
        $user = User::where('email', $validateData['email'])->first();

        // If user found, check if password matches
        if ($user && Hash::check($validateData['password'], $user->password)) {
            // Password is correct
            // Generate token if needed and return response
            $token = $user->createToken('auth_token')->accessToken;
            return response()->json([
                'token' => $token,
                'user' => $user,
                'message' => 'User login successfully',
                'status' => 1
            ]);
        } else {
            // User not found or password incorrect
            return response()->json(['message' => 'Invalid email or password'], 401);
        }
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            // Revoke all of the user's tokens
            $request->user()->tokens()->delete();
            return response()->json(['message' => 'User logged out successfully'], 200);
        } else {
            return response()->json(['message' => 'User is not authenticated'], 401);
        }
    }

}
