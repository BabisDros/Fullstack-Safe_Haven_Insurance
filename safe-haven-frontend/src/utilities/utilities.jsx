// Utility function to get the label of a product type based on its value
export const getLabelFromType = (typeValue, typesArray) => {
  const found = typesArray.find((t) => t.value === typeValue);

  if (found) {
    return found.label;
  }

  return "not set";
};
