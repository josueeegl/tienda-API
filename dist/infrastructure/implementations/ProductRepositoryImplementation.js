"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepositoryImplementation = void 0;
const dynamodb_1 = __importDefault(require("../driven-adapters/aws/dynamodb"));
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class ProductRepositoryImplementation {
    getByName = async (name) => {
        const params = {
            TableName: "productos-tienda",
            IndexName: "name-index",
            KeyConditionExpression: "#name = :name",
            ExpressionAttributeValues: {
                ":name": name,
            },
            ExpressionAttributeNames: { "#name": "name" },
        };
        const result = await dynamodb_1.default.send(new lib_dynamodb_1.QueryCommand(params));
        const items = result.Items != undefined ? result.Items[0] : {};
        if (items)
            return {
                id_producto: items.id_producto,
                product_code: items.product_code,
                description: items.description,
                name: items.name,
                price: items.price,
                sale_price: items.sale_price,
                discount: items.discount,
                manufacturer: items.manufacturer,
                units: items.units,
                notes: items.notes,
                image_url: items.image_url,
                model: items.model,
            };
        return null;
    };
    getByCode = async (product_code) => {
        const params = {
            TableName: "productos-tienda",
            IndexName: "product_code-index",
            KeyConditionExpression: "product_code = :product_code",
            ExpressionAttributeValues: {
                ":product_code": product_code,
            },
        };
        const result = await dynamodb_1.default.send(new lib_dynamodb_1.QueryCommand(params));
        const items = result.Items != undefined ? result.Items[0] : {};
        if (items)
            return {
                id_producto: items.id_producto,
                product_code: items.product_code,
                description: items.description,
                name: items.name,
                price: items.price,
                sale_price: items.sale_price,
                discount: items.discount,
                manufacturer: items.manufacturer,
                units: items.units,
                notes: items.notes,
                image_url: items.image_url,
                model: items.model,
            };
        return null;
    };
    getById = async (id) => {
        const params = {
            TableName: "productos-tienda",
            Key: {
                id_producto: id,
            },
        };
        const result = await dynamodb_1.default.send(new lib_dynamodb_1.GetCommand(params));
        const item = result.Item;
        if (item != undefined)
            return {
                id_producto: item.id_producto,
                product_code: item.product_code,
                description: item.description,
                name: item.name,
                price: item.price,
                sale_price: item.sale_price,
                discount: item.discount,
                manufacturer: item.manufacturer,
                units: item.units,
                notes: item.notes,
                image_url: item.image_url,
                model: item.model,
            };
        return null;
    };
    getAll = async () => {
        const params = {
            TableName: "productos-tienda",
        };
        const result = await dynamodb_1.default.send(new lib_dynamodb_1.ScanCommand(params));
        const items = result.Items != null ? result.Items : [];
        const products = items.map((item) => {
            return {
                id_producto: item.id_producto,
                product_code: item.product_code,
                description: item.description,
                name: item.name,
                price: item.price,
                sale_price: item.sale_price,
                discount: item.discount,
                manufacturer: item.manufacturer,
                units: item.units,
                notes: item.notes,
                image_url: item.image_url,
                model: item.model,
            };
        });
        if (products)
            return products;
        return null;
    };
    create = async (newProduct) => {
        const params = {
            TableName: "productos-tienda",
            Item: newProduct,
        };
        await dynamodb_1.default.send(new lib_dynamodb_1.PutCommand(params));
        return newProduct;
    };
    update = async (product, id) => {
        const params = {
            TableName: "productos-tienda",
            Key: { id_producto: id },
            UpdateExpression: "set product_code = :product_code, description = :description, #name = :name, price = :price, sale_price = :sale_price," +
                " discount = :discount, manufacturer = :manufacturer, units = :units, notes = :notes, image_url = :image_url, model = :model",
            ExpressionAttributeValues: {
                ":product_code": product.product_code,
                ":description": product.description,
                ":name": product.name,
                ":price": product.price,
                ":sale_price": product.sale_price,
                ":discount": product.discount,
                ":manufacturer": product.manufacturer,
                ":units": product.units,
                ":notes": product.notes,
                ":image_url": product.image_url,
                ":model": product.model,
            },
            ExpressionAttributeNames: { "#name": "name" },
        };
        await dynamodb_1.default.send(new lib_dynamodb_1.UpdateCommand(params));
    };
    delete = async (id) => {
        const params = {
            TableName: "productos-tienda",
            Key: { id_producto: id },
        };
        await dynamodb_1.default.send(new lib_dynamodb_1.DeleteCommand(params));
    };
}
exports.ProductRepositoryImplementation = ProductRepositoryImplementation;
