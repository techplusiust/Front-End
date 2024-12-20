import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditUserForm from "./EditUserForm";
import { describe, it, expect } from 'vitest';

describe("EditUserForm Component", () => {
  it("renders the form correctly with all fields and image", () => {
    render(<EditUserForm />);

    expect(screen.getByLabelText("نام پروفایل")).toBeInTheDocument();
    expect(screen.getByLabelText("کد ملی")).toBeInTheDocument();
    expect(screen.getByLabelText("ایمیل")).toBeInTheDocument();
    expect(screen.getByLabelText("شماره دانشجویی")).toBeInTheDocument();

    expect(screen.getByTestId("department-select")).toBeInTheDocument();

    const image = screen.getByAltText("Decorative Illustration");
    expect(image).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<EditUserForm />);

    const submitButton = screen.getByRole("button", { name: "ذخیره تغییرات" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("نام پروفایل را وارد نمایید")).toBeInTheDocument();
      expect(screen.getByText("کد ملی را وارد نمایید")).toBeInTheDocument();
      expect(screen.getByText("ایمیل را وارد نمایید")).toBeInTheDocument();
      expect(screen.getByText("رشته تحصیلی را وارد نمایید")).toBeInTheDocument();
    });
  });

  it("renders the decorative image (edituserimage.jpg)", () => {
    render(<EditUserForm />);
  
    // Check if the image is rendered with the correct src and alt text
    const imageElement = screen.getByRole("img", { name: "Decorative Illustration" });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/src/assets/fonts/iranyekan/Images/edituserimage.jpg");
    expect(imageElement).toHaveAttribute("alt", "Decorative Illustration");
  });

  it("does not allow editing the read-only student number field", () => {
    render(<EditUserForm />);

    const studentNumberField = screen.getByLabelText("شماره دانشجویی");
    expect(studentNumberField).toHaveAttribute("readonly");
  });
});
