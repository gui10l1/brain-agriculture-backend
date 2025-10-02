import { Body, Controller, Post } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import Farmer from './entities/farmer.entity';
import { IFarmerDTO } from './dtos';

@Controller('farmers')
export class FarmersController {
  constructor(private farmersService: FarmersService) {}

  @Post('/')
  public async create(@Body() body: IFarmerDTO): Promise<Farmer> {
    return this.farmersService.create(body);
  }
}
