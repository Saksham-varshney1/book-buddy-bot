import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-bookstore-primary">
              BookHaven
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Hi, {user.firstName || "Reader"}
                </span>
                <SignOutButton>
                  <Button variant="outline">Sign Out</Button>
                </SignOutButton>
              </div>
            ) : (
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};