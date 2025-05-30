import { PartialType } from '@nestjs/mapped-types';
import { CreateGiftsDto } from './create-gifts.dto';

export class UpdateGiftsDto extends PartialType(CreateGiftsDto) {}
