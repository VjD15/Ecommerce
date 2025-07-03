import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { UserNav } from "./user-nav";
import { SearchBar } from "./search-bar";
import { CartNav } from "./cart-nav";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="ml-6 hidden items-center space-x-4 md:flex">
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/categories">Categories</NavLink>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchBar />
          </div>
          <CartNav />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}
