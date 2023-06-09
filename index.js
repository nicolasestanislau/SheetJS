"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var XLSX = require("xlsx");
var fs = require("fs");
XLSX.set_fs(fs);
var api = axios_1.default.create({});
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api.get("http://localhost:3001/products")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var getWorksheetArray = function (products) {
    return __awaiter(this, void 0, void 0, function () {
        var worksheetData, lineHeader, _i, products_1, product, lineData;
        return __generator(this, function (_a) {
            worksheetData = [];
            lineHeader = ["Titulo", "Preço"];
            worksheetData.push(lineHeader);
            for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                product = products_1[_i];
                lineData = [product.title, product.price.toString()];
                worksheetData.push(lineData);
            }
            return [2 /*return*/, worksheetData];
        });
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var products, workBook, worksheetArray, workData, content, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetchProducts()];
                case 1:
                    products = _a.sent();
                    workBook = XLSX.utils.book_new();
                    workBook.Props = {
                        Title: "Filmes",
                        Subject: "",
                        CreatedDate: new Date(),
                    };
                    return [4 /*yield*/, getWorksheetArray(products)];
                case 2:
                    worksheetArray = _a.sent();
                    workData = XLSX.utils.aoa_to_sheet(worksheetArray);
                    XLSX.utils.book_append_sheet(workBook, workData, "filmes");
                    content = XLSX.write(workBook, {
                        type: "buffer",
                        bookType: "xlsx",
                        bookSST: false,
                    });
                    fs.writeFileSync("filmes.xlsx", content);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main();
