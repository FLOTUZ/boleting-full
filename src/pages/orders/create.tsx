import LandingLayout from "@/layouts/landing-layout.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import CreateOrderView from "@/modules/orders/views/create-order.view";

const CreateOrderRoute = () => {
  return (
    <LandingLayout>
      <IntroAnimationComponent data={true} />
      <CreateOrderView />
    </LandingLayout>
  );
};

export default CreateOrderRoute;
