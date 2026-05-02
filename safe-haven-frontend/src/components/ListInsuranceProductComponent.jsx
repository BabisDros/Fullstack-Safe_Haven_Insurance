import React, { useState, useEffect } from "react";
import {
  createInsuranceProduct,
  listInsuranceProducts,
  updateInsuranceProduct,
  deleteInsuranceProduct,
} from "../services/InsuranceProductService";

import InsuranceProductModal from "./InsuranceProductModal";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";

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
  const [insuranceProducts, setInsuranceProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const navigator = useNavigate();

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
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    } else {
      createInsuranceProduct(data)
        .then((response) => {
          console.log("Product created:", response.data);
          setInsuranceProducts((prev) => [...prev, response.data]);
        })
        .catch((error) => {
          console.error("Error creating product:", error);
        });
    }
    setIsProductModalOpen(false);
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
      });
    setIsConfirmModalOpen(false);
  };

  const useMockData = false;

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
          setLoading(false);
        });
    }
  }, [useMockData]);

  return (
    <main className="container mt-5">
      <header className="d-flex justify-content-between mb-4">
        <h2>Insurance Products</h2>
        <button className="btn btn-primary" onClick={handleAddNew}>
          + Add New
        </button>
      </header>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : insuranceProducts.length > 0 ? (
        <ul className="list-unstyled d-grid gap-2">
          {insuranceProducts.map((product) => (
            <li key={product.id} className="border rounded p-3 bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 fw-bold mb-0">{product.name}</h3>
                  <p
                    className={`mb-0 ${product.active ? "text-success" : "text-danger"}`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </p>
                </div>

                <div className="d-flex align-items-center">
                  <data className="fw-bold me-3" value={product.basePremium}>
                    ${product.basePremium}
                  </data>

                  <div className="dropdown">
                    <button
                      className="btn btn-secondary btn-sm dropdown-toggle"
                      type="button"
                      id={`dropdownMenu-${product.id}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Options
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby={`dropdownMenu-${product.id}`}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleViewDetails(product)}
                        >
                          View Details
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDeleteClick(product)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          No insurance products found. Click "+ Add New" to create one.
        </div>
      )}
      {isProductModalOpen && (
        <InsuranceProductModal
          // creat new modal key to reset state. https://react.dev/learn/preserving-and-resetting-state
          key={selectedProduct ? selectedProduct.id : "new_product"}
          show={isProductModalOpen}
          handleClose={() => setIsProductModalOpen(false)}
          product={selectedProduct}
          onSave={handleSave}
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
