import { ConflictException, Injectable } from "@nestjs/common";
import { CreateRoleDTO } from "../dtos/create-role.dto";
import { RoleRepository } from "../repositories/RoleRepository";

@Injectable()
export class CreateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) { }

  async execute(roleInputValues: CreateRoleDTO) {
    const roleAlreadyExists = await this.roleRepository.findByName(roleInputValues.name);

    if (roleAlreadyExists) {
      throw new ConflictException("Role já cadastrado");
    }

    const role = await this.roleRepository.createRole(roleInputValues);

    return role;
  }
}