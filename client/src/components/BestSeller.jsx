import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext.jsx";

const BestSeller = () => {
  const { products } = useAppContext();

  // To make this a true "Best Sellers" list, we should sort the products.
  // Here, we'll sort by rating in descending order.
  const bestSellers = products
    .filter((product) => product.inStock)
    .sort((a, b) => b.rating - a.rating) // Sort by rating (highest first)
    .slice(0, 5); // Take the top 5

  return (
    <div className="mt-16 w-full">
      <div className="flex flex-col items-center w-max mx-auto">
          <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
          <div className="w-20 h-0.5 bg-indigo-500 rounded-full mt-2"></div>
      </div>

      
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch">
        {bestSellers.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
