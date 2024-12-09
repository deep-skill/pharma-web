import { Brand } from '@/interface/brand/Brand';
import { Tag } from '@/interface/tag/Tag';

export interface Product {
  id: number;
  brand_id: number;
  name: string;
  description: string;
  prescription_required: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  brand?: Brand;
  tags?: Tag[];
}

export interface CreateProductDto {
  name: string;
  description?: string;
  prescriptionRequired?: number;
  brandId: number;
  tagIds: number[];
}

export interface UpdateProductDto extends CreateProductDto { }