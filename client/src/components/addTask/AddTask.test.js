import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTask from "./AddTask";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import "@testing-library/user-event";

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test("renders AddTask component", () => {
  render(<AddTask />);
  expect(screen.getByText("CREATE TASK")).toBeInTheDocument();
});

test("submits the form with valid data", async () => {
  render(<AddTask />);

  fireEvent.change(screen.getByLabelText(/Title/i), {
    target: { value: "Test Title" },
  });
  fireEvent.change(screen.getByLabelText(/Description/i), {
    target: { value: "Test Description" },
  });

  userEvent.type(screen.getByLabelText(/Status/i), "To Do");

  fireEvent.click(
    screen.getByRole("button", { name: /Create/i, hidden: true })
  );

  await waitFor(() => {
    const successMessage = screen.queryByText(/Task created successfully/i);
    expect(successMessage).toBeInTheDocument();
  });
});

