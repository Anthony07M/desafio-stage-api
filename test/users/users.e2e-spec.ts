import * as request from 'superagent';
import { Test } from '@nestjs/testing';
import { UsersModule } from 'src/users/users.module';
import { INestApplication } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

describe('Users', () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(UsersService)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it(`/GET users`, () => {
    const req = request(app.getHttpServer()).get('/users');
    console.log(req);
    return;
  });

  afterAll(async () => {
    await app.close();
  });
});
