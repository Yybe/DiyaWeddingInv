import floralCorner from "../assets/images/floral-corner.png";

const CORNER_TRANSFORMS = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0 -scale-x-100",
  "bottom-left": "bottom-0 left-0 -scale-y-100",
  "bottom-right": "bottom-0 right-0 -scale-x-100 -scale-y-100",
};

/** Decorative corner floral flourish. Purely ornamental — hidden from a11y tree. */
export default function CornerMotif({ position = "top-left", className = "" }) {
  return (
    <img
      src={floralCorner}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none absolute w-16 sm:w-20 opacity-70 ${CORNER_TRANSFORMS[position]} ${className}`}
    />
  );
}
