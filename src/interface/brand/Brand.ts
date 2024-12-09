export interface Brand {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateBrandDto {
  name: string;
}

export interface UpdateBrandDto extends CreateBrandDto { }