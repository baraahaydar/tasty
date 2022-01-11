<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Shop;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class shopsController extends Controller
{
public function getPhone(){
    return Shop::all();
}
    public function getAllShop()
    {
        try {
            $data = Shop::all();
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

    public function getShop($id)
    {

        try {
            $data= Shop::where('id', $id)->get();

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

    public function createShop(Request $request)
    {
        $validation = Validator::make(
            $request->all(), ['photo' => 'required|mimes:jpeg,jpg,png,gif|max:10000']
        );

        if ($validation->fails()) {
            $response = array('status' => 'error', 'errors' => $validation->errors()->toArray());
            return response()->json($response);
        }

        if ($request->hasFile('photo')) {
            $uniqueid = uniqid();
            $extension = $request->file('photo')->getClientOriginalExtension();
            $name = $uniqueid . '.' . $extension;
            $path = $request->file('photo')->storeAs('public/uploads', $name);
            if ($path) {
                $shop = new Shop();
                $shop->fill($request->all());
                $shop->photo = $name;
                $shop->save();
                return response()->json(array('status' => 'success', 'message' => 'Image successfully uploaded', 'image' => '/storage/uploads/' . $name));
            } else {
                return response()->json(array('status' => 'error', 'message' => 'failed to upload image'));
            }
        }
    }

    public function updateShop(Request $request, $id)
    {
        $shop = new Shop();
        $shop = tap(Shop::where('id', $id));
        $shop->name = $request->input('name');
        $shop->photo = $request->input('photo');
        $shop->location = $request->input('location');

        error_log($shop->photo);
        //Storage::delete('public/uploads/60dbf5f50fd63.png');
        if ($request->hasFile('photo')) {
            $uniqueid = uniqid();
            $extension = $request->file('photo')->getClientOriginalExtension();
            $name = $uniqueid . '.' . $extension;
            $path = $request->file('photo')->storeAs('public/uploads', $name);

            if ($path) {
                $shop->photo = $name;
                $shop->update(['name' => $request->name]);
                $shop->update(['photo' => $shop->photo]);
                $shop->update(['location' => $request->location]);
                $shop->update(['phone' => $request->phone]);
                $shop->update(['facebook' => $request->facebook]);
                return response()->json(array('status' => 'success', 'message' => 'Image successfully uploaded', 'image' => '/storage/uploads/' . $name));
            } else {
                return response()->json(array('status' => 'error', 'message' => 'failed to upload image'));
            }
        }
    }

    public function deleteShop($id)
    {
        try {
            Shop::where('id', $id)->delete();
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e,
            ];
        }
    }


}
