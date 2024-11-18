"use client";

import { updateUserInfoAction } from "@/actions/update-user-info-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UpdateUserInfoSchema, UpdateUserInfoType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon } from "lucide-react";
import { type User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
  user: User;
};

const UpdateUserInfoForm = ({ user }: Props) => {
  const { data: session, update } = useSession();

  const router = useRouter();

  const form = useForm<UpdateUserInfoType>({
    resolver: zodResolver(UpdateUserInfoSchema),
    defaultValues: {
      id: user.id,
      name: user.name!,
    },
  });

  const onSubmit = async (values: UpdateUserInfoType) => {
    const response = await updateUserInfoAction(values);

    if (response?.data?.id) {
      await update({
        ...session,
        user: { ...session?.user, name: response.data.name },
      });
    }

    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="bg-yellow-600 transition-colors hover:bg-yellow-600/80"
        >
          <PencilIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Information</DialogTitle>
          <DialogDescription>
            Update your user information below
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id"
                render={() => <FormMessage />}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                Update
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserInfoForm;
