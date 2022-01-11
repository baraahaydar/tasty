<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Exception;
use Illuminate\Http\Request;

class categoriesController extends Controller
{

    public function getAllCategory()
    {
        try {
            $data = Category::all();
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

    public function getCategory($id)
    {
        try {
            $data = Category::where('id', $id)
                ->first();
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

    public function createCategory(Request $request)
    {
        try {
            $data = new Category();
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

    public function updateCategory(Request $request, $id)
    {
        try {
            $data = Category::where('id', $id)->first();
            $data->update($request->all());
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

    public function deleteCategory($id)
    {
        try {
            Category::where('id', $id)->delete();
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e,
            ];
        }
    }

}
