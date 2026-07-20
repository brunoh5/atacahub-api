import { Body, Controller, Post } from "@nestjs/common";
import { CreateRoleDTO } from "../dtos/create-role.dto";
import { RoleService } from "../services/role.service";

@Controller("/roles")
export class RolesController {
  constructor(private roleService: RoleService) { }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDTO) {
    const role = await this.roleService.create(createRoleDto);

    return { role };
  }
}
