import {
  View,
  ImageComponent,
  StyleSheet,
  Text,
  Content,
} from "@components/elements";
import WishlistComponent from "@components/widgets/wishlist-component";
import sizeConstant from "@constants/size.constant";
import { useCallback, useReducer, useState } from "react";
import { string2money } from "@utils/string";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import colorConstant from "@constants/color.constant";
import QuantitySetter from "./components/quantity-setter";
import CheckoutButton from "./components/checkout-button";
import TotalPrice from "./components/total-price";
import { QuantityReducerAction, QuantitySetterEnum, StateForm } from "./types";
import AllChoice from "./components/all-choice";
import {
  CategoryItem,
  Item,
  ItemUnitEnum,
} from "@api-hooks/category-item/category-item.model";
import Toast from "@common/helpers/toast";
import { useAddCartItem } from "@api-hooks/cart/cart.mutation";
import { useQueryClient, UseQueryResult } from "react-query";
import { getCartKey } from "@api-hooks/cart/cart.query";
import { ApiError, ApiResult } from "@common/repositories";
import { useRouter } from "expo-router";
import { CART_SCREEN_NAME } from "@constants/route.constant";

interface Props {
  categoryItemQuery: UseQueryResult<ApiResult<CategoryItem>, ApiError>;
}

export default function ProductContent(props: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const item = props.categoryItemQuery.data?.data!;
  const { mutateAsync: addCartItem, isLoading: addCartItemLoading } =
    useAddCartItem();

  const [stateForm, setStateForm] = useState<StateForm>({
    ...item?.items?.[0]!,
    unit: item?.smallUnit!,
  });
  const [totalStock, setTotalStock] = useState<number>(
    Math.floor((item?.items?.[0]?.stock || 1) / (item?.conversionUnit || 1))
  );
  const [price, setPrice] = useState<number>(
    item?.items?.[0]?.wholesalePrice || 0
  );

  const reducer = useCallback(
    (state: number, action: QuantityReducerAction) => {
      switch (action.type) {
        case QuantitySetterEnum.INCREMENT:
          if (state + 1 <= totalStock) {
            return ++state;
          }
          break;
        case QuantitySetterEnum.DECREMENT:
          if (state - 1 >= 1) {
            return --state;
          }
          break;
        case QuantitySetterEnum.OUTOFSTOCK:
          return 0;
        case QuantitySetterEnum.DIRECTSET:
          return action.quantity || 1;
      }
      return state;
    },
    [totalStock]
  );

  const [quantity, dispatchQuantity] = useReducer(
    reducer,
    Math.min(
      1,
      Math.floor((item?.items?.[0]?.stock || 1) / (item?.conversionUnit || 1))
    )
  );

  const getPrice = useCallback(
    (itemOnData?: Item, _stateForm?: Partial<StateForm>) => {
      if (!itemOnData || !itemOnData?.isAvailable) {
        return 0;
      }
      if (_stateForm?.unit === item?.bigUnit) {
        return itemOnData.wholesalePrice;
      } else {
        return itemOnData.retailPrice;
      }
    },
    [item?.bigUnit]
  );

  const getTotalStock = useCallback(
    (itemOnData?: Item, _stateForm?: Partial<StateForm>) => {
      if (!itemOnData || !itemOnData.isAvailable) {
        return 0;
      }
      if (_stateForm?.unit === item?.bigUnit) {
        return Math.floor(itemOnData.stock / (item?.conversionUnit || 1));
      } else {
        return itemOnData.stock;
      }
    },
    [item?.bigUnit, item?.conversionUnit]
  );

  const handleChangeStateForm = useCallback(
    (value: Partial<StateForm>) => {
      const _currentStateForm = { ...stateForm, ...value };

      const itemOnData = item?.items.find(
        (i) =>
          i.size === _currentStateForm?.size &&
          i.color === _currentStateForm?.color &&
          i.thick === _currentStateForm?.thick
      );

      const _totalStock = getTotalStock(itemOnData, _currentStateForm);
      const _price = getPrice(itemOnData, _currentStateForm);

      if (_totalStock <= 0) {
        dispatchQuantity({ type: QuantitySetterEnum.OUTOFSTOCK });
      } else {
        dispatchQuantity({
          type: QuantitySetterEnum.DIRECTSET,
          quantity: Math.min(1, _totalStock),
        });
      }
      setPrice(_price);
      setTotalStock(_totalStock);
      setStateForm(_currentStateForm);
    },
    [getPrice, getTotalStock, item?.items, stateForm]
  );

  const handleCheckout = useCallback(async () => {
    try {
      const itemOnData = item?.items.find(
        (i) =>
          i.size === stateForm?.size &&
          i.color === stateForm?.color &&
          i.thick === stateForm?.thick
      );
      if (!quantity || !itemOnData) {
        return;
      }
      const result = await addCartItem({
        body: {
          itemId: itemOnData?.id,
          quantity,
          unit:
            stateForm?.unit === item?.bigUnit
              ? ItemUnitEnum.Wholesale
              : ItemUnitEnum.Retail,
        },
      });
      await queryClient.invalidateQueries(getCartKey());
      result?.message && Toast.success(result?.message);
      router.push(CART_SCREEN_NAME);
    } catch (e: any) {
      e?.message && Toast.error(e?.message);
    }
  }, [
    addCartItem,
    item?.bigUnit,
    item?.items,
    quantity,
    queryClient,
    router,
    stateForm?.color,
    stateForm?.size,
    stateForm?.thick,
    stateForm?.unit,
  ]);

  return (
    <>
      <Content showsVerticalScrollIndicator={false} noPadding>
        <View>
          <ImageComponent
            source={{ uri: item?.file?.fileUrl }}
            style={styles.image}
            resizeMode="stretch"
          />
          <View style={styles.content}>
            <WishlistComponent id={item.id} isWishlist={item.isWishlist} />
            <Text variant="h4">
              {item.name} - {item.brand}
            </Text>
            <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
            <Text variant="bodyReg">
              Rp {string2money(price)} (Stok : {totalStock})
            </Text>
            <View style={styMargin(12, SeparatorTypeEnum.bottom)} />
            <AllChoice
              item={item}
              setStateForm={handleChangeStateForm}
              stateForm={stateForm}
            />
            <View style={styMargin(12, SeparatorTypeEnum.bottom)} />
            <Text>
              1 {item.bigUnit} = {item.conversionUnit} {item.smallUnit}
            </Text>
            <View style={styMargin(20, SeparatorTypeEnum.bottom)} />
          </View>
        </View>
      </Content>
      <View style={styles.footer}>
        <TotalPrice totalPrice={`Rp ${string2money(price * quantity)}`} />
        <QuantitySetter
          dispatchQuantity={dispatchQuantity}
          quantity={quantity}
        />
        <View style={styMargin(16, SeparatorTypeEnum.right)} />
        <CheckoutButton
          onCheckout={handleCheckout}
          disable={!quantity}
          loading={addCartItemLoading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 268,
  },
  content: {
    position: "relative",
    paddingHorizontal: sizeConstant.contentPad,
    paddingTop: 8,
    height: "100%",
  },
  footer: {
    backgroundColor: colorConstant.primaryOrange1,
    height: 90,
    flexDirection: "row",

    paddingVertical: 20,
    paddingHorizontal: sizeConstant.contentPad,

    alignItems: "center",
  },
});
