import React, { useState, useEffect } from "react";
import { typesOfInsuranceProducts } from "../services/InsuranceProductService";

const InsuranceProductModal = ({ show, handleClose, product, onSave }) => {
  const [name, setProductName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(product?.type || "");
  const [basePremium, setBasePremium] = useState(product?.basePremium || "");
  const [active, setActive] = useState(product?.active ?? true);

  useEffect(() => {
    typesOfInsuranceProducts()
      .then((response) => setProductTypes(response.data))
      .catch((error) => console.error("Error fetching types:", error));
  }, []);

  //must be the same names as DTO in the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name,
      type: selectedType,
      description,
      basePremium: parseFloat(basePremium),
      active,
    };
    onSave(productData);
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div
        className="modal show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                {product ? "Edit Insurance Product" : "Add Insurance Product"}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="productNameInput" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productNameInput"
                    className="form-control"
                    value={name}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="productTypeSelect" className="form-label">
                    Product Type
                  </label>
                  <select
                    id="productTypeSelect"
                    className="form-select"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Type --</option>
                    {productTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="descriptionInput" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="descriptionInput"
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={255}
                  ></textarea>
                  <div className="form-text text-end">
                    {description.length} / 255 characters
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="basePremiumInput" className="form-label">
                    Base Premium
                  </label>
                  <input
                    type="number"
                    id="basePremiumInput"
                    className="form-control"
                    step="0.01"
                    min="1"
                    value={basePremium}
                    onChange={(e) => setBasePremium(e.target.value)}
                    required
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="activeCheck"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="activeCheck">
                    Active Product
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {product ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsuranceProductModal;
