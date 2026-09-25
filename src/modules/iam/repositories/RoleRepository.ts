import { CreateRoleDTO } from "../dtos/create-role.dto.js";
import { Role } from "../interfaces/Role.js";

export abstract class RoleRepository {
  abstract createRole(roleInputValues: CreateRoleDTO): Promise<Role>;
  abstract findByName(name: string): Promise<Role | null>;
}