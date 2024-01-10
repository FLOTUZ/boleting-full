import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import LandingLayout from "@/layouts/landing-layout.component";
import ShowOrderView from "@/modules/orders/views/show-order.view";

const OrderByIdRoute = () => {
  return (
    <LandingLayout>
      <IntroAnimationComponent data={true}>
        <ShowOrderView />
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default OrderByIdRoute;
