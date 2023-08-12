"use client";

import { useSession } from "next-auth/react";
import SignInBtn from "./SignInBtn";
import Profile from "./Profile";
import AddDetails from "./AddDetails";

export default function UserInfo() {
    const { status, data: session } = useSession();

    if (status === "authenticated") {
        return (
            <>
                {!session?.user?.description || !session?.user?.resume ?
                    <AddDetails />
                    :
                    <Profile session={session} />
                }
            </>
        );
    } else {
        return <SignInBtn />;
    }
}
