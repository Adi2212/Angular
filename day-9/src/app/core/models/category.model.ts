export interface MainCategory {
  id: number;
  name: string;
  imgUrl: string;
}

export interface CategoryParentRef {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
  imgUrl: string;
  isActive: boolean;
  parent?: CategoryParentRef | null;
}

export interface CategoryDetail {
  id: number;
  name: string;
  imgUrl: string;
  parent?: CategoryParentRef | null;
  subcategories?: SubCategory[];
}

export interface CreateCategoryRequest {
  name: string;
  imgUrl: string;
  parentId?: number | null;
}
