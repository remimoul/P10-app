import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Public } from 'src/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @Get()
  getHello(@Res() res: Response) {
    const htmlContent = this.appService.getHello();
    return res.type('text/html').send(htmlContent);
  }
}
