import { assets } from "../assets/assets";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems } = useAppContext();

  if (!product) {
    return null;
  }

  return (
    
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full bg-white">
      {/* --- Image Section --- */}
      <Link to={`/product/${product._id}`} onClick={() => scrollTo(0, 0)} className="block">
        <div className="w-full h-48 overflow-hidden flex items-center justify-center p-2 group">
          <img
            src={product.image[0]}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-xs text-gray-500 capitalize">{product.category}</p>
          <Link to={`/product/${product._id}`} onClick={() => scrollTo(0, 0)} className="block">
            <h3 className="font-semibold text-base text-gray-800 hover:text-indigo-600 mt-1 truncate" title={product.name}>
                {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill(0).map((_, i) => (
                <img
                    key={i}
                    src={i < product.rating ? assets.star_icon : assets.star_dull_icon}
                    alt="rating star"
                    className="w-3.5"
                />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>
        </div>

        {/* --- Price and Actions Section --- */}
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-indigo-500">${product.offerPrice}</p>
            <span className="text-sm text-gray-500 line-through">${product.price}</span>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            {!cartItems?.[product?._id] ? (
              <button
                onClick={() => addToCart(product?._id)}
                className="flex items-center justify-center gap-1.5 bg-indigo-100 border border-indigo-200 w-24 h-9 rounded-md text-indigo-600 font-semibold text-sm cursor-pointer hover:bg-indigo-200 transition-colors"
              >
                <img src={assets.cart_icon} alt="cart icon" className="w-4"/>
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-1 w-24 h-9 bg-indigo-500 text-white rounded-md select-none">
                <button
                  onClick={() => removeFromCart(product?._id)}
                  className="cursor-pointer text-lg w-8 h-full flex items-center justify-center hover:bg-indigo-600 rounded-l-md"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {cartItems[product?._id]}
                </span>
                <button
                  onClick={() => addToCart(product?._id)}
                  className="cursor-pointer text-lg w-8 h-full flex items-center justify-center hover:bg-indigo-600 rounded-r-md"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
