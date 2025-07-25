import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export const createMedication = async (
  medicationName,
  dosage,
  frequency,
  startDate,
  endDate
) => {
  const url = "/medication/create";
  const body = {
    medicationName,
    dosage,
    frequency,
    startDate,
    endDate,
  };

  return await axios
    .post(url, body)
    .then((res) => res)
    .catch((err) => err);
};

export const getMedicationsByUser = async (userId) => {
  const url = `/medication/user/${userId}`;

  return await axios
    .get(url)
    .then((res) => res)
    .catch((err) => err);
};

export const markMedicationAsInactive = async (id) => {
  const url = `/medication/${id}/deactivate`;

  return await axios
    .patch(url)
    .then((res) => res)
    .catch((err) => err);
};
