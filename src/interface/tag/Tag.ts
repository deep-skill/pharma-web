export interface Tag {
    id: number;
    name: string;
    category: string;
    updated_at: string;
    created_at: string;
}

export interface CreateTagDto {
    name: string;
    category: string;
}

export interface UpdateTagDto extends CreateTagDto {}