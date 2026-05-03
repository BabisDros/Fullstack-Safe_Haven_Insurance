import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInsuranceProductById } from "../services/InsuranceProductService";
import GenericList from "./GenericList";
import GenericFormModal from "./GenericFormModal";
import ConfirmationModal from "./ConfirmationModal";
import {
  createCover,
  updateCover,
  deleteCover,
  typesOfCovers,
} from "../services/CoverService";

const InsuranceProductViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [covers, setCovers] = useState([]);
  const [coverTypes, setCoverTypes] = useState([]);
  const [selectedCover, setSelectedCover] = useState(null);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isConfirmCoverModalOpen, setIsConfirmCoverModalOpen] = useState(false);

  useEffect(() => {
    getInsuranceProductById(id)
      .then((productResponse) => {
        setProduct(productResponse.data);

        if (productResponse.data.covers) {
          setCovers(productResponse.data.covers);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setIsLoading(false);
      });
  }, [id]);

  // get types of covers for the dropdown in the cover form
  useEffect(() => {
    typesOfCovers()
      .then((response) => setCoverTypes(response.data))
      .catch((error) => console.error("Error fetching cover types:", error));
  }, []);

  const handleAddCover = () => {
    setSelectedCover(null);
    setIsCoverModalOpen(true);
  };

  const handleEditCover = (cover) => {
    setSelectedCover(cover);
    setIsCoverModalOpen(true);
  };

  const handleSaveCover = (data) => {
    if (selectedCover) {
      updateCover(selectedCover.id, data)
        .then((response) => {
          console.log("Cover updated:", response.data);
          setCovers((prev) =>
            prev.map((c) => (c.id === selectedCover.id ? response.data : c)),
          );
        })
        .catch((error) => {
          console.error("Error updating cover:", error);
        });
    } else {
      // add product id to the cover data so that the backend knows which product this cover belongs to
      const coverDataWithProductId = {
        ...data,
        insuranceProductId: id,
      };

      createCover(coverDataWithProductId)
        .then((response) => {
          setCovers((prev) => [...prev, response.data]);
          setIsCoverModalOpen(false);
        })
        .catch((error) => console.error("Error creating cover:", error));
    }
    setIsCoverModalOpen(false);
  };

  const handleDeleteCoverClick = (cover) => {
    setSelectedCover(cover);
    setIsConfirmCoverModalOpen(true);
  };

  const handleDeleteCover = () => {
    deleteCover(selectedCover.id)
      .then((response) => {
        console.log("Cover deleted:", response.data);
        setCovers((prev) => prev.filter((c) => c.id !== selectedCover.id));
      })
      .catch((error) => {
        console.error("Error deleting cover: " + selectedCover.id, error);
      });
    setIsConfirmCoverModalOpen(false);
  };

  // caution 'name' to match DTO name
  const coverFormFields = [
    { name: "name", label: "Cover Name", type: "text", required: true },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: coverTypes,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      maxLength: 255,
    },
    {
      name: "limit",
      label: "Coverage Limit",
      type: "number",
      step: "0.01",
      min: "0.01",
      required: true,
    },
  ];

  if (isLoading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="container mt-5 text-center">Product not found.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-light d-flex justify-content-between">
          <h3 className="mb-0">{product.name}</h3>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        <div className="card-body">
          <div className="mb-4">
            <label className="fw-bold">Description</label>
            <div
              className="p-2 bg-light border rounded"
              style={{ minHeight: "80px" }}
            >
              {product.description}
            </div>

            <GenericList
              title="Covers"
              items={covers}
              emptyMessage="No covers found for this product."
              onAddNew={handleAddCover}
              onEdit={handleEditCover}
              onDelete={handleDeleteCoverClick}
              renderItemDetails={(cover) => (
                <div>
                  <h3 className="h6 fw-bold mb-0">{cover.name}</h3>
                  <p>Type: {cover.type}</p>
                  <p>Description: {cover.description}</p>
                  <div>Limit: €{cover.limit}</div>
                </div>
              )}
            />

            {isCoverModalOpen && (
              <GenericFormModal
                //Using prefix in key because covers and products can have the same id.
                key={selectedCover ? `cover-${selectedCover.id}` : "new_cover"}
                show={isCoverModalOpen}
                title={selectedCover ? "Edit Cover" : "Add Cover"}
                initialData={selectedCover}
                fields={coverFormFields}
                onClose={() => setIsCoverModalOpen(false)}
                onSave={handleSaveCover}
                submitText={selectedCover ? "Update Cover" : "Save Cover"}
              />
            )}

            {isConfirmCoverModalOpen && (
              <ConfirmationModal
                show={isConfirmCoverModalOpen}
                onClose={() => setIsConfirmCoverModalOpen(false)}
                onConfirm={handleDeleteCover}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the cover "${selectedCover?.name}"?`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceProductViewPage;
