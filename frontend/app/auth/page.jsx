"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const page = () => {
    const [mode, setMode] = useState("signin" || "signup");

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const error = {};

        if (!formData.username.trim() && mode === "signin") {
            error.username = "username is required";
        }
        if (!formData.password.trim() && mode === "signin") {
            error.password = "password is required";
        } else if (formData.password.trim().length < 6) {
            error.password = "password must be 6 character or more";
        }
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
                    >
                        Submit
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
                </div>
            </div>
        </div>
    );
};

export default page;
