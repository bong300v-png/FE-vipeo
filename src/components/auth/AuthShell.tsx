import Link from "next/link";
import { LogoIcon } from "@/components/icons";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-[22rem] flex-col items-center gap-y-8 md:w-8/12 lg:w-5/12 xl:w-4/12">
        <Link href="/" aria-label="Home Page" className="flex justify-center">
          <LogoIcon className="w-20 lg:w-[95px]" />
        </Link>
        <div className="bg-background flex w-full flex-col gap-y-6 rounded-lg px-6 md:px-8 md:py-6 xl:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-y-1">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-x-4">
      <span className="bg-border h-px flex-1" />
      <span className="text-muted-foreground text-xs tracking-wide uppercase">
        Or continue with
      </span>
      <span className="bg-border h-px flex-1" />
    </div>
  );
}
