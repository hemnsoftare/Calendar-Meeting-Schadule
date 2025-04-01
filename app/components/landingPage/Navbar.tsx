import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png"; // ✅ Importing the image
import AuthModal from "./AuthModal";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-5">
      <Link
        href="/"
        className="text-2xl flex items-center justify-center gap-2 font-bold text-gray-800"
      >
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={50}
          className="size-10"
        />
        <h4 className="text-3xl font-semibold">
          Cal<span className="text-blue-500">ender</span>
        </h4>
      </Link>
      <AuthModal />
    </div>
  );
};

export default Navbar;
