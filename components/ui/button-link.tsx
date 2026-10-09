import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "inline-flex h-12 items-center rounded-button px-5 text-button font-bold tracking-button uppercase";

const variants = {
  primary: "bg-signal text-white hover:bg-deep",
  outline: "border border-black",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
};

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link className={[base, variants[variant], className].filter(Boolean).join(" ")} {...props} />;
}
