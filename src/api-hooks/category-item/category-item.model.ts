import { File } from "@api-hooks/common/common.model";
import { Expose, Type } from "class-transformer";

export class CategoryItemLite {
  id: string;
  code: string;
  name: string;
  brand: string;

  @Expose({ name: "big_unit" })
  bigUnit: string;

  @Expose({ name: "small_unit" })
  smallUnit: string;

  @Type(() => File)
  file: File;

  @Expose({ name: "is_available" })
  @Type(() => Boolean)
  isAvailable: boolean;

  @Expose({ name: "min_price" })
  @Type(() => Number)
  minPrice: number;

  @Expose({ name: "max_price" })
  @Type(() => Number)
  maxPrice: number;

  @Expose({ name: "is_wishlist" })
  isWishlist: boolean;
}

export class CategoryItem {
  id: string;
  code: string;
  name: string;
  brand: string;

  @Expose({ name: "conversion_unit" })
  conversionUnit: number;

  @Expose({ name: "big_unit" })
  bigUnit: string;

  @Expose({ name: "small_unit" })
  smallUnit: string;

  @Type(() => File)
  file: File;

  @Type(() => Item)
  items: Item[];

  @Expose({ name: "is_wishlist" })
  isWishlist: boolean;
}

export class Item {
  id: string;
  code: string;
  size: string;
  thick: string;
  color: string;
  stock: number;

  @Expose({ name: "wholesale_price" })
  @Type(() => Number)
  wholesalePrice: number;

  @Expose({ name: "retail_price" })
  @Type(() => Number)
  retailPrice: number;

  status: string;

  @Expose({ name: "is_available" })
  isAvailable: boolean;
}

export class getCategoryItemsInput {
  params?: {
    q?: string;
    page?: number;
    limit?: number;
  };
}

export class getCategoryItemInput {
  id: string;
}
