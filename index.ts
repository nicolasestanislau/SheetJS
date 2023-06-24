import axios, { AxiosResponse } from "axios";
import * as XLSX from "xlsx";
const fs = require("fs");
XLSX.set_fs(fs);

interface Product {
  title: string;
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
const getWorksheetArray = async function (products: Product[]) {
  const worksheetData = [];

  const lineHeader = ["Titulo", "Preço"];
  worksheetData.push(lineHeader);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const lineData = [product.title, product.price.toString()];
    worksheetData.push(lineData);
  }

  return worksheetData;
};

async function main() {
  fetchProducts().then(async (products) => {
    let workBook = XLSX.utils.book_new();
    workBook.Props = {
      Title: "Filmes",
      Subject: "",
      CreatedDate: new Date(),
    };
    const worksheetArray = await getWorksheetArray(products);

    // cria aba na planilha
    let workData = XLSX.utils.aoa_to_sheet(worksheetArray);

    XLSX.utils.book_append_sheet(workBook, workData, "filmes");
    const content = XLSX.write(workBook, {
      type: "buffer",
      bookType: "xlsx",
      bookSST: false,
    });
    fs.writeFileSync("filmes.xlsx", content);
  });
  // A partir dos dados em memória resultado do parse,
  // monta um array no formato do SheetJs
}

main();
