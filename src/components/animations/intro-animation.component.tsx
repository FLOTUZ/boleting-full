import { SlideFade } from "@chakra-ui/react";

interface IntroAnimationComponentProps<T> {
  // Template data type
  data: T;
  children?: JSX.Element | JSX.Element[];
}

const IntroAnimationComponent = ({
  data,
  children,
}: IntroAnimationComponentProps<any>) => {
  return (
    <SlideFade in={data != null} offsetY="100px">
      {children}
    </SlideFade>
  );
};

export default IntroAnimationComponent;
