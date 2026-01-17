"use client";
import { Button } from "@/components/ui/button";
import {
    useSigninUserMutation,
    useSignupUserMutation,
} from "@/features/UserAuthApi";
import { SetRefreshCookie, SetTokenCookie } from "@/lib/setCookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const page = () => {
    const [mode, setMode] = useState("signin" || "signup");
    const [authError, setAuthError] = useState();
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const [
        signin,
        {
            isLoading: isSigninLoading,
            isSuccess: isSigninSuccess,
            data: signinData,
            isError: isSigninError,
        },
    ] = useSigninUserMutation();
    const [
        signup,
        {
            isLoading: isSignupLoading,
            isSuccess: isSignupSuccess,
            data: signupData,
            isError: isSignupError,
        },
    ] = useSignupUserMutation();

    const validate = () => {
        const error = {};

        if (!formData.username.trim() && mode === "signin") {
            error.username = "username is required";
        }
        if (!formData.password.trim() && mode === "signin") {
            error.password = "password is required";
        }
        // else if (formData.password.trim().length < 6) {
        //     error.password = "password must be 6 character or more";
        // }
        if (!formData.username.trim() && mode === "signup") {
            error.username = "username is required";
        }
        if (!formData.email.trim() && mode === "signup") {
            error.email = "email is required";
        }
        if (!formData.password.trim() && mode === "signup") {
            error.password = "password is required";
        }

        return {
            isValid: Object.keys(error).length === 0,
            error,
        };
    };

    const handleSubmit = async () => {
        const { isValid, error } = validate();

        if (!isValid) {
            setErrors(error);
            return;
        }

        setErrors({});
        try {
            if (mode === "signin") {
                const res = signin({
                    username: formData.username,
                    password: formData.password,
                });

                const { data, error } = await res;

                if (!error) {
                    if (data.success) {
                        const { token } = data.data;
                        await SetTokenCookie(token);

                        setFormData({
                            username: "",
                            email: "",
                            password: "",
                        });

                        router.push("/");
                    }
                    setAuthError(null);
                } else {
                    setAuthError("cant log in in whit provided credentials.");
                }
            }

            if (mode === "signup") {
                const res = signup({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });

                const { data, error } = await res;

                if (!error) {
                    if (data.success) {
                        const signinRes = signin({
                            username: formData.username,
                            password: formData.password,
                        });

                        const { data: resData, error: resError } =
                            await signinRes;

                        if (!resError) {
                            if (resData.success) {
                                const { token } = resData.data;
                                await SetTokenCookie(token);

                                setFormData({
                                    username: "",
                                    email: "",
                                    password: "",
                                });

                                router.push("/");
                            }
                        }
                        setAuthError(null);
                    }
                } else {
                    setAuthError(error.data.message);
                }
            }
        } catch (error) {
            console.log("error in authentication user", error);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="w-full h-screen flex items-center justify-center">
                <div className="flex flex-col gap-4 bg-black p-4 border border-white/30 rounded-lg w-120 select-none">
                    <div className="flex gap-2">
                        <Button className="" onClick={(e) => setMode("signin")}>
                            SignIn
                        </Button>
                        <Button className="" onClick={(e) => setMode("signup")}>
                            SignUp
                        </Button>
                    </div>
                    <p className="font-bold text-xl">
                        {mode === "signin"
                            ? "Sign in to account"
                            : "Create an account"}
                    </p>
                    {mode === "signin" ? (
                        <div className="flex flex-col gap-2">
                            <input
                                className="py-2 px-4 font-bold outline-0 border border-white/50 rounded-lg"
                                placeholder="username"
                                value={formData.username}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    });
                                }}
                            />
                            {Boolean(errors.username) && (
                                <p className="text-sm text-red-500">
                                    {errors.username}
                                </p>
                            )}
                            <input
                                className="py-2 px-4 font-bold outline-0 border border-white/50 rounded-lg"
                                placeholder="password"
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    });
                                }}
                            />
                            {Boolean(errors.password) && (
                                <p className="text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <input
                                className="py-2 px-4 font-bold outline-0 border border-white/50 rounded-lg"
                                placeholder="username"
                                value={formData.username}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    });
                                }}
                            />
                            {Boolean(errors.username) && (
                                <p className="text-sm text-red-500">
                                    {errors.username}
                                </p>
                            )}
                            <input
                                className="py-2 px-4 font-bold outline-0 border border-white/50 rounded-lg"
                                placeholder="email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    });
                                }}
                            />
                            {Boolean(errors.email) && (
                                <p className="text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                            <input
                                className="py-2 px-4 font-bold outline-0 border border-white/50 rounded-lg"
                                placeholder="password"
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    });
                                }}
                            />
                            {Boolean(errors.password) && (
                                <p className="text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    )}

                    <Button
                        onClick={handleSubmit}
                        className={"active:scale-[0.9]"}
                        disabled={isSignupLoading || isSigninLoading}
                    >
                        {isSignupLoading || isSigninLoading
                            ? "Loading..."
                            : "Submit"}
                    </Button>
                    <hr />
                    <p>OR {mode} WHIT</p>
                    <div className="w-full flex gap-2 items-center justify-center">
                        <Button variant="outline" className={"basis-[50%]"}>
                            Google
                        </Button>
                        <Button variant="outline" className={"basis-[50%]"}>
                            Github
                        </Button>
                    </div>
                    {authError && mode === "signin" ? (
                        <div className="w-full text-red-500 text-center">
                            <p>{authError}</p>
                        </div>
                    ) : authError && mode === "signup" ? (
                        <div className="w-full text-red-500 text-center">
                            {authError?.username && (
                                <p>username : {authError.username}</p>
                            )}
                            {authError?.email && (
                                <p>email : {authError.email}</p>
                            )}
                            {authError?.password && (
                                <p>password : {authError.password}</p>
                            )}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default page;
