import { Controller, Get, Param, Query, BadRequestException } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("users")
  users(@Query() params: any): any {
    console.log(params)
    const permitidos = ['limit', 'offset'];
    for (const query in params) {
      if (!permitidos.includes(query)) {
        return 'No se permite el parametro';
      }
    }
    return [];
  }
}

