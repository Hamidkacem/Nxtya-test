import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../pages/login.jsx";

describe("Login Component", () => {
  it("should render login form", () => {
    render(<Login />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should display validation error messages", () => {
    render(<Login />);

    // Submit the form without entering any data
    fireEvent.click(screen.getByText("Login"));

    // Check if the validation error messages are displayed
    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("should call userService.login when form is submitted", () => {
    // Mock the userService.login function
    const mockLogin = jest.fn();
    jest.mock("services", () => ({
      userService: {
        login: mockLogin,
      },
    }));

    render(<Login />);

    // Enter valid username and password
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "testPassword" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Login"));

    // Check if userService.login is called with the correct arguments
    expect(mockLogin).toHaveBeenCalledWith("testUser", "testPassword");
  });

  // Add more tests as needed
});
