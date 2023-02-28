import dynamoClient from "../driven-adapters/aws/dynamodb";
import { ProductRepository } from "../../domain/repositories/productRepository";
import { ProductAttributes } from "../../domain/entities/product";

import {
  ScanCommand,
  GetCommand,
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

export class ProductRepositoryImplementation implements ProductRepository {
  getByName = async (name: string): Promise<ProductAttributes | null> => {
    const params = {
      TableName: "productos-tienda",
      IndexName: "name-index",
      KeyConditionExpression: "#name = :name",
      ExpressionAttributeValues: {
        ":name": name,
      },
      ExpressionAttributeNames: { "#name": "name" },
    };
    const result = await dynamoClient.send(new QueryCommand(params));
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

  getByCode = async (
    product_code: string
  ): Promise<ProductAttributes | null> => {
    const params = {
      TableName: "productos-tienda",
      IndexName: "product_code-index",
      KeyConditionExpression: "product_code = :product_code",
      ExpressionAttributeValues: {
        ":product_code": product_code,
      },
    };
    const result = await dynamoClient.send(new QueryCommand(params));
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

  getById = async (id: string): Promise<ProductAttributes | null> => {
    const params = {
      TableName: "productos-tienda",
      Key: {
        id_producto: id,
      },
    };
    const result = await dynamoClient.send(new GetCommand(params));
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

  getAll = async (): Promise<ProductAttributes[] | null> => {
    const params = {
      TableName: "productos-tienda",
    };

    const result = await dynamoClient.send(new ScanCommand(params));
    const items = result.Items != null ? result.Items : [];
    const products = items.map((item: any) => {
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

    if (products) return products;
    return null;
  };

  create = async (
    newProduct: ProductAttributes
  ): Promise<ProductAttributes> => {
    const params = {
      TableName: "productos-tienda",
      Item: newProduct,
    };
    await dynamoClient.send(new PutCommand(params));
    return newProduct;
  };
  update = async (product: ProductAttributes, id: string): Promise<void> => {
    const params = {
      TableName: "productos-tienda",
      Key: { id_producto: id },
      UpdateExpression:
        "set product_code = :product_code, description = :description, #name = :name, price = :price, sale_price = :sale_price," +
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
    await dynamoClient.send(new UpdateCommand(params));
  };
  delete = async (id: string): Promise<void> => {
    const params = {
      TableName: "productos-tienda",
      Key: { id_producto: id },
    };
    await dynamoClient.send(new DeleteCommand(params));
  };
}
