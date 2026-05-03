import React, { useState } from "react";

const GenericFormModal = ({
  show,
  title,
  initialData,
  fields,
  onClose,
  onSave,
  submitText = "Save",
}) => {
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return initialData;
    }

    const initialState = {};
    fields.forEach((field) => {
      // assign default value for checkboxes, empty string for others
      initialState[field.name] =
        field.type === "checkbox" ? (field.defaultValue ?? true) : "";
    });
    return initialState;
  });

  //============== Handlers Start=================
  const handleChange = (name, value, type) => {
    let parsedValue = value;

    if (type === "number" && value !== "") {
      parsedValue = parseFloat(value);
    }
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  //============== Handlers End=================

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div
        className="modal show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {fields.map((field) => {
                  // Checkbox field
                  if (field.type === "checkbox") {
                    return (
                      <div className="form-check mb-3" key={field.name}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`${field.name}Input`}
                          checked={formData[field.name] || false}
                          onChange={(e) =>
                            handleChange(
                              field.name,
                              e.target.checked,
                              field.type,
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`${field.name}Input`}
                        >
                          {field.label}
                        </label>
                      </div>
                    );
                  }

                  // Text, Number, Select, Textarea fields
                  return (
                    <div className="mb-3" key={field.name}>
                      <label
                        htmlFor={`${field.name}Input`}
                        className="form-label"
                      >
                        {field.label}
                      </label>

                      {field.type === "select" ? (
                        <select
                          id={`${field.name}Input`}
                          className="form-select"
                          value={formData[field.name] ?? ""}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value, field.type)
                          }
                          required={field.required}
                        >
                          <option value="">-- Choose --</option>
                          {field.options &&
                            field.options.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                        </select>
                      ) : field.type === "textarea" ? (
                        <>
                          <textarea
                            id={`${field.name}Input`}
                            className="form-control"
                            rows="3"
                            value={formData[field.name] ?? ""}
                            onChange={(e) =>
                              handleChange(
                                field.name,
                                e.target.value,
                                field.type,
                              )
                            }
                            maxLength={field.maxLength}
                            required={field.required}
                          ></textarea>
                          {field.maxLength && (
                            <div className="form-text text-end">
                              {(formData[field.name] || "").length} /
                              {field.maxLength} characters
                            </div>
                          )}
                        </>
                      ) : (
                        <input
                          type={field.type}
                          id={`${field.name}Input`}
                          className="form-control"
                          step={field.step}
                          min={field.min}
                          value={formData[field.name] ?? ""}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value, field.type)
                          }
                          required={field.required}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {submitText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenericFormModal;
