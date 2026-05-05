import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  createInsuranceProduct,
  listInsuranceProducts,
  updateInsuranceProduct,
  deleteInsuranceProduct,
} from "../services/InsuranceProductService";

import GenericFormModal from "./GenericFormModal";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";
import GenericList from "./GenericList";
import { typesOfInsuranceProducts } from "../services/InsuranceProductService";
import { getLabelFromType } from "../utilities/utilities";
const dummyInsuranceProducts = [
  {
    id: 1,
    name: "Mock-Health Insurance ",
    type: "Health",
    description: "Provides coverage for medical expenses.",
    basePremium: 200,
    active: true,
  },
  {
    id: 2,
    name: "Mock-Auto 15",
    type: "AUTO",
    description: "Provides coverage for medical expenses.",
    basePremium: 100,
    active: false,
  },
];

const ListInsuranceProductComponent = () => {
  const useMockData = false; // change to false to use real API data

  const [insuranceProducts, setInsuranceProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productTypes, setProductTypes] = useState([]);

  const navigator = useNavigate();

  //============== Handlers Start=================

  const handleViewDetails = (product) => {
    navigator(`/insurance-products/${product.id}`);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSave = (data) => {
    //if selectedProduct is not null, we are in edit mode, otherwise we are in create mode
    if (selectedProduct) {
      updateInsuranceProduct(selectedProduct.id, data)
        .then((response) => {
          console.log("Product updated:", response.data);

          setInsuranceProducts((prev) =>
            prev.map((p) => (p.id === selectedProduct.id ? response.data : p)),
          );
          setIsProductModalOpen(false);
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          const serverMessage = error.response?.data?.message;
          toast.error(`Failed to update product: ${serverMessage}`);
        });
    } else {
      createInsuranceProduct(data)
        .then((response) => {
          console.log("Product created:", response.data);
          setInsuranceProducts((prev) => [...prev, response.data]);
          setIsProductModalOpen(false);
        })
        .catch((error) => {
          const serverMessage = error.response?.data?.message;
          toast.error(`Failed to create product: ${serverMessage}`);

          console.error("Error creating product:", error);
        });
    }
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsConfirmModalOpen(true);
  };

  const handleDeleteInsuranceProduct = () => {
    deleteInsuranceProduct(selectedProduct.id)
      .then((response) => {
        console.log("Product deleted:", response.data);
        setInsuranceProducts((prev) =>
          prev.filter((p) => p.id !== selectedProduct.id),
        );
      })
      .catch((error) => {
        console.error("Error deleting product: " + selectedProduct.id, error);
        const serverMessage = error.response?.data?.message;
        toast.error(`Failed to delete product: ${serverMessage}`);
      });
    setIsConfirmModalOpen(false);
  };
  //============== Handlers End=================

  //============== useEffect Start=================

  {
    /* https://www.dhiwise.com/post/ultimate-guide-to-using-react-cleartimeout-in-applications */
  }
  useEffect(() => {
    if (useMockData) {
      const timer = setTimeout(() => {
        setInsuranceProducts(dummyInsuranceProducts);
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      listInsuranceProducts()
        .then((response) => {
          setInsuranceProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching insurance products from API:", error);
          const serverMessage = error.response?.data?.message;
          toast.error(`Failed to load insurance products: ${serverMessage}`);
          setLoading(false);
        });
    }
  }, [useMockData]);

  useEffect(() => {
    typesOfInsuranceProducts()
      .then((response) => setProductTypes(response.data))
      .catch((error) => {
        console.error("Error fetching product types:", error);
        const serverMessage = error.response?.data?.message;
        toast.error(`Failed to load product types: ${serverMessage}`);
      });
  }, []);

  //============== useEffect End=================

  //  'name' should match DTO name else getting error.
  const productFormFields = [
    { name: "name", label: "Name", type: "text", required: true },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: productTypes,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      maxLength: 255,
    },
    {
      name: "basePremium",
      label: "Base Premium",
      type: "number",
      step: "0.01",
      min: "0.01",
      required: true,
    },
    {
      name: "active",
      label: "Active Product",
      type: "checkbox",
      defaultValue: true,
    },
  ];

  return (
    <main>
      <GenericList
        title="Insurance Products"
        items={insuranceProducts}
        loading={loading}
        emptyMessage="No products found."
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onViewDetails={handleViewDetails}
        renderItemDetails={(product) => (
          <article>
            <header className="mb-4">
              <h3 className="h6 fw-bold text-uppercase mb-0">{product.name}</h3>
              <p
                className={`h6 fw-bold ${product.active ? "text-success" : "text-danger"}`}
              >
                {product.active ? "Active" : "Inactive"}
              </p>
            </header>
            <dl>
              <dt className="h7"> Type</dt>
              <dd>
                {/* show typ label instead of value. */}
                {getLabelFromType(product.type, productTypes)}
              </dd>
              <dt className="h7">Base Premium</dt>
              <dd>€{product.basePremium.toFixed(2)}</dd>
            </dl>
          </article>
        )}
      />

      {isProductModalOpen && (
        // adding key to resete state. https://react.dev/learn/preserving-and-resetting-state
        <GenericFormModal
          key={
            // Using prefix because covers and products can have the same id .

            selectedProduct ? `product-${selectedProduct.id}` : "new_product"
          }
          show={isProductModalOpen}
          title={
            selectedProduct ? "Edit Insurance Product" : "Add Insurance Product"
          }
          initialData={selectedProduct}
          fields={productFormFields}
          onClose={() => setIsProductModalOpen(false)}
          onSave={handleSave}
          submitText={selectedProduct ? "Update Product" : "Save Product"}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          show={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleDeleteInsuranceProduct}
          title="Confirm Deletion"
          message={`Are you sure you want to delete "${selectedProduct?.name}"?`}
        />
      )}
    </main>
  );
};

export default ListInsuranceProductComponent;
