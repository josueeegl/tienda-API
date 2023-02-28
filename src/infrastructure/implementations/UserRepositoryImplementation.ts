import dynamoClient from "../driven-adapters/aws/dynamodb";
import { UserRepository } from "../../domain/repositories/userRepository";
import { UserAttributes } from "../../domain/entities/user";
import {
  ScanCommand,
  GetCommand,
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

export class UserRepositoryImplementation implements UserRepository {
  getByUsername = async (username: string): Promise<UserAttributes | null> => {
    const params = {
      TableName: "usuarios_tienda",
      IndexName: "username-index",
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username,
      },
    };
    const result = await dynamoClient.send(new QueryCommand(params));
    const items = result.Items != undefined ? result.Items[0] : null;
    if (items)
      return {
        id_user: items.id_user,
        username: items.username,
        name: items.name,
        password: items.password,
        salt: items.salt,
      };
    return null;
  };

  getById = async (id: string): Promise<UserAttributes | null> => {
    const params = {
      TableName: "usuarios_tienda",
      Key: {
        id_user: id,
      },
    };
    const result = await dynamoClient.send(new GetCommand(params));
    const item = result.Item;
    if (item != undefined)
      return {
        id_user: item.id_user,
        username: item.username,
        name: item.name,
        password: item.password,
        salt: item.salt,
      };
    return null;
  };

  getAll = async (): Promise<UserAttributes[] | null> => {
    const params = {
      TableName: "usuarios_tienda",
    };

    const result = await dynamoClient.send(new ScanCommand(params));
    const items = result.Items != null ? result.Items : [];
    const users = items.map((item: any) => {
      return {
        id_user: item.id_user,
        username: item.username,
        name: item.name,
        password: item.password,
        salt: item.salt,
      };
    });

    if (users) return users;
    return null;
  };

  create = async (newUser: UserAttributes): Promise<UserAttributes> => {
    const params = {
      TableName: "usuarios_tienda",
      Item: newUser,
    };
    await dynamoClient.send(new PutCommand(params));
    return newUser;
  };
  update = async (user: UserAttributes, id: string): Promise<void> => {
    const params = {
      TableName: "usuarios_tienda",
      Key: { id_user: id },
      UpdateExpression: "set username = :username, #name = :name",
      ExpressionAttributeValues: {
        ":username": user.username,
        ":name": user.name,
      },
      ExpressionAttributeNames: { "#name": "name" },
    };
    await dynamoClient.send(new UpdateCommand(params));
  };
  delete = async (id: string): Promise<void> => {
    const params = {
      TableName: "usuarios_tienda",
      Key: {
        id_user: id,
      },
    };
    await dynamoClient.send(new DeleteCommand(params));
  };
}
