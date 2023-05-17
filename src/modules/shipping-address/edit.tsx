import {
  useCreateAddress,
  useUpdateAddress,
} from "@api-hooks/address/address.mutation";
import {
  getAddressesKey,
  useGetAddress,
} from "@api-hooks/address/address.query";
import Toast from "@common/helpers/toast";
import { queryClient } from "@common/repositories";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { Container, Content } from "@components/elements";
import { Header } from "@components/widgets";
import { useSearchParams } from "expo-router";
import { useCallback } from "react";
import ShippingAddressForm from "./components/shipping-address-form";

export default function CreateShippingAddress() {
  const { id } = useSearchParams();
  const { data, isLoading, isFetching, refetch, error } = useGetAddress({
    id: id as string,
  });
  const { mutateAsync: updateAddress } = useUpdateAddress();
  const onSubmit = useCallback(
    async (values) => {
      const res = await updateAddress({ body: values, id: id as string });
      res?.message && Toast.success(res.message);
      await queryClient.refetchQueries(getAddressesKey());
    },
    [id, updateAddress]
  );
  return (
    <Container>
      <Header title="Ubah Alamat" back />
      <Content>
        <FetchWrapperComponent
          noPadding
          isLoading={isLoading || isFetching}
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
