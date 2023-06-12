import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { SelledByEventPath, TicketsPath } from "@/routes";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

function SelledByEventRoute() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <DesktopLayoutComponent
      title={"Tickets vendidos"}
      breadCrumbs={[
        {
          label: "Tickets",
          href: TicketsPath,
        },
        {
          label: `Evento ${id}`,
          href: SelledByEventPath(Number(id)),
        },
      ]}
    >
      <Text>Selled by event</Text>
    </DesktopLayoutComponent>
  );
}

export default SelledByEventRoute;
