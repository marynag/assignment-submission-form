import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/thank-you/page";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      back: jest.fn(),
      forward: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    };
  },
}));

describe("Page", () => {
  test("renders the thank you message", () => {
    render(<Page />);
    const thankYouText = screen.getByText(
      "Thank you for submitting your assignment!"
    );
    expect(thankYouText).toBeInTheDocument();
  });

  test("renders the icon button", () => {
    render(<Page />);
    const iconButton = screen.getByAltText("icon");
    expect(iconButton).toBeInTheDocument();
  });
});
