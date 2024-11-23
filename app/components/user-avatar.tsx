import { auth, signOut } from "@/auth";

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
            <button
                onClick={async () => {
                    "use server";
                    await signOut();
                }}
                className="ml-4 p-2 bg-red-500 text-white rounded"
            >
                Sign Out
            </button>
        </div>
    );
}
