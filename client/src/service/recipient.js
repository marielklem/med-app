import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export const createCareRecipient = async (name, birthDate) => {

  const url = "/recipients/create";
  return await axios
    .post(url, {
      name: name,
      birthDate: birthDate,
    })
    .then((res) => res)
    .catch((err) => err);

  // try {
  //   const res = await axios.post("/recipients", {
  //     name: name,
  //     birthDate: birthDate,
  //   });
  //   setRecipientId(res.data.id);
  //   setMessage("Care recipient created successfully.");
  // } catch (err) {
  //   console.error(err);
  //   setMessage("Error creating recipient.");
  // }
};


