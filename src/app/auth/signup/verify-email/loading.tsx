import { LoaderIcon } from "lucide-react";

const VerifyEmailLoading = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
    </div>
  );
};

export default VerifyEmailLoading;
