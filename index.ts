import axios, { AxiosResponse } from "axios";
import * as XLSX from "xlsx";
const fs = require("fs");
XLSX.set_fs(fs);

interface Product {
  id: number;
  name: string;
  price: number;
}

const api = axios.create({});

async function fetchProducts(): Promise<Product[]> {
  try {
    const response: AxiosResponse<Product[]> = await api.get(
      "http://localhost:3001/products"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

fetchProducts().then((products) => {
  const worksheet = XLSX.utils.json_to_sheet(products);
  let workBook = XLSX.utils.book_new();
  workBook.Props = {
    Title: "Filmes",
    Subject: "",
    CreatedDate: new Date(),
  };

  XLSX.utils.book_append_sheet(workBook, worksheet, "teste");
  const content = XLSX.write(workBook, {
    type: "buffer",
    bookType: "xlsx",
    bookSST: false,
  });
  fs.writeFileSync("filmes.xlsx", content);
});
