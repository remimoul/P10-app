import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @Get()
  @ApiExcludeEndpoint() // Permet de exclure cette route de la documentation Swagger
  getHello(@Res() res: Response) {
    const htmlContent = this.appService.getHello();
    return res.type('text/html').send(htmlContent);
  }
}
