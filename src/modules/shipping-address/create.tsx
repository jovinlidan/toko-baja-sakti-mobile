import { useCreateAddress } from "@api-hooks/address/address.mutation";
import { getAddressesKey } from "@api-hooks/address/address.query";
import Toast from "@common/helpers/toast";
import { queryClient } from "@common/repositories";
import { Container, Content } from "@components/elements";
import { Header } from "@components/widgets";
import { useCallback } from "react";
import ShippingAddressForm from "./components/shipping-address-form";

export default function CreateShippingAddress() {
  const { mutateAsync: createAddress } = useCreateAddress();
  const onSubmit = useCallback(
    async (values) => {
      const res = await createAddress({ body: values });
      res?.message && Toast.success(res.message);
      await queryClient.refetchQueries(getAddressesKey());
    },
    [createAddress]
  );
  return (
    <Container>
      <Header title="Tambah Alamat" />
      <Content>
        <ShippingAddressForm onSubmit={onSubmit} />
      </Content>
    </Container>
  );
}
