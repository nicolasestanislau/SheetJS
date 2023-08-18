import axios, { AxiosResponse } from "axios";
import * as XLSX from "xlsx";
import * as fs from "fs";

XLSX.set_fs(fs);

interface Product {
  title: string;
  price: number;
}

const api = axios.create({});

async function fetchProducts(): Promise<Product[]> {
  try {
    const response: AxiosResponse<Product[]> = await api.get(
      "http://localhost:3001/sales"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
const getWorksheetArray = async function (
  products: Product[]
): Promise<any[][]> {
  const worksheetData: any[][] = [];

  const lineHeader = ["Quantidade", "Capa", "Titulo", "Preço"];
  worksheetData.push(lineHeader);

  const repeatedQuantities = products
    .map((item) => {
      console.log("products: ", products);
      if (typeof products === "object" && products.hasOwnProperty("quantity")) {
        console.log("products ", products);
        // console.log("product ", product);
        /*     const quantity = product.quantity;
      const productTitle = product.product.title; // Pode ser útil para mostrar o título do produto
      for (let i = 0; i < quantity; i++) {
        console.log("Quantity:", quantity, "Product:", productTitle);
      } */
      }
      return [];
    })
    .flat();

  return worksheetData;
};

async function main() {
  try {
    const products = await fetchProducts();
    const workBook = XLSX.utils.book_new();
    workBook.Props = {
      Title: "venda",
      Subject: "",
      CreatedDate: new Date(),
    };

    // A partir dos dados em memória resultado do parse,
    // monta um array no formato do SheetJs
    const worksheetArray = await getWorksheetArray(products);

    // cria aba na planilha
    let workData = XLSX.utils.aoa_to_sheet(worksheetArray);

    XLSX.utils.book_append_sheet(workBook, workData, "venda");
    const content = XLSX.write(workBook, {
      type: "buffer",
      bookType: "xlsx",
      bookSST: false,
    });
    fs.writeFileSync("venda.xlsx", content);
  } catch (error) {
    console.error(error);
  }
}

main();
