import axios  from "axios";
export async function productsdata()
{
    const products= await axios.get("https://fakestoreapi.com/products")
    return products
}
