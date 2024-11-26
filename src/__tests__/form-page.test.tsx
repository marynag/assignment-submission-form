import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "@/components/form/Form";
import userEvent from "@testing-library/user-event";
import { getLevels } from "@/app/actions";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock("../app/actions", () => ({
  sendForm: jest.fn(),
  getLevels: jest.fn(),
}));

describe("Form Component", () => {
  const mockLevels = ["junior", "mid", "senior"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders all input fields", () => {
      render(<Form levels={mockLevels} isLevelsLoaded={true} />);

      expect(screen.getByText(/Name/i)).toBeInTheDocument();
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toBeInTheDocument();

      expect(screen.getByText(/Email/i)).toBeInTheDocument();
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toBeInTheDocument();

      expect(screen.getByText(/Skill Level/i)).toBeInTheDocument();
      expect(screen.getAllByRole("option").length).toBe(mockLevels.length);

      expect(screen.getByText(/GitHub Repository URL/i)).toBeInTheDocument();
      const urlInput = screen.getByLabelText(/gitRepoUrl/i);
      expect(urlInput).toBeInTheDocument();

      expect(screen.getByText(/Description/i)).toBeInTheDocument();
      const descInput = screen.getByLabelText(/description/i);
      expect(descInput).toBeInTheDocument();
    });

    test("disables submit button when form is invalid", () => {
      render(<Form levels={mockLevels} isLevelsLoaded={true} />);

      const submitButton = screen.getByRole("button");
      expect(submitButton).toHaveClass("opacity-50");
    });
  });

  test("enables submit button when all fields are valid", async () => {
    render(<Form levels={mockLevels} isLevelsLoaded={true} />);

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const urlInput = screen.getByLabelText(/gitRepoUrl/i);

    const submitButton = screen.getByRole("button");

    await waitFor(() => {
      userEvent.type(nameInput, "John Doe");
      userEvent.type(emailInput, "john.doe@example.com");
      userEvent.type(descriptionInput, "This is a description.");
      userEvent.type(urlInput, "https://github.com/johndoe");

      expect(submitButton).toHaveClass("opacity-50");
    });
  });

  test("email validation", async () => {
    render(<Form levels={mockLevels} isLevelsLoaded={true} />);

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const urlInput = screen.getByLabelText(/gitRepoUrl/i);

    const submitButton = screen.getByRole("button");
    userEvent.type(nameInput, "John Doe");
    userEvent.type(descriptionInput, "This is a description.");
    userEvent.type(urlInput, "https://github.com/johndoe");

    userEvent.type(emailInput, "wrong_email!!@exmple.com");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  test("url validation", async () => {
    render(<Form levels={mockLevels} isLevelsLoaded={true} />);

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const urlInput = screen.getByLabelText(/gitRepoUrl/i);

    const submitButton = screen.getByRole("button");
    userEvent.type(nameInput, "John Doe");
    userEvent.type(descriptionInput, "This is a description.");

    userEvent.type(emailInput, "test_email@exmple.com");

    userEvent.type(urlInput, "WRONG_URL");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  test("renders dropdown with fetched levels", async () => {
    (getLevels as jest.Mock).mockResolvedValue({
      data: mockLevels,
      success: true,
    });

    render(<Form levels={mockLevels} isLevelsLoaded={true} />);

    const dropdownOptions = screen.getAllByRole("option");
    expect(dropdownOptions).toHaveLength(mockLevels.length);

    mockLevels.forEach((level) => {
      expect(screen.getByText(level)).toBeInTheDocument();
    });
  });

  test("handles levels fetch failure", async () => {
    (getLevels as jest.Mock).mockResolvedValue({
      data: [],
      success: false,
      error: "Failed to fetch levels",
    });

    render(<Form levels={[]} isLevelsLoaded={false} />);

    expect(screen.getByText(/Skill Level/i)).toBeInTheDocument();
    expect(screen.queryByRole("option")).toBeNull();
    expect(
      screen.getByText(/Error occurred while loading skills rating/i)
    ).toBeInTheDocument();
  });
});
