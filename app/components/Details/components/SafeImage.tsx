import { useState, useRef, useEffect } from "react";
import { FALLBACK_IMAGE } from "../../../lib/images";
import type { SafeImageProps } from "../Details.types";

function SafeImage({ src, alt, className, loading }: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <img
      ref={ref}
      src={failed ? FALLBACK_IMAGE : src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
export default SafeImage;
