"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useEffect } from "react";
import GoogleSignInButton from "../ui/google-auth-button";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { login } from "@/slices/authSlice";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password field is required" }),
});

const googleLogin = false;

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const defaultValues = {
    email: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // const { isLoadingLogin } = useSelector(
  //   (state: RootState) => state.authentication
  // );

  const onSubmit = async (data: UserFormValue) => {
    console.log("[UserAuthForm] onSubmit - ", data);
    await dispatch(login(data));
  };

  useEffect(() => {
    console.log('[authState] - ', status)
    if (status === 'succeeded') {
      navigate("/dashboard");
    } else if (status === 'failed') {
      toast({ variant: "destructive", description: error, title: "LOGIN ERROR!" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])


  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    // disabled={isLoadingLogin}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    // disabled={isLoadingLogin}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={status === 'loading'}
            loading={status === 'loading'}
            className="ml-auto w-full"
            type="submit">
            Login
          </Button>

        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        // disabled={isLoadingLogin}
        // loading={isLoadingLogin}
        className="ml-auto w-full"
        variant={'outline'}
        onClick={() => navigate('/auth/create')}>
        Create Account
      </Button>
      {googleLogin && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      )}
      {googleLogin && <GoogleSignInButton />}
    </>
  );
}
