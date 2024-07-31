"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
// import { AppDispatch, RootState } from "@/store";
// import { login } from "@/store/features/auth-slice";
import GoogleSignInButton from "../ui/google-auth-button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useToast } from "../ui/use-toast";
import { confirmOtp, register } from "@/slices/authSlice";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name field is required" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password field is required" }),
});

const otpSchema = z.object({
  code: z.string().min(6, {
    message: "Your code must be 6 characters.",
  }),
})

const googleLogin = false;

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthCreateForm() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();
  const [showOTP, setShowOTP] = useState(false);

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const optForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  })

  const { status, error, otpStatus } = useSelector(
    (state: RootState) => state.auth
  );

  const onSubmit = async (data: UserFormValue) => {
    await dispatch(register(data));

  };

  const onOtpSubmit = async (data: z.infer<typeof otpSchema>) => {
    await dispatch(confirmOtp({ ...data, email: form.getValues('email') }));
  }

  const resentOtp = () => {
    // TODO: API RESENT OTP
    console.log('[Resent OTP]')
  }

  useEffect(() => {
    if (status === 'succeeded') {
      setShowOTP(true);
    } else if (status === 'failed') {
      toast({ variant: "destructive", description: error, title: "LOGIN ERROR!" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    if (otpStatus === 'succeeded') {
      navigate("/dashboard");
    } else if (otpStatus === 'failed') {
      toast({ variant: "destructive", description: error, title: "OTP ERROR!" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpStatus])



  return (
    <>
      {!showOTP && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name..."
                      disabled={status === 'loading'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      disabled={status === 'loading'}
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
                      disabled={status === 'loading'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-5">
              <Button
                disabled={status === 'loading'}
                loading={status === 'loading'}
                className="ml-auto w-full"
                type="submit">
                Create Account
              </Button>
            </div>
          </form>
        </Form>
      )}
      {showOTP && (
        <>
          <Form {...optForm}>
            <form onSubmit={optForm.handleSubmit(onOtpSubmit)} className="">
              <FormField
                control={optForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="ml-auto w-full"
                disabled={otpStatus === 'loading'}
                loading={otpStatus === 'loading'}
                type="submit">
                Submit 60s
              </Button>
              {/* TODO: countdown must developed */}
              <Button
                className="ml-auto w-full mt-2"
                type="button"
                variant={'outline'}
                onClick={() => resentOtp()}
              >
                Resend OTP
              </Button>
            </form>
          </Form>

        </>
      )
      }
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
        onClick={() => navigate('/auth/login')}>
        Login
      </Button>
      {
        googleLogin && (
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
        )
      }
      {googleLogin && <GoogleSignInButton />}
    </>
  );
}
