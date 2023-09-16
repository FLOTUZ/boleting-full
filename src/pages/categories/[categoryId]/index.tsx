import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowCategoryView from "@/modules/categories/views/show-category.view";

import { useRouter } from "next/router";

import { CategoriesPath, ShowCategoryPath } from "@/routes";

const ShowCategoryRoute = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  return (
    <DesktopLayoutComponent
      title={`Categoria ${categoryId}`}
      breadCrumbs={[
        {
          label: "Categorias",
          href: CategoriesPath,
        },
        {
          label: `${categoryId}`,
          href: ShowCategoryPath(categoryId as string),
        },
      ]}
    >
      <ShowCategoryView />
    </DesktopLayoutComponent>
  );
};

export default ShowCategoryRoute;
