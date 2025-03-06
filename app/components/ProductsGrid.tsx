import styled from "styled-components";
import ProductBox from "./ProductBox";

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

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
    return (
        <StyledProductsGrid>
            {products?.length > 0 &&
                products.map((product) => (
                    <ProductBox images={[]} key={product._id} {...product} />
                ))}
        </StyledProductsGrid>
    );
};

export default ProductsGrid;
