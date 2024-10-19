"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  body,
  handleClick,
  className,
  destructive,
  size,
  disabled,
}: {
  disabled?: boolean;
  body: ReactNode;
  handleClick?: () => void;
  className?: string;
  destructive?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      size={size}
      variant={destructive ? "destructive" : "default"}
      className={`w-full ${className}`}
      type="submit"
      disabled={disabled == undefined ? pending : disabled}
      onClick={() => handleClick && handleClick()}
    >
      {pending ? (
        <Loader2 className="animate-spin text-rayanPrimary-dark dark:text-rayanPrimary-light" />
      ) : (
        body
      )}
    </Button>
  );
}
