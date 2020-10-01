<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserSub;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function __construct()
    {
    }
    public function info($id, $user)
    {
        try {
            $auth = User::find($id);
            if (!$auth) {
                return response()->json(array("status"=>500,"message"=>"El usuario no existe."));
            }
            $videos = Video::join('users', 'users.id', '=', 'videos.user_id')
            ->select('videos.*', 'users.name', 'users.profile')->where("user_id", "=", $auth->id)->orderBy('created_at', 'desc')->get();
            if ($auth->id == $user) {
                $state = 0;
            } else {
                $state = UserSub::where("user_id", "=", $auth->id)->where("sub_id", "=", $user)->first();
                $state = ($state) ? 2: 1;
            }
            $subs = UserSub::where("user_id", "=", $auth->id)->get();
            $subs = ($subs) ? count($subs): 0;

            $subscriptions = UserSub::join('users', 'users.id', '=', 'user_sub.user_id')
            ->select('users.*', 'user_sub.user_id', 'user_sub.sub_id')
            ->where("sub_id", "=", $auth->id)->get();
            return response()->json(
                ["status"=>200,"user"=>$auth,"state"=>$state,"subs"=>$subs,"videos"=>$videos,"subscriptions"=>$subscriptions],
                200,
                [],
                JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT
            );
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function desubscribe(Request $request)
    {
        try {
            $user = User::find($request->user);
            $sub = User::find($request->sub);
            if ($user == null || $sub == null) {
                return response()->json(['status' => 500, 'message' => "No existen los usuarios."]);
            }
            $user->subs()->detach($sub);
            return response()->json(['status' => 200, 'message' => 'Desuscrito de '.$user->name."."]);
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function subscribe(Request $request)
    {
        try {
            $user = User::find($request->user);
            $sub = User::find($request->sub);
            if ($user == null || $sub == null) {
                return response()->json(['status' => 500, 'message' => "No existen los usuarios."]);
            }
            $user->subs()->attach($sub);
            return response()->json(['status' => 200, 'message' => 'Suscrito a '.$user->name."."]);
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function login(Request $request)
    {
        try {
            $rules = array(
                'email' => 'email|required',
                'password' => 'required'
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $user = User::where('email', '=', $request->email)->first();
                if ($user) {
                    if (Hash::check($request->password, $user->password)) {
                        return response()->json(['status' => 200, 'message' => 'Bienvenido '.$user->name.".", 'user' => $user->id]);
                    } else {
                        return response()->json(['status' => 500, 'message' => 'Contraseña incorrecta.']);
                    }
                } else {
                    return response()->json(['status' => 500, 'message' => 'El em@il "' . $request->email . '" no existe.']);
                }
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }
    public function register(Request $request)
    {
        try {
            $rules = array(
                'name' => 'required',
                'email' => 'email|required',
                'password' => 'required'
            );
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $user = new User;
                $user->name = $request->name;
                $user->email = $request->email;
                $user->remember_token = Str::random(10);
                $user->email_verified_at = now();
                $user->password = Hash::make($request->password);
                $user->save();
                return response()->json(['status' => 200, 'message' => 'Bienvenido '.$user->name.".", 'user' => $user->id]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function update(Request $request)
    {
        try {
            $user = User::find($request->user_id);
            if (!$user) {
                return response()->json(['status' => 500, 'message' =>"El usuario no existe."]);
            }
            if ($request->bio) {
                $user->bio = $request->bio;
            }
            if ($request->hasFile('banner')) {
                $file = $request->file('banner');
                $user->banner = $request->user_id.'_'.$file->getClientOriginalName();
                $file->move(base_path('\public\banner'), $user->banner);
                $user->banner = $request->getSchemeAndHttpHost()."/banner/".$user->banner;
            }
            if ($request->hasFile('profile')) {
                $file = $request->file('profile');
                $user->profile = $request->user_id.'_'.$file->getClientOriginalName();
                $file->move(base_path('\public\profile'), $user->profile);
                $user->profile = $request->getSchemeAndHttpHost()."/profile/".$user->profile;
            }
               

               
                
            $user->save();
            return response()->json(['status' => 200, 'message' => "El Usuario \"".$user->name."\" ha sido actualizado."]);
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }
}
