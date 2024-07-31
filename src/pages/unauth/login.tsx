import UserAuthForm from '@/components/forms/user-auth-form';
import { Link } from 'react-router-dom';
import logo from "../../assets/Group 6.png";

const login = () => {
    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted text-white lg:flex">
                <div className="absolute inset-0 dark:bg-zinc-900 bg-[url('/background-image.jpg')] bg-no-repeat bg-cover bg-center" />
                <div className="relative z-20 flex items-center text-lg font-medium p-10">
                    <img src={logo} width={'40%'} />
                </div>
            </div>
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome to BookWormy
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email &amp; password below to login your
                            account
                        </p>
                    </div>
                    <UserAuthForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link
                            to="/terms"
                            className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            to="/privacy"
                            className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                        <br />
                        Developed by ITREX
                    </p>
                </div>
            </div>
        </div>
    );
}

export default login