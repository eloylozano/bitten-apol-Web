import Featured from "./components/Featured";
import Header from "./components/Header";
import NewProducts from "./components/NewProducts";
import { mongooseConnect } from "./lib/mongoose";
import { Product } from "./models/Product";

export default async function HomePage() {
  const featuredProductId = "67bf050ec385e58e65f615b4";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  const products = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  const featuredProduct = JSON.parse(JSON.stringify(product));
  const newProducts = JSON.parse(JSON.stringify(products));

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}
