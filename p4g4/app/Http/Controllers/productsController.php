<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class productsController extends Controller
{

    public function getAllProduct()
    {
        try {
            $data = Product::all();
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

    public function getProduct($id)
    {
        try {
            $data = Product::where('id', $id) ->first();
            
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

    public function createProduct(Request $request)
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
                $product = new Product();
                $product->fill($request->all());
                $product->photo = $name;
                $product->save();
                return response()->json(array('status' => 'success', 'message' => 'Image successfully uploaded', 'image' => '/storage/uploads/' . $name));
            } else {
                return response()->json(array('status' => 'error', 'message' => 'failed to upload image'));
            }
        }
    }

    public function updateProduct(Request $request, $id)
    {
        $product = new Product();
        $product = tap(Product::where('id', $id));
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->quantity = $request->input('quantity');
        $product->photo = $request->input('photo');
        $product->cat_id = $request->input('cat_id');
        $product->shop_id = $request->input('shop_id');
        error_log($product->photo);

        if ($request->hasFile('photo')) {
            $uniqueid = uniqid();
            $extension = $request->file('photo')->getClientOriginalExtension();
            $name = $uniqueid . '.' . $extension;
            $path = $request->file('photo')->storeAs('public/uploads', $name);
            if ($path) {
                $product->photo = $name;
                $product->update(['name' => $request->name]);
                $product->update(['description' => $request->description]);
                $product->update(['quantity' => $request->quantity]);
                $product->update(['photo' => $product->photo]);
                $product->update(['cat_id' => $request->cat_id]);
                $product->update(['shop_id' => $request->shop_id]);
                return response()->json(array('status' => 'success', 'message' => 'Image successfully uploaded', 'image' => '/storage/uploads/' . $name));
            } else {
                return response()->json(array('status' => 'error', 'message' => 'failed to upload image'));
            }
        }else{
                $product->update(['name' => $request->name]);
                $product->update(['description' => $request->description]);
                $product->update(['quantity' => $request->quantity]);
                $product->update(['cat_id' => $request->cat_id]);
                $product->update(['shop_id' => $request->shop_id]);
            }
        
    }

    public function deleteProduct($id)
    {
        try {
            Product::where('id', $id)->delete();
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e,
            ];
        }
    }

    public function getByCat(Request $request)
    {
        try {
            $data = Product::where('cat_id', $request->cat_id)
            

                ->where('shop_id', $request->shop_id)

                ->get();
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

    public function getByShop($id)
    {
        try {
            $data = Product::where('shop_id', $id)
                ->get();
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

    public function getShopCat()
    {
        try {
            $data = Product::join('shops', 'shops.id', 'products.shop_id')
                ->join('categories', 'categories.id', 'products.cat_id')
                ->get([
                    'products.*',
                    'categories.type',
                    'shops.name as shop_name',
                    'shops.photo as shop_photo',
                    'shops.phone',
                    'shops.facebook'
                    

                ]);
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

}
