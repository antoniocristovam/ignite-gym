import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      h={14}
      px={4}
      mb={4}
      bg={"gray.700"}
      borderWidth={0}
      fontSize={"md"}
      color={"white"}
      fontFamily={"body"}
      placeholderTextColor={"gray.300"}
      {...rest}
    />
  );
}
