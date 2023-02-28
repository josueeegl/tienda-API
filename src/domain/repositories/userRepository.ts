import { UserAttributes } from "../entities/user";

export interface UserRepository {
  getByUsername: (username: string) => Promise<UserAttributes | null>;
  getById: (id: string) => Promise<UserAttributes | null>;
  getAll: () => Promise<UserAttributes[] | null>;
  create: (user: UserAttributes) => Promise<UserAttributes>;
  update: (user: UserAttributes, id: string) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
