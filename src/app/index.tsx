import { Redirect } from "expo-router";

function Middleware() {
  return <Redirect href="/onboarding" />;
  return null;
}

export default function IndexPage() {
  return <Middleware />;
}
