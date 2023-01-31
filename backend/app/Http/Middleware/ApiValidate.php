<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Address;

class ApiValidate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // if ((!$request->header('Authorization') ||
        //         $request->header('Authorization') !== env('API_KEY')) ||
        //     (!$request->header('user_id')) ||
        //     (count(Address::where(['user_id' => $request->header('user_id')])->get()) == 0)
        // ) {
        //     return response()->json(['success' => false, 'message' => 'Unauthorized API request'], 401);
        // }
        return $next($request);
    }
}
