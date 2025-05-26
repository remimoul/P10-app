import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // Mock the Response object
      const res = {
        type: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as any;

      appController.getHello(res);

      expect(res.type).toHaveBeenCalledWith('text/html');
      expect(res.send).toHaveBeenCalledWith('Hello World!');
    });
  });
});
