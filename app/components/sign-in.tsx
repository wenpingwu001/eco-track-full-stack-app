import { signIn } from "@/auth";

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Signin with Github
            </button>
        </form>
    );
}
