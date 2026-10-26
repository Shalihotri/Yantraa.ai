import "./brand.css";

/** Optimized supplied logo; the original remains in /logo. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <img
      className={`brand-mark ${className}`}
      src="./brand/yantraa-mark.webp?v=3"
      width="508"
      height="494"
      alt=""
      decoding="async"
    />
  );
}
