"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImplementation = void 0;
const dynamodb_1 = __importDefault(require("../driven-adapters/aws/dynamodb"));
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class UserRepositoryImplementation {
    getByUsername = async (username) => {
        const params = {
            TableName: "usuarios_tienda",
            IndexName: "username-index",
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username,
            },
        };
        const result = await dynamodb_1.default.send(new lib_dynamodb_1.QueryCommand(params));
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
    getById = async (id) => {
        const params = {
            TableName: "usuarios_tienda",
            Key: {
                id_user: id,
            },
        };
        const result = await dynamodb_1.default.send(new lib_dynamodb_1.GetCommand(params));
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
    getAll = async () => {
        const params = {
            TableName: "usuarios_tienda",
        };
        const result = await dynamodb_1.default.send(new lib_dynamodb_1.ScanCommand(params));
        const items = result.Items != null ? result.Items : [];
        const users = items.map((item) => {
            return {
                id_user: item.id_user,
                username: item.username,
                name: item.name,
                password: item.password,
                salt: item.salt,
            };
        });
        if (users)
            return users;
        return null;
    };
    create = async (newUser) => {
        const params = {
            TableName: "usuarios_tienda",
            Item: newUser,
        };
        await dynamodb_1.default.send(new lib_dynamodb_1.PutCommand(params));
        return newUser;
    };
    update = async (user, id) => {
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
        await dynamodb_1.default.send(new lib_dynamodb_1.UpdateCommand(params));
    };
    delete = async (id) => {
        const params = {
            TableName: "usuarios_tienda",
            Key: {
                id_user: id,
            },
        };
        await dynamodb_1.default.send(new lib_dynamodb_1.DeleteCommand(params));
    };
}
exports.UserRepositoryImplementation = UserRepositoryImplementation;
