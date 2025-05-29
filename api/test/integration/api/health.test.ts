import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { testApp } from 'test/utils/testApp';

type TypeHealthResponse = {
  status: number;
  updated_at: string;
  dependencies: {
    pg: {
      version: string;
      max_connections: number;
      current_connections: number;
    };
  };
};

describe('/health', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    app = await testApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 and valid health data', async () => {
    const server = app.getHttpServer();

    const response = await request(server).get('/health');

    expect(response.status).toBe(200);

    const responseBody = response.body as TypeHealthResponse;

    expect(responseBody.updated_at).toBeDefined();
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

    expect(responseBody.dependencies.pg).toEqual({
      status: 'up',
      version: '16.0',
      max_connections: 100,
      current_connections: 1,
    });
  });

  it('should return pg dependency offline when database is down', async () => {
    const prismaService = app.get<PrismaService>(PrismaService);
    jest
      .spyOn(prismaService, '$queryRaw')
      .mockRejectedValue(new Error('Connection refused'));

    const server = app.getHttpServer();

    const response = await request(server).get('/health');

    expect(response.status).toBe(200);
    const responseBody = response.body as TypeHealthResponse;
    expect(responseBody.dependencies.pg).toEqual({
      status: 'down',
      version: 'unknown',
      max_connections: 0,
      current_connections: 0,
    });
  });
});
