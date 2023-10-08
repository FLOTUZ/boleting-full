import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { UserProvider } from "@/contexts/user.context";
import { DashboardPath } from "@/routes";
import DashBoardView from "@/modules/dashboard/dashboard.view";

const DashboardRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Dashboard"}
      breadCrumbs={[
        {
          label: "Dashboard",
          href: DashboardPath,
        },
      ]}
    >
      <UserProvider>
        <DashBoardView />
      </UserProvider>
    </DesktopLayoutComponent>
  );
};

export default DashboardRoute;
