import { useState } from "react";
import OnboardingSwiper from "./onboarding-swiper";
import OnboardingWelcome from "./onboarding-welcome";

export default function Onboarding() {
  const [start, setStart] = useState(false);

  if (!start) {
    return <OnboardingWelcome onNext={() => setStart(true)} />;
  }
  return <OnboardingSwiper />;
}
