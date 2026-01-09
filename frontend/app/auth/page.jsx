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
    const [error, setError] = useState({
        username: "",
        email: "",
        password: "",
    });

    const validate = () => {
        if (!formData.username.trim() && mode === "signin") {
            setError((prev) => ({
                ...prev,
                username: "username is required",
            }));
        } else if (!formData.password.trim() && mode === "signin") {
            setError((prev) => ({
                ...prev,
                password: "password is required",
            }));
        } else if (!formData.username.trim() && mode === "signup") {
            setError((prev) => ({
                ...prev,
                username: "username is required",
            }));
        } else if (!formData.email.trim() && mode === "signup") {
            setError((prev) => ({
                ...prev,
                email: "email is required",
            }));
        } else if (!formData.password.trim() && mode === "signup") {
            setError((prev) => ({
                ...prev,
                password: "password is required",
            }));
        } else {
            setError({
                username: "",
                email: "",
                password: "",
            });
        }

        return error;
    };

    const handleSubmit = async () => {
        validate();

        console.log(error);
    };

    console.log(mode);

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
                            {error.username && (
                                <p className="text-sm text-red-500">
                                    {error.username}
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
                            {error.password && (
                                <p className="text-sm text-red-500">
                                    {error.password}
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
                            {error.username && (
                                <p className="text-sm text-red-500">
                                    {error.username}
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
                            {error.email && (
                                <p className="text-sm text-red-500">
                                    {error.email}
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
                            {error.password && (
                                <p className="text-sm text-red-500">
                                    {error.password}
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
