<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use exception;

class adminsController extends Controller
{

    public function getAdmin()
    {
        try {
            $data = Admin::all();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (exception $e) {
            return [
                'success' => false,
                'error' => $e,
            ];
        }
    }

    public function createAdmin(Request $request)
    {
        try {
            $data = new Admin();
            $data->fill($request->all());
            $data->save();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (exception $e) {
            return [
                'success' => false,
                'error' => $e,
            ];
        }
    }

    public function updateAdmin(Request $request, $id)
    {
        $data = Admin::where('id', $id)->first();

        $class = Admin::where('id',$id)->first();
      return  $class -> update($request -> all());
        try {
            $data = Admin::where('id', $id)->first();
            $data->update($request->all());
            // $data->save();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (exception $e) {
            return [
                'success' => false,
                'error' => $e,
            ];
        }
    }

    public function deleteAdmin($id)
    {
        try {
            Admin::where('id', $id)->delete();
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e,
            ];
        }
    }
    public function getadminId($id){
        return Admin::where('id', $id)->first();


    }

}