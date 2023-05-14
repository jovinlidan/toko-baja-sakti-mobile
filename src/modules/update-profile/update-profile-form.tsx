import { UpdateMeInputForm } from "@api-hooks/auth/auth.model";
import { useUpdateMe } from "@api-hooks/auth/auth.mutation";
import { useGetCities } from "@api-hooks/city/city.query";
import Toast from "@common/helpers/toast";
import {
  Field,
  Form,
  Text,
  View,
  StyleSheet,
  Button,
} from "@components/elements";
import colorConstant from "@constants/color.constant";
import { UPDATE_PHONE_NUMBER_SCREEN_NAME } from "@constants/route.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import useMe from "@hooks/use-me";
import useYupValidationResolver from "@hooks/use-yup-validation-resolver";
import { meState } from "@models/auth";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";

import * as Yup from "yup";

interface FormType extends Partial<UpdateMeInputForm> {
  phone?: string;
}

export default function UpdateProfileForm() {
  const router = useRouter();
  const { mutateAsync: updateMe } = useUpdateMe();
  const cities = useGetCities({
    params: {
      limit: -1,
    },
  });
  const { refetch } = useMe();
  const [me] = useRecoilState(meState);
  const YupSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string(),
        address: Yup.object().shape({
          id: Yup.string(),
          addressDetail: Yup.string().when("address.cityId", {
            is: (value: any) => !value,
            then: Yup.string().required(),
          }),
          cityId: Yup.string(),
        }),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<FormType>({
    resolver,
    mode: "all",
    defaultValues: {
      name: me?.name,
      email: me?.email,
      phone: me?.phone,
      address: {
        addressDetail: me?.address?.addressDetail,
        cityId: me?.address?.city?.id,
        id: me?.address?.id,
      },
    },
  });

  const onSubmit = useCallback(
    async (values) => {
      try {
        const res = await updateMe({ body: values });
        await refetch();
        res.message && Toast.success(res.message);
        router.back();
      } catch (e: any) {
        e?.message && Toast.error(e?.message);
      }
    },
    [refetch, router, updateMe]
  );

  const onNavigateUpdatePhoneNumber = useCallback(() => {
    router.push(UPDATE_PHONE_NUMBER_SCREEN_NAME);
  }, [router]);

  const CityOptions = useMemo(() => {
    return (
      cities?.data?.data?.map((city) => ({
        label: city.name,
        value: city.id,
      })) || []
    );
  }, [cities?.data?.data]);

  return (
    <Form methods={methods}>
      <View style={styMargin(20, SeparatorTypeEnum.bottom)} />
      <Field type="normal" name="name" label="Nama Lengkap" required />
      <Field type="normal" name="phone" label="No. Handphone" disabled />
      <Field type="normal" name="email" label="Email" />
      <Field
        type="normal"
        name="address.addressDetail"
        label="Alamat"
        numberOfLines={4}
      />
      <Field
        type="select"
        options={CityOptions}
        name="address.cityId"
        label="Kota"
        placeholder="Pilih Kota"
      />

      <View style={styMargin(28, SeparatorTypeEnum.bottom)} />

      <Button variant="outline" onPress={onNavigateUpdatePhoneNumber}>
        Ubah No. Handphone
      </Button>
      <View style={styMargin(16, SeparatorTypeEnum.bottom)} />
      <Field onSubmit={onSubmit} type="submit">
        Simpan
      </Field>
    </Form>
  );
}
