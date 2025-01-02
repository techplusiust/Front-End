import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import TeacherDetailsPage from "./TeacherDetailsPage";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockTeacher = {
  name: "John Doe",
  degree: "PhD in Computer Science",
  subject: "Algorithms",
  daysAvailable: "Monday, Wednesday, Friday",
  image: "teacher.jpg",
  reviews: ["Excellent teacher!", "Very knowledgeable."],
};

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    useLocation: vi.fn(), // فقط useLocation شبیه‌سازی می‌شود
  };
});

describe("TeacherDetailsPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks between tests
    (useLocation as any).mockReturnValue({ state: mockTeacher });
  });

  it("renders teacher details correctly", () => {
    render(
      <MemoryRouter>
        <TeacherDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(mockTeacher.name)).toBeInTheDocument();
    expect(screen.getByText(mockTeacher.degree)).toBeInTheDocument();
    expect(
      screen.getByText(`موضوع تدریس: ${mockTeacher.subject}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`روزهای حضور: ${mockTeacher.daysAvailable}`)
    ).toBeInTheDocument();
  });

  it("displays a message when no reviews are available", () => {
    (useLocation as any).mockReturnValue({
      state: { ...mockTeacher, reviews: [] },
    });
    render(
      <MemoryRouter>
        <TeacherDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByText("هنوز نظری ثبت نشده است.")).toBeInTheDocument();
  });

  it("adds a new review when submitted", () => {
    render(
      <MemoryRouter>
        <TeacherDetailsPage />
      </MemoryRouter>
    );

    const reviewInput = screen.getByPlaceholderText("نظر خود را وارد کنید...");
    const submitButton = screen.getByText("ثبت نظر");

    fireEvent.change(reviewInput, {
      target: { value: "Great teaching style!" },
    });
    fireEvent.click(submitButton);

    expect(screen.getByText("Great teaching style!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("نظر خود را وارد کنید...")).toHaveValue(
      ""
    );
  });

  it("does not add an empty review", () => {
    render(
      <MemoryRouter>
        <TeacherDetailsPage />
      </MemoryRouter>
    );

    const submitButton = screen.getByText("ثبت نظر");

    fireEvent.click(submitButton);

    expect(screen.queryByText("Great teaching style!")).not.toBeInTheDocument();
    mockTeacher.reviews.forEach((review) => {
      expect(screen.getByText(review)).toBeInTheDocument();
    });
  });
});
