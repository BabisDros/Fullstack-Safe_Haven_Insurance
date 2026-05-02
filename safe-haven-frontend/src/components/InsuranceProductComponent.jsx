import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInsuranceProductById } from "../services/InsuranceProductService";

const InsuranceProductViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInsuranceProductById(id)
      .then((productResponse) => {
        setProduct(productResponse.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setIsLoading(false);
      });
  }, [id]);

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
            back
          </button>
        </div>

        <div className="card-body">
          {/* Description*/}
          <div className="mb-4">
            <label className="fw-bold">Description</label>
            <div
              className="p-2 bg-light border rounded"
              style={{ minHeight: "80px" }}
            >
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceProductViewPage;
