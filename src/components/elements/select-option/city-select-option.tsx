import { useGetCities } from "@api-hooks/city/city.query";
import { useMemo } from "react";
import Field from "../field";

interface Props {
  name: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
}

export default function CitySelectOption(props: Props) {
  const cities = useGetCities({
    params: {
      limit: -1,
    },
  });
  const CityOptions = useMemo(() => {
    return (
      cities?.data?.data?.map((city) => ({
        label: city.name,
        value: city.id,
      })) || []
    );
  }, [cities?.data?.data]);
  return (
    <Field
      {...props}
      type="select"
      options={CityOptions}
      loading={cities.isLoading || cities.isFetching}
      disabled={cities.isLoading || cities.isFetching}
    />
  );
}
