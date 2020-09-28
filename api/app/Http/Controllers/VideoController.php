<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\User;
use App\Models\UserSub;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function __construct()
    {
    }
  
    public function index()
    {
        try {
            $videos = Video::join('users', 'users.id', '=', 'videos.user_id')
            ->select('videos.*', 'users.name', 'users.profile')->orderBy('videos.created_at', 'desc')->get();
            return response()->json(['status' => 200,"videos"=>$videos],
            200, [], JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function stream($id)
    {
     
            $video = Video::find($id);
            $video= Storage::disk('videos')->get($video->url);
            $response = Response::make($video, 200);
   $response->header('Content-Type', 'video/mp4');
   return $response;
     
    }



    public function subscriptions($id)
    {
        try {
        $videos = Video::join('users', 'users.id', '=', 'videos.user_id')
        ->join('user_sub', 'users.id', '=', 'user_sub.user_id')
        ->select('videos.*', 'users.name', 'users.profile')->orderBy('videos.created_at', 'desc')
        ->orderBy('videos.likes', 'desc')->orderBy('videos.views', 'desc')
        ->where("user_sub.sub_id", "=", $id)->get();
        return response()->json(['status' => 200,"videos"=>$videos],
        200, [], JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
    } catch (Throwable $e) {
        return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
    }
    }

    public function query(Request $request)
    {
        try {
            $query = '%'.$request->get('query').'%';
            $videos = Video::join('users', 'users.id', '=', 'videos.user_id')
            ->join('user_sub', 'users.id', '=', 'user_sub.user_id')
            ->select('videos.*', 'users.name', 'users.profile')->orderBy('videos.views', 'desc')
            ->orderBy('videos.likes', 'desc')->orderBy('videos.created_at', 'desc')    
            ->where('videos.nombre', 'like', $query )->get();
            return response()->json(['status' => 200,"videos"=>$videos],
            200, [], JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function watch($id,$user)
    {
        try {
            $video = Video::join('users', 'users.id', '=', 'videos.user_id')
            ->select('videos.*', 'users.name', 'users.profile')
            ->where("videos.id", "=", $id)->first();
            if (!$video) {
                return response()->json(array("status"=>500,"message"=>"El video no existe."));
            }
            if($video->user_id == $user){
                $state = 0;
            }else{
                $state = UserSub::where("user_id", "=", $video->user_id)->where("sub_id", "=", $user)->first();
                $state = ($state) ? 2: 1;
            }
            $subs = UserSub::where("user_id", "=", $video->user_id)->get();
            $subs = ($subs) ? count($subs): 0;
            $later = Video::join('users', 'users.id', '=', 'videos.user_id')
            ->select('videos.*', 'users.name', 'users.profile')->where("videos.user_id", "=", $video->user_id)->where("videos.id", "<>", $video->id)->orderBy('videos.created_at', 'desc')->limit(5)->get();
            $videos = Video::join('users', 'users.id', '=', 'videos.user_id')
            ->select('videos.*', 'users.name', 'users.profile')->where("videos.user_id", "<>", $video->user_id)->orderBy('videos.created_at', 'desc')->limit(5)->get();
            $comments = Comment::join('users', 'users.id', '=', 'comments.user_id')
            ->select('comments.*', 'users.name', 'users.profile')->whereNull('comment_id')->where("video_id", "=", $video->id)->orderBy('likes', 'desc')->get();
            $video->views++;
            $video->save();
            $user = User::find($user);
            return response()->json(["status"=>200,"state"=>$state,"subs"=>$subs,
            "video"=>$video,"later"=>$later,"videos"=>$videos,'comments'=>$comments,
            'comments_count'=>$comments->count(),'user'=>$user]
            , 200, [], JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function likes(Request $request)
    {
        try {
            $rules = array(
                'id' => 'numeric|required',
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $video = Video::find($request->id);
                if (!$video) {
                    return response()->json(['status' => 500, 'message' =>"El video no existe."]);
                }

                $video->likes++;            
                $video->save();
                return response()->json(['status' => 200, 'message' => "Like al video \"".$video->nombre."\"."]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function dislikes(Request $request)
    {
        try {
            $rules = array(
                'id' => 'numeric|required',
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $video = Video::find($request->id);
                if (!$video) {
                    return response()->json(['status' => 500, 'message' =>"El video no existe."]);
                }

                $video->dislikes++;            
                $video->save();
                return response()->json(['status' => 200, 'message' => "Dislike al video \"".$video->nombre."\"."]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }

    public function upload(Request $request)
    {
        try {
            $rules = array(
                'user_id' => 'numeric|required',
                'nombre' => 'required',
                'descripcion' => 'required',
                'duration' => 'required'
            );

            $validator = Validator::make($request->all(), $rules);
            

            if ($validator->fails()) {
                return response()->json(['status' => 500, 'message' => "Error en el formulario.", 'messageJSON' => $validator]);
            } else {
                $video = new Video;

                $user = User::find($request->user_id);
                if (!$user) {
                    return response()->json(['status' => 500, 'message' =>"El usuario no existe."]);
                }
                $video->nombre = $request->nombre;
                $video->descripcion = $request->descripcion;
                $video->tiempo = $request->duration;
                $video->likes = 0;
                $video->dislikes = 0;
                $video->views = 0;
                $video->user()->associate($user);
                             
                if (!$request->hasFile('video')) {
                    return response()->json(['status' => 500, 'message' => 'Seleccione un video.']);
                }
                if (!$request->hasFile('thumb')) {
                    return response()->json(['status' => 500, 'message' => 'Seleccione una miniatura.']);
                }
                $file = $request->file('video');
                $video->url = $request->user_id.'_'.$file->getClientOriginalName();
                $file->move(base_path('\public\video'), $video->url);

                $file = $request->file('thumb');
                $video->img = $request->user_id.'_'.$file->getClientOriginalName();
                $file->move(base_path('\public\thumb'), $video->img);

                //$video->url = url('/')."/api/video/stream/".$video->url;
                $video->img = url('/')."/thumb/".$video->img;
                $video->save();
                return response()->json(['status' => 200, 'message' => "El video \"".$video->nombre."\" ha sido subido.", 'video' => $video->id]);
            }
        } catch (Throwable $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()."."]);
        }
    }
}
