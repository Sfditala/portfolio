import type { SimpleIcon } from "simple-icons";

export default function BrandIcon({
  icon,
  className = "size-5",
}: {
  icon: SimpleIcon;
  className?: string;
}) {
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}
