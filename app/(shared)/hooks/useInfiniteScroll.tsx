import { useEffect, useRef } from "react";

export function useIntersection(
  onReachBottomHandler: () => void,
  options: IntersectionObserverInit = {},
) {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onReachBottomHandler();
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [options, onReachBottomHandler]);

  return { targetRef };
}
