import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserPage from ".";

describe("UserPage Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders the user management page", () => {
    render(<UserPage />);
    expect(screen.getByText("مدیریت کاربران")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("جستجو...")).toBeInTheDocument();
  });

  it("displays a list of users", () => {
    render(<UserPage />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("filters users based on the search input", () => {
    render(<UserPage />);
    const searchInput = screen.getByPlaceholderText("جستجو...");
    fireEvent.change(searchInput, { target: { value: "Jane" } });

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("opens the edit modal with user details on edit button click", () => {
    render(<UserPage />);
    const editButton = screen.getAllByText("ویرایش")[0]; // First user's edit button
    fireEvent.click(editButton);

    expect(screen.getByText("ویرایش کاربر")).toBeInTheDocument();
    expect(screen.getByLabelText("نام پروفایل")).toHaveValue("John Doe");
    expect(screen.getByLabelText("ایمیل")).toHaveValue("john@example.com");
  });

  //   it("updates user details in the edit modal and closes on submit", () => {
  //     render(<UserPage />);
  //     const editButton = screen.getAllByText("ویرایش")[0];
  //     fireEvent.click(editButton);

  //     const nameInput = screen.getByLabelText("نام پروفایل");
  //     fireEvent.change(nameInput, { target: { value: "John Updated" } });

  //     const saveButton = screen.getByText("تایید");
  //     fireEvent.click(saveButton);

  //     expect(screen.queryByText("ویرایش کاربر")).not.toBeInTheDocument();
  //     expect(screen.getByText("John Updated")).toBeInTheDocument();
  //   });

  it("opens the delete confirmation modal and deletes the user", () => {
    render(<UserPage />);
    const deleteButton = screen.getAllByText("حذف")[0]; // First user's delete button
    fireEvent.click(deleteButton);

    expect(screen.getByText("هشدار حذف کاربر")).toBeInTheDocument();

    const confirmButton = screen.getByText("تایید");
    fireEvent.click(confirmButton);

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("updates user details in the edit modal and closes on submit", async () => {
    render(<UserPage />);
    const editButton = screen.getAllByText("ویرایش")[0];
    fireEvent.click(editButton);

    const nameInput = screen.getByLabelText("نام پروفایل");
    fireEvent.change(nameInput, { target: { value: "John Updated" } });

    const saveButton = screen.getByText("تایید");
    fireEvent.click(saveButton);

    // Wait for the modal to close
    await waitFor(() =>
      expect(screen.queryByText("ویرایش کاربر")).not.toBeInTheDocument()
    );

    // Confirm the updated name is displayed
    expect(screen.getByText("John Updated")).toBeInTheDocument();
  });

  it("closes the delete confirmation modal on cancel", async () => {
    render(<UserPage />);
    const deleteButton = screen.getAllByText("حذف")[0];
    fireEvent.click(deleteButton);

    expect(screen.getByText("هشدار حذف کاربر")).toBeInTheDocument();

    const cancelButton = screen.getByText("انصراف");
    fireEvent.click(cancelButton);

    // Wait for the modal to close
    await waitFor(() =>
      expect(screen.queryByText("هشدار حذف کاربر")).not.toBeInTheDocument()
    );
  });

  //   it("closes the delete confirmation modal on cancel", () => {
  //     render(<UserPage />);
  //     const deleteButton = screen.getAllByText("حذف")[0];
  //     fireEvent.click(deleteButton);

  //     expect(screen.getByText("هشدار حذف کاربر")).toBeInTheDocument();

  //     const cancelButton = screen.getByText("انصراف");
  //     fireEvent.click(cancelButton);

  //     expect(screen.queryByText("هشدار حذف کاربر")).not.toBeInTheDocument();
  //   });
});
