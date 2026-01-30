import "@testing-library/jest-dom/vitest";

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  constructor(public callback: IntersectionObserverCallback) {}
}

Object.defineProperty(window, "IntersectionObserver", {
  value: MockIntersectionObserver,
});

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock canvas
HTMLCanvasElement.prototype.getContext = (() => ({
  clearRect: () => {},
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  scale: () => {},
  fillStyle: "",
})) as never;

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: () => Promise.resolve(),
  },
});
