import React, { useState, useEffect } from 'react';
import { listInsuranceProducts } from '../services/InsuranceProductService';

const dummyInsuranceProducts = [
    { 
        id: 1,
        name: "Mock-Health Insurance ",
        description: "Provides coverage for medical expenses.",
        basePremium: 200,
    },
    { 
        id: 2,
        name: "Mock-Health 15",
        description: "Provides coverage for medical expenses.",
        basePremium: 100,
    }
];

const ListInsuranceProductComponent = () => {
    const [insuranceProducts, setInsuranceProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const useMockData = true; 
    
    {/* https://www.dhiwise.com/post/ultimate-guide-to-using-react-cleartimeout-in-applications */ }
    useEffect(() => {
        if (useMockData) {

            const timer = setTimeout(() => {
                setInsuranceProducts(dummyInsuranceProducts);
                setLoading(false);
            }, 1000);
            return () => clearTimeout(timer); 
        } else {
            listInsuranceProducts()
                .then(response => {
                    setInsuranceProducts(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching insurance products from API:", error);
                    setLoading(false);
                });
        }
    }, [useMockData]);

    return (
        <main className="container mt-5">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <h2>Insurance Products</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => console.log("Navigate to create page")}
                >
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
                    {insuranceProducts.map(product => (
                        <li key={product.id} className="border rounded p-3 bg-light">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h3 className="h6 fw-bold mb-0">{product.name}</h3>
                                    <p className="mb-0">{product.description}</p>
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
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`dropdownMenu-${product.id}`}>
                                            <li>
                                                <button className="dropdown-item" onClick={() => console.log("Edit:", product.id)}>
                                                    Edit
                                                </button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item text-danger" onClick={() => console.log("Delete:", product.id)}>
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
        </main>
    );
};

export default ListInsuranceProductComponent;