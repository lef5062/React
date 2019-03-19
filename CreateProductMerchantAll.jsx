import React from "react";
import StepWizard from "react-step-wizard";
import CreateProductMerchant from "./CreateProductMerchant";
import ProductDimensionsForm from "../dimensions/ProductDimensionsForm";
import ProductImage from "../images/ProductImage";
import * as productService from "../../../services/products/productService";
import * as productImagesService from "../../../services/products/productImagesService";
import * as productDimensionsService from "../../../services/products/productDimensionsService";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import logger from "../../../logger";
const _logger = logger.extend("CreateProductMerchantAll");

class CreateProductMerchantAll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      title: "",
      quantity: "",
      sku: "",
      description: "",
      baseTax: "",
      basePrice: "",
      currentPrice: "",
      categoryId: "",
      mainImage: "",
      imageUrl: "",
      metaTagId: 10,
      isVisible: false,
      isDeleted: false,
      isSuccessOpen: false,
      isErrorOpen: false
    };
  }

  onSuccess = data => {
    _logger("Create Product Merchant All Success: " + data);
    this.setState({ isSuccessOpen: true });
  };

  onError = err => {
    _logger("Create Product Merchant All Error:" + err);
    this.setState({ isErrorOpen: true });
  };

  onSubmit = values => {
    this.setState(values);
  };

  getMainImageUrl = imageUrl => {
    this.setState({
      mainImage: imageUrl
    });
  };

  getMoreImagesArray = imageArray => {
    this.setState({
      imageUrl: imageArray
    });
  };

  onSubmitProductAll = values => {
    this.setState(values);

    const productInputs = {
      basePrice: this.state.basePrice,
      baseTax: this.state.baseTax,
      categoryId: this.state.categoryId,
      currentPrice: this.state.currentPrice,
      description: this.state.description,
      isDeleted: this.state.isDeleted,
      isVisible: this.state.isVisible,
      mainImage: this.state.mainImage,
      metaTagId: 10,
      quantity: this.state.quantity,
      sku: this.state.sku,
      title: this.state.title
    };

    const productImageInputs = {
      imageUrl: this.state.imageUrl
    };

    const productDimensionInputs = {
      height: this.state.height,
      length: this.state.length,
      weight: this.state.weight,
      width: this.state.width,
      metricSystem: this.state.metricSystem
    };

    productService
      .addProduct(productInputs)
      .then(addedProduct => {
        productImageInputs.productId = addedProduct.item;
        productDimensionInputs.productId = addedProduct.item;
        this.setState({
          productId: addedProduct.item
        });

        productDimensionsService
          .addDimensions(productDimensionInputs)
          .then(this.onSuccess)
          .catch(this.onError);

        if (Object.keys(productImageInputs.imageUrl).length > 0) {
          productImagesService
            .addImage(productImageInputs)
            .then(this.onSuccess)
            .catch(this.onError);
        }
      })
      .then(() => {
        this.openSuccess();
      })
      .catch(this.onError);
  };

  openSuccess = () => {
    this.setState({ isSuccessOpen: true });
  };

  openError = () => {
    this.setState({ isErrorOpen: true });
  };

  goToProductDetails = () => {
    const productId = this.state.productId;

    this.props.history.push("/products/details/" + productId);
  };

  cancel = () => {
    this.setState({ isSuccessOpen: false });
    this.setState({ isErrorOpen: false });
  };

  render() {
    return (
      <StepWizard>
        <CreateProductMerchant
          onSubmit={this.onSubmit}
          getMainImageUrl={this.getMainImageUrl}
        />
        <ProductImage
          onSubmit={this.onSubmit}
          getMoreImagesArray={this.getMoreImagesArray}
        />
        <ProductDimensionsForm
          onSubmitProductAll={this.onSubmitProductAll}
          isSuccessOpen={this.state.isSuccessOpen}
          isErrorOpen={this.state.isErrorOpen}
          openSuccess={this.openSuccess}
          openError={this.openError}
          goToProductDetails={this.goToProductDetails}
          cancel={this.cancel}
        />
      </StepWizard>
    );
  }
}

export default withRouter(CreateProductMerchantAll);

CreateProductMerchantAll.propTypes = {
  history: PropTypes.object.isRequired,
  openSuccess: PropTypes.func
};
