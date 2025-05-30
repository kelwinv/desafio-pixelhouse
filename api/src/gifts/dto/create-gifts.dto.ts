import { IsString, IsNotEmpty, IsNumber, IsUrl, Min } from 'class-validator';

export class CreateGiftsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsNumber()
  @Min(0)
  basePrice: number;
}
