import { EventSubCategory } from "@/gql/generated";
import { createContext, useContext, useEffect, useState } from "react";

export type LandingPageContextType = {
  eventSubCategories: EventSubCategory[];
};

const LandingPageContext = createContext<LandingPageContextType>({
  eventSubCategories: [],
});

export const useLandingPage = () => useContext(LandingPageContext);

export const LandingPageProvider = ({
  children,
  eventSubCategories,
}: {
  children: React.ReactNode;
  eventSubCategories: EventSubCategory[];
}) => {
  const [eventSubCategoriesState, setEventSubCategoriesState] = useState<
    EventSubCategory[]
  >([]);

  useEffect(() => {
    setEventSubCategoriesState(eventSubCategories);
  }, [eventSubCategories]);

  return (
    <LandingPageContext.Provider
      value={{
        eventSubCategories: eventSubCategoriesState,
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
};
