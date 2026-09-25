import { ConflictException, Injectable } from "@nestjs/common";
import { CreateRoleDTO } from "../dtos/create-role.dto.js";
import { RoleRepository } from "../repositories/RoleRepository.js";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) { }

  async create(roleInputValues: CreateRoleDTO) {
    const roleAlreadyExists = await this.roleRepository.findByName(
      roleInputValues.name,
    );

    if (roleAlreadyExists) {
      throw new ConflictException("Role já cadastrado");
    }

    const role = await this.roleRepository.createRole(roleInputValues);

    return role;
  }
}
