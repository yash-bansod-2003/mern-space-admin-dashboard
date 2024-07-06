import "@testing-library/jest-dom";
import { beforeEach } from "vitest";

beforeEach(() => {
  const matchMediaMock = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const coumputedStyleMock = vi.fn().mockImplementation((_) => ({}));
  vi.stubGlobal("matchMedia", matchMediaMock);
  vi.stubGlobal("computedStyle", coumputedStyleMock);
});
