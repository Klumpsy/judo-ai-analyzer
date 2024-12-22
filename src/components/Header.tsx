"use client";

import { useUser } from "@/hooks/useUser";
import { belts } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useUser();
  const userBelt = belts.find((belt) => belt.name === user?.rank);

  return (
    <header className="p-1 bg-gray-900 text-white flex justify-between items-center border-b border-white">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Judo AI Analyzer Logo"
          width={100}
          height={40}
          className="cursor-pointer"
        />
      </Link>
      <div>
        <Link href="/waza">Waza</Link>
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <span className="text-sm hidden md:inline-block">
              {user.useUsername && user.username ? user.username : user.email}
            </span>
            <Link href="/profile">
              <span className="text-gray-400 hover:text-white">
                <FaUserCircle size={24} />
              </span>
            </Link>
            {userBelt && (
              <Image
                src={userBelt.image}
                alt={userBelt.name}
                width={40}
                height={40}
                className="rounded"
              />
            )}
            <button
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
        {!user && (
          <Link href="/auth/login">
            <span className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
              Login
            </span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
