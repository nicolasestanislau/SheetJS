"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const XLSX = __importStar(require("xlsx"));
const fs = __importStar(require("fs"));
XLSX.set_fs(fs);
const api = axios_1.default.create({});
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield api.get("http://localhost:3001/sales");
            return response.data;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
const getWorksheetArray = function (products) {
    return __awaiter(this, void 0, void 0, function* () {
        const worksheetData = [];
        const lineHeader = ["Quantidade", "Capa", "Titulo", "Preço"];
        worksheetData.push(lineHeader);
        /*   for (const product of products) {
          if (typeof product === "object" && product.hasOwnProperty("quantity")) {
            //const quantity = product.quantity;
            console.log("Quantity:", product);
          }
        } */
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
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield fetchProducts();
            const workBook = XLSX.utils.book_new();
            workBook.Props = {
                Title: "venda",
                Subject: "",
                CreatedDate: new Date(),
            };
            // A partir dos dados em memória resultado do parse,
            // monta um array no formato do SheetJs
            const worksheetArray = yield getWorksheetArray(products);
            // cria aba na planilha
            let workData = XLSX.utils.aoa_to_sheet(worksheetArray);
            XLSX.utils.book_append_sheet(workBook, workData, "venda");
            const content = XLSX.write(workBook, {
                type: "buffer",
                bookType: "xlsx",
                bookSST: false,
            });
            fs.writeFileSync("venda.xlsx", content);
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
