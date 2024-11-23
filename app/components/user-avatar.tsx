import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/button";

export default async function UserAvatar() {
    const session = await auth();

    if (!session?.user || !session.user.image) return null;

    return (
        <div className="flex flex-row items-center">
            <img
                src={session.user.image || ""}
                alt={session.user.name || ""}
                width={50}
            />
            <p className="m-5">
                {session.user.email} ({session.user.name})
            </p>
            <Button
                onClick={async () => {
                    "use server";
                    await signOut();
                }}
            >
                Sign Out
            </Button>
        </div>
    );
}
