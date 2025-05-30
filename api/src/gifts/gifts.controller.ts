import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  Put,
} from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { CreateGiftsDto } from './dto/create-gifts.dto';
import { UpdateGiftsDto } from './dto/update-gifts.dto';
import { GiftGetResponse, GiftPostResponse } from './types/responses';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftService: GiftsService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createGiftsDto: CreateGiftsDto,
  ): Promise<GiftPostResponse> {
    try {
      const gift = await this.giftService.create(createGiftsDto);
      return {
        status: 201,
        data: gift.toPlainObject(),
        error: [],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            data: null,
            status: 400,
            error: [error.message],
          },
          400,
        );
      } else {
        throw new HttpException(
          {
            data: null,
            status: 500,
            error: ['Failed to create gift due to an unknown error'],
          },
          500,
        );
      }
    }
  }

  @Get()
  async findAll(): Promise<GiftGetResponse> {
    try {
      const gifts = await this.giftService.findAll();
      return {
        status: 200,
        data: gifts.map((gift) => gift.toPlainObject()),
        error: [],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            data: null,
            status: 400,
            error: [error.message],
          },
          400,
        );
      } else {
        throw new HttpException(
          {
            data: null,
            status: 500,
            error: ['Failed to retrieve gifts due to an unknown error'],
          },
          500,
        );
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const gift = await this.giftService.findOne(id);
      if (!gift) {
        throw Error(`Gift with id ${id} not found`);
      }
      return {
        status: 200,
        data: gift.toPlainObject(),
        error: [],
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          throw new HttpException(
            {
              data: null,
              status: 404,
              error: [error.message],
            },
            404,
          );
        }
        throw new HttpException(
          {
            data: null,
            status: 400,
            error: [error.message],
          },
          400,
        );
      }
      throw new HttpException(
        {
          data: null,
          status: 500,
          error: ['Failed to retrieve gift due to an unknown error'],
        },
        500,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGiftsDto: UpdateGiftsDto,
  ) {
    try {
      const updatedGift = await this.giftService.update(id, updateGiftsDto);
      return {
        status: 200,
        data: updatedGift.toPlainObject(),
        error: [],
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          throw new HttpException(
            {
              data: null,
              status: 404,
              error: [error.message],
            },
            404,
          );
        }
        throw new HttpException(
          {
            data: null,
            status: 400,
            error: [error.message],
          },
          400,
        );
      }
      throw new HttpException(
        {
          data: null,
          status: 500,
          error: ['Failed to update gift due to an unknown error'],
        },
        500,
      );
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.giftService.remove(id);
      return {
        status: 204,
        data: null,
        error: [],
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          throw new HttpException(
            {
              data: null,
              status: 404,
              error: [error.message],
            },
            404,
          );
        }
        throw new HttpException(
          {
            data: null,
            status: 400,
            error: [error.message],
          },
          400,
        );
      }
      throw new HttpException(
        {
          data: null,
          status: 500,
          error: ['Failed to delete gift due to an unknown error'],
        },
        500,
      );
    }
  }
}
