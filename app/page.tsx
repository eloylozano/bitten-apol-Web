  import Featured from "./components/Featured";
  import Header from "./components/Header";
  import { mongooseConnect } from "./lib/mongoose";
  import { Product } from "./models/Product";

  export default async function HomePage() {
    const featuredProductId = '67bf050ec385e58e65f615b4';
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const product = JSON.parse(JSON.stringify(featuredProduct));


    return (
      <div>
        <Header />
        <Featured product={product} />
      </div>
    )
  }
