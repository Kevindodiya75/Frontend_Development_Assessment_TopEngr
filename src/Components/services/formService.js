const submitFormData = async (formData) => {
  try {
    const response = await fetch(
      "https://test.topengr.com/api/v1/assessment/formdata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to submit the form.");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export default submitFormData;
