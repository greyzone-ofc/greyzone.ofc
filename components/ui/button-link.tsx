import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex h-12 items-center gap-2 rounded-button px-5 text-button font-bold tracking-button uppercase transition-colors";

const variants = {
  primary: "bg-signal text-white hover:bg-deep active:bg-deep",
  outline: "border border-black hover:bg-black hover:text-white",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  variant?: keyof typeof variants;
  icon?: ReactNode;
  children: string;
};

export function ButtonLink({ variant = "primary", icon, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={[base, variants[variant], className].filter(Boolean).join(" ")} {...props}>
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon}
    </Link>
  );
}
