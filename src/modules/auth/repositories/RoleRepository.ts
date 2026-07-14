import { CreateRoleDTO } from "../dtos/create-role.dto";
import { Role } from "../interfaces/Role";

export abstract class RoleRepository {
  abstract createRole(roleInputValues: CreateRoleDTO): Promise<Role>;
  abstract findByName(name: string): Promise<Role | null>;
}