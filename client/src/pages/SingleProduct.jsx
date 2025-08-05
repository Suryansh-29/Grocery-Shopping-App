import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Find the current product based on the URL parameter 'id'
  const product = products.find((p) => p._id === id);

  // Effect to find and set related products
  useEffect(() => {
    if (product && products.length > 0) {
      const filteredProducts = products
        // Find products in the same category
        .filter((p) => p.category === product.category && p._id !== product._id)
        // Limit the result to 4 related products
        .slice(0, 4);
      setRelatedProducts(filteredProducts);
    }
  }, [id, product, products]); // Re-run when the main product or product list changes

  // Effect to set the initial thumbnail image
  useEffect(() => {
    if (product?.image) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  // Render nothing if the product is not found yet
  if (!product) {
    return null; // Or a loading spinner
  }

  return (
    <div className="mt-16">
      <p className="text-gray-600">
        <Link to="/" className="hover:text-indigo-500">Home</Link> /
        <Link to={"/products"} className="hover:text-indigo-500"> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-indigo-500 capitalize">
          {" "}{product.category}
        </Link> /
        <span className="text-indigo-500 font-medium"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Image Gallery */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className={`border max-w-24 rounded overflow-hidden cursor-pointer ${thumbnail === image ? 'border-indigo-500' : 'border-gray-500/30'}`}
              >
                <img src={`http://localhost:5000/images/${image}`} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="border border-gray-500/30 max-w-lg rounded overflow-hidden">
            <img src={`http://localhost:5000/images/${thumbnail}`} alt="Selected product" />
          </div>
        </div>

        {/* Product Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill().map((_, i) => (
                <img
                    key={i}
                    src={i < product.rating ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                    className="w-4"
                />
            ))}
            <p className="text-base ml-2 text-gray-500">({product.rating})</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">MRP: ${product.price}</p>
            <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70 space-y-1">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 font-medium border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
                scrollTo(0, 0);
              }}
              className="w-full py-3.5 font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition rounded"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-2xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-indigo-500 rounded-full mt-2"></div>
        </div>

        {/* --- CHANGE HERE --- */}
        {/* Use 'items-stretch' to make all cards in a row equal height */}
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {relatedProducts
              .filter((p) => p.inStock)
              .map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
            ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="w-full md:w-1/2 lg:w-1/3 my-8 py-3 font-medium bg-gray-800 text-white hover:bg-gray-900 transition rounded"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;