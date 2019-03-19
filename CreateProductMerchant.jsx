import React from "react";
import { Formik, Form, Field } from "formik";
import { createProductSchema, initialValues } from "./createProductSchema";
import {
  InputGroupAddon,
  Input,
  InputGroup,
  Label,
  CardText,
  Button,
  ButtonGroup
} from "reactstrap";
import FileUpload from "../../fileUpload/FileUpload";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./CreateProductMerchant.css";
import logger from "../../../logger";
const _logger = logger.extend("CreateProductMerchant");

class CreateProductMerchant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: false,
      showDefaultImageModal: false
    };

    this.state.initialValues = initialValues;
  }

  files = () => {
    this.setState({
      files: true
    });
  };

  imageUpload = image => {
    const imageUrl = image[0];
    this.setState({
      imageUrlArray: image,
      imageUrl: imageUrl,
      files: false
    });
  };

  handleSubmit = values => {
    this.props.getMainImageUrl(this.state.imageUrl);
    this.props.onSubmit(values);
  };

  validateForm = res => {
    if (!this.state.imageUrl) {
      this.setState({
        showDefaultImageModal: true,
        imageUrlArray: [
          "https://sabio-s3.s3.us-west-2.amazonaws.com/outlayr/06397d1b-0c0f-4e95-8643-45a046b69711-outlayr.png"
        ],
        imageUrl:
          "https://sabio-s3.s3.us-west-2.amazonaws.com/outlayr/06397d1b-0c0f-4e95-8643-45a046b69711-outlayr.png"
      });
    }

    if (Object.keys(res).length === 0) {
      this.props.nextStep();
    } else {
      _logger("Create Product Merchant:" + res);
    }
  };

  toggleModal = () => {
    this.setState(state => ({
      showDefaultImageModal: !state.showDefaultImageModal
    }));
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12">
            <div className="card card-outline-info">
              <div className="card-header">
                <h4 className="m-b-0 text-white pt-2">Create New Product</h4>
              </div>
              <div className="card-body">
                <Formik
                  validationSchema={createProductSchema}
                  initialValues={initialValues}
                  onSubmit={this.handleSubmit}
                  render={({
                    values,
                    touched,
                    errors,
                    dirty,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    validateForm
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="form-body">
                        <h3 className="card-title">
                          Step 1 of 3 : General Product Info
                        </h3>
                        <hr />
                        <div className="row p-t-20">
                          <div className="form-group col-xs-12 col-md-6">
                            <label htmlFor="createProductMainImage">
                              Main Image (add more images on next page)
                            </label>
                            <button
                              type="button"
                              className="btn btn-success ml-2 mb-3"
                              onClick={this.files}
                            >
                              Add Main Image
                            </button>
                            {this.state.files ? (
                              <FileUpload uploadsReturn={this.imageUpload} />
                            ) : (
                              ""
                            )}
                            {this.state.imageUrlArray ? (
                              // <div className="card">
                              <div className="img-wrap">
                                <img
                                  className="productPicture"
                                  width="100%"
                                  src={this.state.imageUrlArray[0]}
                                  alt="Product"
                                  title={this.state.imageUrlArray[0]}
                                />
                              </div>
                            ) : (
                              // </div>
                              // <div className="card">
                              <div className="img-wrap">
                                <img
                                  className="productPicture"
                                  width="100%"
                                  src="https://sabio-boocamp-api.s3-us-west-2.amazonaws.com/4d914966-764e-4a00-93c6-0ac32abe178a_placeholder-image.jpg"
                                  alt="Product Placeholder"
                                  title="placeholder"
                                />
                              </div>
                              // </div>
                            )}
                          </div>
                          <div className="form-group col-xs-12 col-md-6">
                            <label
                              htmlFor="createProductTitle"
                              className="mt-5"
                            >
                              Title
                            </label>
                            <Field
                              type="text"
                              component="input"
                              className="form-control mb-4"
                              id="createProductTitle"
                              placeholder="Product Title"
                              name="title"
                              value={values.title}
                            />
                            {errors.title && touched.title ? (
                              <div className="messageError">
                                {errors.title}{" "}
                              </div>
                            ) : null}

                            <label htmlFor="createProductQuantity">
                              Quantity
                            </label>
                            <Field
                              type="text"
                              component="input"
                              className="form-control mb-4"
                              id="createProductQuantity"
                              placeholder="Product Quantity"
                              name="quantity"
                              value={values.quantity}
                            />
                            {errors.quantity && touched.quantity ? (
                              <div className="messageError">
                                {errors.quantity}{" "}
                              </div>
                            ) : null}

                            <label htmlFor="createProductSku">SKU</label>
                            <Field
                              type="text"
                              component="input"
                              className="form-control mb-4"
                              id="createProductSku"
                              placeholder="Product SKU"
                              name="sku"
                              value={values.sku}
                            />
                            {errors.sku && touched.sku ? (
                              <div className="messageError">{errors.sku} </div>
                            ) : null}

                            <label
                              htmlFor="createProductCategoryId"
                              className="dropdownBox"
                            >
                              Category
                            </label>
                            <select
                              name="categoryId"
                              id="createProductCategoryId"
                              className=" dropdownBox form-control"
                              value={values.categoryId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="" label="Select a category" />
                              <option value="1" label="Good" />
                              <option value="2" label="Service" />
                            </select>
                            {errors.categoryId && touched.categoryId ? (
                              <div className="messageError">
                                {errors.categoryId}{" "}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="createProductDescription">
                            Description
                          </label>
                          <Field
                            component="textarea"
                            className="form-control"
                            id="createProductDescription"
                            rows="3"
                            placeholder="Add a Description for your Product"
                            name="description"
                            value={values.description}
                          />
                          {errors.description && touched.description ? (
                            <div className="messageError">
                              {errors.description}{" "}
                            </div>
                          ) : null}
                        </div>

                        <div className="row">
                          <div className="form-group col-xs-12 col-md-6">
                            <Label for="createProductBasePrice">
                              Base Price
                            </Label>
                            <InputGroup>
                              <InputGroupAddon addonType="append">
                                $
                              </InputGroupAddon>
                              <Input
                                tag={Field}
                                placeholder="Base Price"
                                name="basePrice"
                                value={values.basePrice}
                                id="createProductBasePrice"
                              />
                            </InputGroup>

                            {errors.basePrice && touched.basePrice ? (
                              <div className="messageError">
                                {errors.basePrice}{" "}
                              </div>
                            ) : null}
                          </div>

                          <div className="form-group col-xs-12 col-md-6">
                            <Label for="createProductCurrentPrice">
                              Current Price
                            </Label>
                            <InputGroup>
                              <InputGroupAddon addonType="append">
                                $
                              </InputGroupAddon>
                              <Input
                                tag={Field}
                                placeholder="Current Price"
                                name="currentPrice"
                                value={values.currentPrice}
                                id="createProductCurrentPrice"
                              />
                            </InputGroup>
                            {errors.currentPrice && touched.currentPrice ? (
                              <div className="messageError">
                                {errors.currentPrice}{" "}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group col-xs-12 col-md-6">
                            <label htmlFor="createProductBaseTax">
                              Base Tax
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              id="createBaseTax"
                              placeholder="Base Tax (Write as a decimal)"
                              name="baseTax"
                              value={values.baseTax}
                            />
                            {errors.baseTax && touched.baseTax ? (
                              <div className="messageError">
                                {errors.baseTax}{" "}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-xs-12 col-md-6">
                            <div className="checkbox checkbox-success">
                              <label
                                className="makeTextLarger"
                                htmlFor="createProductIsVisible"
                              >
                                Product Visible to Public?
                              </label>
                              {"  "}
                              <Field
                                type="checkbox"
                                id="createProductIsVisible"
                                name="isVisible"
                                checked={values.isVisible}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="float-right">
                          <button
                            type="submit"
                            className="btn btn-success waves-effect waves-light m-r-10"
                            onClick={() =>
                              validateForm().then(res => this.validateForm(res))
                            }
                            disabled={!dirty}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.showDefaultImageModal}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal} />
          <ModalBody>
            <CardText className="text-center">
              <strong>
                No product image yet? We will add this one for you in the
                meantime.
              </strong>
            </CardText>

            <div className="text-center">
              <img
                height="40%"
                width="40%"
                src={this.state.imageUrl}
                alt="Product"
              />
            </div>
            <ButtonGroup className="float-right">
              <Button
                type="button"
                className="btn btn-success waves-effect waves-light m-r-10"
                onClick={this.toggleModal}
              >
                Okay!
              </Button>
            </ButtonGroup>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

CreateProductMerchant.propTypes = {
  onSubmit: PropTypes.func,
  getMainImageUrl: PropTypes.func,
  nextStep: PropTypes.func
};

export default CreateProductMerchant;
