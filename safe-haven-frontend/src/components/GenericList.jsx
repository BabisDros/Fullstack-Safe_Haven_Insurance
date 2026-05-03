import React from "react";

const GenericList = ({
  title,
  items,
  loading,
  emptyMessage,
  onAddNew,
  onViewDetails,
  onEdit,
  onDelete,
  renderItemDetails, // custmom render function for item details
}) => {
  return (
    <div className="container mt-5">
      <header className="d-flex justify-content-between mb-4">
        <h2>{title}</h2>
        {onAddNew && (
          <button className="btn btn-primary" onClick={onAddNew}>
            + Add New
          </button>
        )}
      </header>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : items.length > 0 ? (
        <ul className="list-unstyled d-grid gap-2">
          {items.map((item) => (
            <li key={item.id} className="border rounded p-3 bg-light">
              <div className="d-flex justify-content-between align-items-center">
                {/* display the details of each item */}
                {renderItemDetails(item)}

                <div className="d-flex align-items-center">
                  <div className="dropdown ms-3">
                    <button
                      className="btn btn-secondary btn-sm dropdown-toggle"
                      type="button"
                      id={`dropdownMenu-${item.id}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Options
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby={`dropdownMenu-${item.id}`}
                    >
                      {onViewDetails && (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => onViewDetails(item)}
                          >
                            View Details
                          </button>
                        </li>
                      )}
                      {onEdit && (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => onEdit(item)}
                          >
                            Edit
                          </button>
                        </li>
                      )}
                      {onDelete && (
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => onDelete(item)}
                          >
                            Delete
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default GenericList;
