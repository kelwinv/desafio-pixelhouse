import { TypeGiftObject } from '../entities/gifts.entity';

export type GiftPostResponse = {
  status: number;
  data: TypeGiftObject;
  error: string[];
};

export type GiftGetResponse = {
  status: number;
  data: TypeGiftObject[];
  error: string[];
};
