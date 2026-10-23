import type { ReactNode } from 'react';

type AccProps = {
  children: ReactNode;
};

export function Acc({ children }: AccProps) {
  return <em className="acc">{children}</em>;
}
