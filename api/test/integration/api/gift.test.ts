import { INestApplication } from '@nestjs/common';
import { GiftGetResponse, GiftPostResponse } from 'src/gifts/types/responses';
import { PrismaService } from 'src/prisma/prisma.service';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { testApp } from 'test/utils/testApp';

type CreateGiftDto = {
  title: string;
  description: string;
  imageUrl: string;
  basePrice: number;
};

type UpdateGiftDto = Partial<CreateGiftDto>;

type GiftResponse = GiftPostResponse['data'];

describe('/gifts', () => {
  let app: INestApplication<App>;
  let prismaService: PrismaService;

  beforeEach(async () => {
    app = await testApp();
    prismaService = app.get<PrismaService>(PrismaService);

    await prismaService.gift.deleteMany();
  });

  afterAll(async () => {
    await prismaService.gift.deleteMany();
    await app.close();
  });

  describe('POST /gifts', () => {
    it('should create a new gift and return 201', async () => {
      const createGiftDto: CreateGiftDto = {
        title: 'iPhone 15',
        description: 'Último modelo do iPhone com câmera avançada',
        imageUrl: 'https://example.com/iphone15.jpg',
        basePrice: 5000.0,
      };

      const server = app.getHttpServer();
      const response = await request(server).post('/gifts').send(createGiftDto);

      expect(response.status).toBe(201);

      const { data: gift } = response.body as GiftPostResponse;

      expect(gift.id).toBeDefined();
      expect(gift.title).toBe(createGiftDto.title);
      expect(gift.description).toBe(createGiftDto.description);
      expect(gift.imageUrl).toBe(createGiftDto.imageUrl);
      expect(gift.basePrice).toBe(createGiftDto.basePrice);
      expect(gift.createdAt).toBeDefined();

      const parsedCreatedAt = new Date(gift.createdAt).toISOString();
      expect(gift.createdAt).toEqual(parsedCreatedAt);

      const dbGift = await prismaService.gift.findUnique({
        where: { id: gift.id },
      });
      expect(dbGift?.id).toBe(gift.id);
    });

    it('should return 400 when required fields are missing', async () => {
      const incompleteGiftDto = {
        title: 'iPhone 15',
      };

      const server = app.getHttpServer();
      const response = await request(server)
        .post('/gifts')
        .send(incompleteGiftDto);

      expect(response.status).toBe(400);
    });

    it('should return 400 when basePrice is negative', async () => {
      const invalidGiftDto: CreateGiftDto = {
        title: 'iPhone 15',
        description: 'Descrição do produto',
        imageUrl: 'https://example.com/image.jpg',
        basePrice: -100,
      };

      const server = app.getHttpServer();
      const response = await request(server)
        .post('/gifts')
        .send(invalidGiftDto);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /gifts', () => {
    it('should return all gifts', async () => {
      const gift1 = await prismaService.gift.create({
        data: {
          title: 'iPhone 15',
          description: 'Smartphone Apple',
          imageUrl: 'https://example.com/iphone.jpg',
          basePrice: 5000.0,
        },
      });

      const gift2 = await prismaService.gift.create({
        data: {
          title: 'MacBook Pro',
          description: 'Notebook Apple',
          imageUrl: 'https://example.com/macbook.jpg',
          basePrice: 8000.0,
        },
      });

      const server = app.getHttpServer();
      const response = await request(server).get('/gifts');

      expect(response.status).toBe(200);

      const { data: gifts } = response.body as GiftGetResponse;

      expect(gifts.find((g) => g.id === gift1.id)).toBeDefined();
      expect(gifts.find((g) => g.id === gift2.id)).toBeDefined();
    });

    it('should return empty array when no gifts exist', async () => {
      const server = app.getHttpServer();
      const response = await request(server).get('/gifts');

      expect(response.status).toBe(200);

      const { data: gifts } = response.body as GiftGetResponse;

      expect(Array.isArray(gifts)).toBe(true);
      expect(gifts).toHaveLength(0);
    });
  });

  describe('GET /gifts/:id', () => {
    it('should return a specific gift by id', async () => {
      const createdGift = await prismaService.gift.create({
        data: {
          title: 'iPhone 15',
          description: 'Smartphone Apple',
          imageUrl: 'https://example.com/iphone.jpg',
          basePrice: 5000.0,
        },
      });

      const server = app.getHttpServer();
      const response = await request(server).get(`/gifts/${createdGift.id}`);

      expect(response.status).toBe(200);

      const { data: gift } = response.body as { data: GiftResponse };

      expect(gift.id).toBe(createdGift.id);
      expect(gift.title).toBe(createdGift.title);
      expect(gift.description).toBe(createdGift.description);
      expect(gift.imageUrl).toBe(createdGift.imageUrl);
      expect(gift.basePrice).toBe(createdGift.basePrice);
    });

    it('should return 404 when gift does not exist', async () => {
      const server = app.getHttpServer();
      const response = await request(server).get(
        '/gifts/5fe3df67-72e5-4504-abc7-d2f433cd61ba',
      );

      expect(response.status).toBe(404);
    });

    it('should return 400 when id is not a valid number', async () => {
      const server = app.getHttpServer();
      const response = await request(server).get('/gifts/invalid-id');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: 400,
        data: null,
        error: ['Invalid gift ID format'],
      });
    });
  });

  describe('PUT /gifts/:id', () => {
    it('should update an existing gift', async () => {
      const createdGift = await prismaService.gift.create({
        data: {
          title: 'iPhone 14',
          description: 'Smartphone Apple modelo anterior',
          imageUrl: 'https://example.com/iphone14.jpg',
          basePrice: 4000.0,
        },
      });

      const updateGiftDto: UpdateGiftDto = {
        title: 'iPhone 15 Pro',
        basePrice: 6000.0,
      };

      const server = app.getHttpServer();
      const response = await request(server)
        .put(`/gifts/${createdGift.id}`)
        .send(updateGiftDto);

      expect(response.status).toBe(200);

      const { data: gift } = response.body as GiftPostResponse;

      expect(gift.id).toBe(createdGift.id);
      expect(gift.title).toBe(updateGiftDto.title);
      expect(gift.description).toBe(createdGift.description);
      expect(gift.imageUrl).toBe(createdGift.imageUrl);
      expect(gift.basePrice).toBe(updateGiftDto.basePrice);
    });

    it('should return 404 when trying to update non-existent gift', async () => {
      const updateGiftDto: UpdateGiftDto = {
        title: 'iPhone 15 Pro',
      };

      const server = app.getHttpServer();
      const response = await request(server)
        .put('/gifts/5fe3df67-72e5-4504-abc7-d2f433cd61be')
        .send(updateGiftDto);

      expect(response.status).toBe(404);
    });

    it('should return 400 when trying to update with invalid data', async () => {
      const createdGift = await prismaService.gift.create({
        data: {
          title: 'iPhone 14',
          description: 'Smartphone Apple',
          imageUrl: 'https://example.com/iphone.jpg',
          basePrice: 4000.0,
        },
      });

      const invalidUpdateDto = {
        basePrice: -500, // Preço negativo
      };

      const server = app.getHttpServer();
      const response = await request(server)
        .put(`/gifts/${createdGift.id}`)
        .send(invalidUpdateDto);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /gifts/:id', () => {
    it('should delete an existing gift', async () => {
      const createdGift = await prismaService.gift.create({
        data: {
          title: 'iPhone 15',
          description: 'Smartphone Apple',
          imageUrl: 'https://example.com/iphone.jpg',
          basePrice: 5000.0,
        },
      });

      const server = app.getHttpServer();
      const response = await request(server).delete(`/gifts/${createdGift.id}`);

      expect(response.status).toBe(204);

      // Verifica se o presente foi realmente deletado
      const deletedGift = await prismaService.gift.findUnique({
        where: { id: createdGift.id },
      });
      expect(deletedGift).toBeNull();
    });

    it('should return 404 when trying to delete non-existent gift', async () => {
      const server = app.getHttpServer();
      const response = await request(server).delete(
        '/gifts/5fe3df67-72e5-4504-abc7-d2f433cd61bc',
      );

      expect(response.status).toBe(404);
    });

    it('should return 400 when id is not a valid number', async () => {
      const server = app.getHttpServer();
      const response = await request(server).delete('/gifts/invalid-id');

      expect(response.status).toBe(400);
    });
  });
});
