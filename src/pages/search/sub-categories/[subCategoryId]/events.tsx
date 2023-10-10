import { useRouter } from "next/router";

const SearchEventsBySubcategoryRoute = () => {
  const router = useRouter();
  const { categoryId, subCategoryId } = router.query;

  return <div>Search Events By Subcategory {subCategoryId}</div>;
};

export default SearchEventsBySubcategoryRoute;
