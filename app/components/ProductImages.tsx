import styled from "styled-components";
import { useState } from "react";

// Definir tipos para las props
interface ProductImagesProps {
  images: string[];
}

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  object-fit: contain; 
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

interface ImageButtonProps {
  $active: boolean; // Usar un prefijo como `$` para evitar pasar el atributo al DOM
}

const ImageButton = styled.div<ImageButtonProps>`
  border: 2px solid ${props => (props.$active ? "#ccc" : "transparent")};
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
  height: 300px; 
`;

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState<string>(images?.[0] || "");

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="Active product" />
      </BigImageWrapper>
      <ImageButtons>
        {images.map(image => (
          <ImageButton
            key={image}
            $active={image === activeImage} // Usar `$active` en lugar de `active`
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt={`Thumbnail of ${image}`} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
};

export default ProductImages;