<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class ProductController extends Controller
{
    function addProduct(Request $request)
    {
        $product = new Product();
        $product->name= $request->input('name');
        $product->price= $request->input('price');
        $product->description= $request->input('description');
        $product->file_path = $request->file('file')->store('products');
        $product->save();
        return $product;
    }
    function getProduct()
    {
        $products = Product::all();
        return $products;

    }

    function deleteProduct($id)
    {
        $result = Product::where('id',$id)->delete();
        if($result)
        {
            return ["result"=> "Product has been deleted"];
        }

    }

    function getOneProduct($id)
    {
        $product =  Product::where("id", $id)->first();
        if($product)
        {
            return $product;
        }
        else{
            return ["result"=> "Product not found"];
        }
    }
    function updateProduct($id,Request $request)
    {
        $product = Product::find($id);
        $product->name= $request->input('name');
        $product->price= $request->input('price');
        $product->description= $request->input('description');
        if($request->file('file')){
            $product->file_path = $request->file('file')->store('products');
        }

        $product->save();
        return $product;
    }

    function searchProduct($key)
    {

        return Product::where("name", "LIKE", "%$key%")->get();
    }
}
