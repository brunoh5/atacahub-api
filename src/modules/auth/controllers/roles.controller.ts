import { Body, Controller, Post } from "@nestjs/common";
import { CreateRoleDTO } from "../dtos/create-role.dto";
import { CreateRoleUseCase } from "../use-cases/create-role-use-case";

@Controller("/roles")
export class RolesController {
  constructor(private createRoleUseCase: CreateRoleUseCase) { }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDTO) {
    const role = await this.createRoleUseCase.execute(createRoleDto);

    return { role };
  }
}
