import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return <div className="h-full">{children}</div>;
};

export default AuthLayout;
