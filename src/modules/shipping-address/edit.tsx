import { useUpdateAddress } from "@api-hooks/address/address.mutation";
import {
  getAddressesKey,
  getAddressKey,
  useGetAddress,
} from "@api-hooks/address/address.query";
import Toast from "@common/helpers/toast";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { Container, Content } from "@components/elements";
import { Header } from "@components/widgets";
import { useSearchParams } from "expo-router";
import { useCallback } from "react";
import { useQueryClient } from "react-query";
import ShippingAddressForm from "./components/shipping-address-form";

export default function EditShippingAddress() {
  const { id } = useSearchParams();
  const queryClient = useQueryClient();
  const { data, isLoading, refetch, error } = useGetAddress(
    {
      id: id as string,
    },
    { enabled: !!id }
  );
  const { mutateAsync: updateAddress } = useUpdateAddress();
  const onSubmit = useCallback(
    async (values) => {
      const res = await updateAddress({ body: values, id: id as string });
      await queryClient.invalidateQueries(getAddressKey({ id: id as string }));
      await queryClient.invalidateQueries(getAddressesKey());
      res?.message && Toast.success(res.message);
    },
    [id, queryClient, updateAddress]
  );
  return (
    <Container>
      <Header title="Ubah Alamat" back />
      <Content>
        <FetchWrapperComponent
          noPadding
          isLoading={isLoading}
          onRetry={refetch}
          error={error}
          component={
            <ShippingAddressForm onSubmit={onSubmit} data={data?.data} />
          }
        />
      </Content>
    </Container>
  );
}
