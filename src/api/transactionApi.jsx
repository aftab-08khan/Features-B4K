import axios from "axios";

const API = axios.create({
  baseURL: "https://6a4f5b81f45d5352b6114eb3.mockapi.io/summary/Reports",
});

export const getTransactions = async (page = 1) => {
  const limit = 50;

  const response = await API.get();

  return response.data;
};
