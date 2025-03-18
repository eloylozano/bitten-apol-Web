import styled from "styled-components";
import ProductBox from "./ProductBox";
import { useState } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
}

interface ProductsGridProps {
  products: Product[];
}

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Buscar producto..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <StyledProductsGrid>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductBox images={[]} key={product._id} {...product} />
          ))
        ) : (
          <p>No se encontraron productos</p>
        )}
      </StyledProductsGrid>
    </div>
  );
};

export default ProductsGrid;
