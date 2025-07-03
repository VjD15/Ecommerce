import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="m16.19 2-8.38 8.38-5.81 5.81 5.81 5.81 8.38-8.38 5.81-5.81-5.81-5.81Z"/><path d="m2.19 16.19 5.81-5.81"/><path d="m16.19 2.19 5.81 5.81"/></svg>
      <span className="font-headline text-xl font-bold tracking-tight">PricePilot</span>
    </Link>
  );
}
