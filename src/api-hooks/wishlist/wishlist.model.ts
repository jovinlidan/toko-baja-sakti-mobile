import { CategoryItemLite } from "@api-hooks/category-item/category-item.model";
import { Expose, Type } from "class-transformer";

export class StoreWishlistInput {
  body: StoreWishlistFormInput;
}

export class StoreWishlistFormInput {
  categoryItemId: string;
}

export class DestroyWishlistInput {
  body: DestroyWishlistFormInput;
}

export class DestroyWishlistFormInput {
  categoryItemId: string;
}

export class getWishlistsInput {
  params?: {
    q?: string;
    page?: number;
    limit?: number;
  };
}

export class WishlistLite {
  id: string;

  @Expose({ name: "category_item" })
  @Type(() => CategoryItemLite)
  categoryItem: CategoryItemLite;
}
