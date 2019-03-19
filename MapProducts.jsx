import React from "react";
import DisplayProducts from "./DisplayProductsPaginated";

const MapProducts = ({
  products,
  handleEditProductPage,
  handleProductDetailsPage,
  handleCreateDiscount,
  handleEmailModal
}) => {
  const productList = products.map(product => (
    <DisplayProducts
      product={product}
      key={product.productId}
      handleEditProductPage={handleEditProductPage}
      handleProductDetailsPage={handleProductDetailsPage}
      handleCreateDiscount={handleCreateDiscount}
      handleEmailModal={handleEmailModal}
    />
  ));
  return productList;
};

export default React.memo(MapProducts);
