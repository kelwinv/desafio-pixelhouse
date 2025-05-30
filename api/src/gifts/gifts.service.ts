// src/gift/gift.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Gift } from './entities/gifts.entity';
import { CreateGiftsDto } from './dto/create-gifts.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class GiftsService {
  constructor(private prisma: PrismaService) {}

  async create(createGiftDto: CreateGiftsDto): Promise<Gift> {
    const gift = Gift.create({
      title: createGiftDto.title,
      description: createGiftDto.description,
      imageUrl: createGiftDto.imageUrl,
      basePrice: createGiftDto.basePrice,
    });

    const savedGift = await this.prisma.gift.create({
      data: gift.toPlainObject(),
    });

    return Gift.fromDatabase(savedGift);
  }

  async findAll(): Promise<Gift[]> {
    const gifts = await this.prisma.gift.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return gifts.map((gift) => Gift.fromDatabase(gift));
  }

  async findOne(id: string): Promise<Gift | null> {
    if (!isUUID(id)) {
      throw new Error('Invalid gift ID format');
    }

    const gift = await this.prisma.gift.findUnique({
      where: { id },
    });

    if (!gift) {
      return null;
    }

    return Gift.fromDatabase(gift);
  }

  async update(
    id: string,
    updateGiftsDto: Partial<CreateGiftsDto>,
  ): Promise<Gift> {
    if (!isUUID(id)) {
      throw new Error('Invalid gift ID format');
    }

    const existingGift = await this.prisma.gift.findUnique({
      where: { id },
    });

    if (!existingGift) {
      throw new Error('Gift not found');
    }

    const updatedGift = Gift.fromDatabase({
      ...existingGift,
      ...updateGiftsDto,
    });

    const savedGift = await this.prisma.gift.update({
      where: { id },
      data: updatedGift.toPlainObject(),
    });

    return Gift.fromDatabase(savedGift);
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new Error('Invalid gift ID format');
    }

    const existingGift = await this.prisma.gift.findUnique({
      where: { id },
    });

    if (!existingGift) {
      throw new Error('Gift not found');
    }

    await this.prisma.gift.delete({
      where: { id },
    });

    return Gift.fromDatabase(existingGift);
  }
}
