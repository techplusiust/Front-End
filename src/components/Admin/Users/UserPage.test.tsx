import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserPage from ".";

describe("UserPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the user management page", () => {
    render(<UserPage />);
    expect(screen.getByText("مدیریت کاربران")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("جستجو...")).toBeInTheDocument();
  });

  it("displays a list of users", () => {
    render(<UserPage />);
    expect(screen.getByText("فرگل نصیری")).toBeInTheDocument();
    expect(screen.getByText("fargol@example.com")).toBeInTheDocument();
    expect(screen.getByText("هانیه")).toBeInTheDocument();
  });

  it("filters users based on the search input", () => {
    render(<UserPage />);
    const searchInput = screen.getByPlaceholderText("جستجو...");
    fireEvent.change(searchInput, { target: { value: "هانیه" } });

    expect(screen.queryByText("فرگل نصیری")).not.toBeInTheDocument();
    expect(screen.getByText("هانیه")).toBeInTheDocument();
  });

  it("opens the edit modal with user details on edit button click", () => {
    render(<UserPage />);
    const editButton = screen.getAllByText("ویرایش")[0]; // First user's edit button
    fireEvent.click(editButton);

    expect(screen.getByText("ویرایش کاربر")).toBeInTheDocument();
    expect(screen.getByLabelText("نام پروفایل")).toHaveValue("فرگل نصیری");
    expect(screen.getByLabelText("ایمیل")).toHaveValue("fargol@example.com");
  });

  it("opens the delete confirmation modal and deletes the user", () => {
    render(<UserPage />);
    const deleteButton = screen.getAllByText("حذف")[0]; // First user's delete button
    fireEvent.click(deleteButton);

    expect(screen.getByText("هشدار حذف کاربر")).toBeInTheDocument();

    const confirmButton = screen.getByText("تایید");
    fireEvent.click(confirmButton);

    expect(screen.queryByText("فرگل نصیری")).not.toBeInTheDocument();
  });

  it("updates user details in the edit modal and closes on submit", async () => {
    render(<UserPage />);
    const editButton = screen.getAllByText("ویرایش")[0];
    fireEvent.click(editButton);

    const nameInput = screen.getByLabelText("نام پروفایل");
    fireEvent.change(nameInput, { target: { value: "John Updated" } });

    const saveButton = screen.getByText("تایید");
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(screen.queryByText("ویرایش کاربر")).not.toBeInTheDocument()
    );

    expect(screen.getByText("John Updated")).toBeInTheDocument();
  });

  it("closes the delete confirmation modal on cancel", async () => {
    render(<UserPage />);
    const deleteButton = screen.getAllByText("حذف")[0];
    fireEvent.click(deleteButton);

    expect(screen.getByText("هشدار حذف کاربر")).toBeInTheDocument();

    const cancelButton = screen.getByText("انصراف");
    fireEvent.click(cancelButton);

    await waitFor(() =>
      expect(screen.queryByText("هشدار حذف کاربر")).not.toBeInTheDocument()
    );
  });
});
