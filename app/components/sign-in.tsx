import { signIn } from "@/auth";
import { Button } from "@nextui-org/button";

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <Button type="submit">
                Signin with Github
            </Button>
        </form>
    );
}
