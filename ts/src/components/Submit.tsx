import Button, { ButtonProps } from "@components/Button";

function Submit({ children, ...rest }: ButtonProps) {
  return (
    <Button type="submit" {...rest}>
      {children}
    </Button>
  );
}

export default Submit;
