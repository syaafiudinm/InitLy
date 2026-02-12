<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //ini method untuk pakai halaman login
    public function loginPage()
    {
        if (Auth::check()) {
            return redirect()->route("admin.starter-kits.index");
        }
        return Inertia::render("Admin/Auth/Login");
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

            return redirect()->intended(route("admin.starter-kits.index"));
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
