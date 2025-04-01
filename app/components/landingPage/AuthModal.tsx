import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logo from "@/public/logo.png"; // ✅ Importing the image
import { signIn } from "@/app/lib/auth";
import { GitHubAuthButton, GoogleAuthButton } from "../SubmitButton";
export default function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="bg-blue-500 text-white">
          Try For free
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-center gap-3 text-center">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={50}
              className="size-10"
            />
            <h4 className="text-3xl font-semibold">
              Cal<span className="text-primary">ender</span>
            </h4>
          </DialogTitle>
          <DialogDescription className="text-center">
            Login with your preferred method
          </DialogDescription>
        </DialogHeader>

        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
          className="flex gap-4 "
        >
          <GoogleAuthButton />
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
          className="flex gap-4 "
        >
          <GitHubAuthButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}
