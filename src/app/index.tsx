import { Redirect } from "expo-router";

function Middleware() {
  //! ini middleware ga guna karna middleware dihandle pada 'use-credential.tsx' !
  return <Redirect href="/home" />;
  // return <Redirect href="/onboarding" />;

  // return <Login />;
  // return <Redirect href="/onboarding" />;
  // return null;
}

export default function IndexPage() {
  return <Middleware />;
}
