import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Trimmed brand wordmark. `light` = for dark backgrounds. Source is 318×138. */
export function Logo({ light, className, priority }: { light?: boolean; className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="InsideEdge — home" className={cn("inline-flex shrink-0", className)}>
      <Image
        src={light ? "/brand/logo-light.png" : "/brand/logo-dark.png"}
        alt="InsideEdge"
        width={318}
        height={138}
        priority={priority}
        sizes="120px"
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
