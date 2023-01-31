<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Validator;

class UserController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            // 'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();

        if (count(User::where('email', $input['email'])->get()) > 0) {
            return $this->sendError('Registration with email "' . $input['email'] . '" already exists.');
        }

        $input['password'] = bcrypt($input['password']);
        try {
            $user = User::create($input);
        } catch (Exception $e) {
            return $this->sendError($e);
        }

        // $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['uuid'] =  $user->id;

        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            // $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['uuid'] =  $user->id;

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Your login credentials are incorrect');
        }
    }

    public function show($id)
    {
        $user = User::find($id);
        $data = ['id' => $user->id, 'name' => $user->name];
        return $this->sendResponse($data, 'User details successfully retrieved.');
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->name = $request->name;
            $user->save();
        }
        return $this->sendResponse([], 'User details successfully updated.');
    }

    public function get_preferences($id)
    {
        $user = User::find($id);
        $data = $user ? json_decode($user->config) : [];
        return $this->sendResponse($data, 'User preferences successfully retrieved.');
    }

    public function update_preferences(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->config = json_encode([
                'newsAPI' => $request->newsAPI,
                'NYTimes' => $request->NYTimes,
                'guardian' => $request->guardian,
                'preferences' => json_encode($request->preferences)
            ]);
            $user->save();
        }
        return $this->sendResponse([], 'News preferences successfully updated.');
    }
}
