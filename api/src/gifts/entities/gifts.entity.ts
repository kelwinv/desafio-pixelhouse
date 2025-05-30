// src/gift/entities/gift.entity.ts
import { randomUUID } from 'crypto';
import { Gift as prismaGift } from '@prisma/client';
import { isURL } from 'class-validator';

export class Gift {
  private readonly _id: string;
  private readonly _createdAt: string;
  private _title: string;
  private _description: string;
  private _imageUrl: string;
  private _basePrice: number;

  constructor(
    title: string,
    description: string,
    imageUrl: string,
    basePrice: number,
    id?: string,
    createdAt?: string,
  ) {
    this.validateTitle(title);
    this.validateDescription(description);
    this.validateImageUrl(imageUrl);
    this.validateBasePrice(basePrice);

    this._id = id ?? randomUUID();
    this._title = title;
    this._description = description;
    this._imageUrl = imageUrl;
    this._basePrice = basePrice;
    this._createdAt = createdAt ?? new Date().toISOString();
  }

  static create(data: Omit<TypeGiftObject, 'id' | 'createdAt'>): Gift {
    return new Gift(
      data.title,
      data.description,
      data.imageUrl,
      data.basePrice,
    );
  }

  static fromDatabase(data: prismaGift): Gift {
    return new Gift(
      data.title,
      data.description,
      data.imageUrl,
      data.basePrice,
      data.id,
      data.createdAt.toISOString(),
    );
  }

  toPlainObject(): TypeGiftObject {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      imageUrl: this._imageUrl,
      basePrice: this._basePrice,
      createdAt: this._createdAt,
    };
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Title cannot be empty'); // TODO: create custom error
    }
    if (title.length > 100) {
      throw new Error('Title cannot exceed 100 characters');
    }
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Description cannot be empty');
    }
    if (description.length > 500) {
      throw new Error('Description cannot exceed 500 characters');
    }
  }

  private validateImageUrl(imageUrl: string): void {
    if (!imageUrl || imageUrl.trim().length === 0) {
      throw new Error('Image URL cannot be empty');
    }

    if (!isURL(imageUrl)) {
      throw new Error('Invalid image URL format');
    }
  }

  private validateBasePrice(basePrice: number): void {
    if (basePrice === null || basePrice === undefined) {
      throw new Error('Base price is required');
    }
    if (basePrice < 0) {
      throw new Error('Base price cannot be negative');
    }
    if (basePrice > 999999.99) {
      throw new Error('Base price cannot exceed 999,999.99');
    }
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get basePrice(): number {
    return this._basePrice;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  updateTitle(newTitle: string): void {
    this.validateTitle(newTitle);
    this._title = newTitle;
  }

  updateDescription(newDescription: string): void {
    this.validateDescription(newDescription);
    this._description = newDescription;
  }

  updateImageUrl(newImageUrl: string): void {
    this.validateImageUrl(newImageUrl);
    this._imageUrl = newImageUrl;
  }

  updateBasePrice(newPrice: number): void {
    this.validateBasePrice(newPrice);
    this._basePrice = newPrice;
  }
}

export type TypeGiftObject = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  createdAt: string;
};
