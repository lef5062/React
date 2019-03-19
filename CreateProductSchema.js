import * as yup from "yup";

const initialValues = {
  title: "",
  quantity: "",
  sku: "",
  description: "",
  baseTax: "",
  basePrice: "",
  currentPrice: "",
  categoryId: "",
  metaTagId: "",
  isVisible: false
};

const createProductSchema = yup.object().shape({
  title: yup
    .string()
    .min(1)
    .max(50, "Maximum of 50 characters allowed for product title.")
    .required("Product Title is required."),
  quantity: yup
    .number("Please enter a number.")
    .min(0)
    .required("Product Quantity is required."),
  sku: yup.string(),
  description: yup
    .string()
    .min(1)
    .max(500, "Maximum of 500 characters allowed for product description.")
    .required("Product Description is required."),
  baseTax: yup
    .number("Please enter a decimal number for base tax.")
    .min(0)
    .max(1, "Please enter a decimal number for base tax.")
    .required("Product Base Tax is required."),
  basePrice: yup
    .number("Please enter a number for base price.")
    .min(0)
    .max(99999999)
    .required("Product Base Price is required."),
  currentPrice: yup
    .number("Please enter a number for base price.")
    .min(0)
    .max(99999999)
    .required("Product Current Price is required."),
  categoryId: yup
    .number("Please enter a number for category ID.")
    .min(1)
    .required("Product Category Id is required."),
  metaTagId: yup.number("Please enter a number for Meta Tag ID.").min(1),
  isVisible: yup.boolean()
});

export { createProductSchema, initialValues };
