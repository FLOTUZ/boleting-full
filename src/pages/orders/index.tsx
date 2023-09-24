import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowOrderView from "@/modules/orders/views/show-order.view";

const OrderRoute = () => {
  return (
    <DesktopLayoutComponent title="Seccion de pago">
      <ShowOrderView />
    </DesktopLayoutComponent>
  );
};
export default OrderRoute;
