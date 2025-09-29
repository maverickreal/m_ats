import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Meta = () => {
    return [
        { title: "m_ats | auth" },
        { name: "description", content: "Sign in to your account." }
    ];
};

const Auth: React.FC = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1];
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(next);
        }
    }, [auth.isAuthenticated, next]);

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Hi there!</h1>
                        <h2>Sign in to your account.</h2>
                    </div>

                    <div>{
                        isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Logging you in ...</p>
                            </button>
                        ) : (
                            <>{
                                auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        Sign out.
                                    </button>) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        Sign in.
                                    </button>
                                )
                            }</>
                        )
                    }</div>
                </section>
            </div>
        </main>
    );
};

export default Auth;
