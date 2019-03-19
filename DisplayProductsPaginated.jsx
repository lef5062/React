import React from "react";
import PropTypes from "prop-types";
import styles from "../../../components/products/productDetail/productDetail.module.css";
import Rating from "react-rating";

const DisplayProducts = ({
  product,
  handleEditProductPage,
  handleProductDetailsPage,
  handleCreateDiscount,
  handleEmailModal
}) => {
  const editProductPage = () => {
    handleEditProductPage(product);
  };

  const productDetailsPage = () => {
    handleProductDetailsPage(product);
  };

  const createDiscount = () => {
    handleCreateDiscount(product.id);
  };

  const emailModal = () => {
    handleEmailModal(product.link);
  };

  return (
    <tr key={product.id}>
      <td>
        <div className={`card el-element-overlay ${styles.productImageList}`}>
          <div className={`el-card-item ${styles.noPaddingBottom}`}>
            <div className="el-card-avatar el-overlay-1">
              {" "}
              <img
                className="card-img-top"
                src={product.mainImage}
                alt="Product"
              />
              <div className="el-overlay">
                <ul
                  className={`el-info 
                ${styles.textCapitalize}`}
                >
                  <li className="mb-2">
                    <button
                      type="button"
                      className="btn default btn-outline-light"
                      onClick={editProductPage}
                    >
                      Edit Product
                    </button>
                  </li>
                  <li className="mb-2">
                    <button
                      type="button"
                      className="btn default btn-outline-light"
                      onClick={productDetailsPage}
                    >
                      Product Details
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>
          {" "}
          <button
            type="button"
            className="btn btn-success waves-effect waves-light m-r-10"
            onClick={createDiscount}
          >
            Add Discount
          </button>
        </p>
      </td>
      <td>
        <button className="btn btn-info" onClick={emailModal}>
          Share Product Link
        </button>
      </td>
      <td>
        <h5>{product.quantity}</h5>
      </td>
      <td>
        <h5>${product.currentPrice}</h5>
      </td>
      <td className={styles.productRatingsList}>
        {product.averageRating ? (
          <h4>
            <Rating
              initialRating={product.averageRating / 2}
              readonly
              emptySymbol="far fa-star"
              fullSymbol="fas fa-star"
            />
            ({product.totalReviews})
          </h4>
        ) : (
          <h5>No Ratings</h5>
        )}
      </td>
      <td>{product.isVisible ? <h5>Yes</h5> : <h5>No</h5>}</td>

      <td>{product.isDeleted ? <h5>Yes</h5> : <h5>No</h5>}</td>
    </tr>
  );
};

DisplayProducts.propTypes = {
  product: PropTypes.object,
  handleEditProductPage: PropTypes.func,
  handleProductDetailsPage: PropTypes.func,
  handleCreateDiscount: PropTypes.func,
  handleEmailModal: PropTypes.func
};

export default React.memo(DisplayProducts);
