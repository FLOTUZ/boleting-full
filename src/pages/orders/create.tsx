import LandingLayout from "@/layouts/landing-layout.component";
import OrderResumeView from "@/modules/orders/views/order-resume.view";
import { Box } from "@chakra-ui/react";

const CreateOrderRoute = () => {
  return (
    <>
      <LandingLayout>
        <Box display={"flex"} justifyContent={"center"}>
          <OrderResumeView />
        </Box>
      </LandingLayout>
    </>
  );
};

export default CreateOrderRoute;
