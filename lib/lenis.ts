import type Lenis from "lenis";

/** Shared handle to the page's Lenis instance, so components can drive smooth scrolling. */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
