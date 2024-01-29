import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import LandingLayout from "@/layouts/landing-layout.component";

const OrderByIdRoute = () => {
  return (
    <LandingLayout>
      <IntroAnimationComponent data={true}></IntroAnimationComponent>
    </LandingLayout>
  );
};

export default OrderByIdRoute;
