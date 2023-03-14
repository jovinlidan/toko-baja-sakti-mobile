import { Redirect } from "expo-router";
import { setLocale } from "yup";
import yupID from "@common/validation.yup";
setLocale(yupID as any);
function Middleware() {
  return <Redirect href="/onboarding" />;
  return null;
}

export default function IndexPage() {
  return <Middleware />;
}
