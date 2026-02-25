<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function registerPage()
    {
        if (Auth::check()) {
            return redirect()->route("home");
        }

        return Inertia::render("Auth/Register");
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:8|confirmed",
        ]);

        $user = User::create([
            "name" => $validated["name"],
            "email" => $validated["email"],
            "password" => Hash::make($validated["password"]),
            "role" => "user",
        ]);

        $request->session()->regenerate();

        Auth::login($user);

        return redirect()->intended(route("home"));
    }
    //ini method untuk pakai halaman login
    public function loginPage()
    {
        if (Auth::check()) {
            return redirect()->route("admin.starter-kits.index");
        }
        return Inertia::render("Auth/Login");
    }

    //ini method loginnya, pakai remember me karena dari laravel nya ada mmgmi tabel sama modelnya jadi malaska custom
    public function login(Request $request)
    {
        $credentials = $request->validate([
            "email" => "required|email",
            "password" => "required",
        ]);

        if (Auth::attempt($credentials, $request->boolean("remember"))) {
            $request->session()->regenerate();

            if (Auth::user()->isAdmin()) {
                return redirect()->intended(route("admin.starter-kits.index"));
            }

            return redirect()->intended(route("home"));
        }

        return back()
            ->withErrors([
                "email" => "The provided credentials do not match our records.",
            ])
            ->onlyInput("email");
    }

    //logout method (hapus session, regenerate token)
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route("login");
    }
}
