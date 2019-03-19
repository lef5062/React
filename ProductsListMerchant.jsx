import React from "react";
import * as merchantService from "../../../services/merchantService";
import PropTypes from "prop-types";
import "../../../assets/scss/style.css";
import { Input, InputGroup, Button, Form, Modal, ModalBody } from "reactstrap";
import logger from "../../../logger";
import CreateProductsDiscount from "../discounts/CreateProductsDiscount";
import ProductMerchantSendEmail from "../productListByRole/ProductMerchantSendEmail";
import MapProducts from "./MapProducts";
import DisplayNoResults from "./DisplayNoProductResults";

const _logger = logger.extend("ProductsListMerchant");

class ProductsListMerchant extends React.Component {
  state = {
    products: null,
    productComponents: [],
    pageIndex: 0,
    totalPages: 0,
    search: "",
    modal: false,
    emailModal: false,
    prevQuery: null,
    noResultsDisplay: []
  };

  componentDidMount = () => {
    this.loadCurrentPage();
  };

  loadCurrentPage = () => {
    const { pageIndex, search, prevQuery } = this.state;

    if (search) {
      if (search !== prevQuery) {
        this.setState({
          pageIndex: 0,
          prevQuery: search
        });
      }
      merchantService
        .searchAllProducts(pageIndex, 10, search)
        .then(this.onSearchSuccess)
        .catch(this.onGetProductsFail);
    } else {
      merchantService
        .getAllProducts(pageIndex, 10)
        .then(this.onGetAllSuccess)
        .catch(this.onGetProductsFail);
    }
  };

  handleChange = evt => {
    evt.preventDefault();
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({
      [key]: val
    });
  };

  handleKeyDownSearchPress = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    if (evt.charCode === 13) {
      this.handleSearchSubmit();
    }
  };

  handleSearchSubmit = event => {
    const { pageIndex, search } = this.state;
    event.preventDefault();
    if (this.state.search) {
      merchantService
        .searchAllProducts(pageIndex, 10, search)
        .then(this.onSearchSuccess)
        .catch(this.onGetProductsFail);
    } else {
      this.loadCurrentPage();
    }
  };

  handleEditProductPage = product => {
    this.props.history.push(`/merchants/products/${product.id}/edit`);
  };

  handleProductDetailsPage = product => {
    this.props.history.push(`/products/details/${product.id}`);
  };

  handleCreateDiscount = productid => {
    this.setState({ modal: true, productId: productid });
  };

  setDiscountModal = modal => {
    this.setState({ modal });
  };

  handleEmailModal = productLink => {
    this.setState({ emailModal: true, productLink: productLink });
  };

  setEmailModal = bool => {
    this.setState({
      emailModal: bool
    });
  };

  //#region onSuccess & onFail functions

  onGetAllSuccess = data => {
    _logger("Get All Products Success", data);
    const newProductList = (
      <MapProducts
        products={data.items}
        handleEditProductPage={this.handleEditProductPage}
        handleProductDetailsPage={this.handleProductDetailsPage}
        handleCreateDiscount={this.handleCreateDiscount}
        handleEmailModal={this.handleEmailModal}
      />
    );
    this.setState({
      products: data.items,
      productComponents: newProductList,
      totalPages: data.items[0].totalPages
    });
  };

  onGetProductsFail = err => {
    _logger("You have not created any products." + err);

    const noResults = <DisplayNoResults />;

    this.setState({
      products: null,
      noResultsDisplay: noResults
    });
  };

  onGetAllError = error => {
    _logger(
      "Axios error upon the getAllProductsMerchant function in the merchantService",
      error
    );
  };

  onSearchSuccess = data => {
    _logger(`Successful search.`, data);
    const newProductList = (
      <MapProducts
        products={data.items}
        handleEditProductPage={this.handleEditProductPage}
        handleProductDetailsPage={this.handleProductDetailsPage}
        handleCreateDiscount={this.handleCreateDiscount}
        handleEmailModal={this.handleEmailModal}
      />
    );
    this.setState({
      products: data.items,
      productComponents: newProductList,
      pageIndex: 0,
      totalPages: data.items[0].totalPages
    });
  };

  onSearchFail = () => {
    this.setState({
      onError: true
    });
  };

  //#endregion

  //#region pagination handlers

  handleFirstClick = () => {
    if (this.state.pageIndex !== 0) {
      this.setState(
        {
          pageIndex: 0
        },
        this.loadCurrentPage
      );
    }
  };

  handlePrevClick = () => {
    if (this.state.pageIndex > 0) {
      this.setState(
        state => ({
          pageIndex: state.pageIndex - 1
        }),
        this.loadCurrentPage
      );
    }
  };

  handleNextClick = () => {
    if (this.state.pageIndex < this.state.totalPages - 1) {
      this.setState(
        state => ({
          pageIndex: state.pageIndex + 1
        }),
        this.loadCurrentPage
      );
    }
  };

  handleLastClick = () => {
    if (this.state.pageIndex !== this.state.totalPages - 1) {
      this.setState(
        state => ({
          pageIndex: state.totalPages - 1
        }),
        this.loadCurrentPage
      );
    }
  };

  //#endregion

  render() {
    const { productComponents, search } = this.state;
    return (
      <React.Fragment>
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="mb-5">
                <h2 className="card-title">All Products</h2>
                <span className="col-md-auto">
                  <div style={{ float: "left" }} align="center">
                    <button
                      type="button"
                      id="pageFirstButton"
                      className="btn btn-inverse waves-effect waves-light"
                      onClick={this.handleFirstClick}
                    >
                      <span>First</span>
                    </button>
                    <button
                      type="button"
                      id="pageBackwardButton"
                      className="btn btn-success waves-effect waves-light m-r-10"
                      onClick={this.handlePrevClick}
                    >
                      <span>Prev</span>
                    </button>{" "}
                    {this.state.pageIndex + 1}
                    {" of "}
                    {this.state.totalPages}{" "}
                    <button
                      type="button"
                      id="pageForwardButton"
                      className="btn btn-success waves-effect waves-light m-r-10"
                      onClick={this.handleNextClick}
                    >
                      <span>Next</span>
                    </button>
                    <button
                      type="button"
                      id="pageForwardButton"
                      className="btn btn-inverse waves-effect waves-light"
                      onClick={this.handleLastClick}
                    >
                      <span>Last</span>
                    </button>
                  </div>
                  <Form
                    onSubmit={this.handleKeyDownSearchPress}
                    className="col-md-4"
                    style={{ float: "right" }}
                  >
                    <InputGroup>
                      <Input
                        type="text"
                        name="search"
                        value={search}
                        onChange={this.handleChange}
                        placeholder="Search products by Title or Description"
                      />
                      <Button
                        type="submit"
                        color="primary"
                        onClick={this.handleSearchSubmit}
                        onKeyDown={this.handleKeyDownSearchPress}
                      >
                        Search
                      </Button>
                    </InputGroup>
                  </Form>
                </span>
              </div>
              {this.state.products ? (
                <div className="table-responsive">
                  <table className="table stylish-table">
                    <thead>
                      <tr>
                        <th>Main Image</th>
                        <th>Description</th>
                        <th>Sharable Link</th>
                        <th>Quantity</th>
                        <th>Current Price</th>
                        <th>Rating</th>
                        <th>Is Visible?</th>
                        <th>Is Deleted?</th>
                      </tr>
                    </thead>
                    <tbody>{productComponents}</tbody>
                  </table>
                </div>
              ) : (
                this.state.noResultsDisplay
              )}
            </div>
          </div>
          <Modal
            isOpen={this.state.modal}
            modalTransition={{ timeout: 0 }}
            backdropTransition={{ timeout: 0 }}
            fade={true}
          >
            <ModalBody>
              <CreateProductsDiscount
                setModal={this.setDiscountModal}
                productId={this.state.productId}
              />
            </ModalBody>
          </Modal>
          <Modal
            isOpen={this.state.emailModal}
            modalTransition={{ timeout: 0 }}
            backdropTransition={{ timeout: 0 }}
            fade={true}
          >
            <ModalBody>
              <ProductMerchantSendEmail
                setModal={this.setEmailModal}
                productLink={this.state.productLink}
              />
            </ModalBody>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

ProductsListMerchant.propTypes = {
  history: PropTypes.object
};

export default ProductsListMerchant;
