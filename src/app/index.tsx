import { Redirect } from "expo-router";

import Login from "@modules/login";
function Middleware() {
  // return
  return <Redirect href="/home" />;

  return <Login />;
  return <Redirect href="/onboarding" />;
  return null;
}

export default function IndexPage() {
  return <Middleware />;
}
