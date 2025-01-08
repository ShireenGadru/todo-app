import { render, screen } from "@testing-library/react";
import App from "./App";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";

describe("Todo App", () => {
  it("should add todo", async () => {
    render(<App />);
    const todoInput = screen.getByRole("textbox");
    const submitBtn = screen.getByRole("button", { name: "Enter" });

    await userEvent.type(todoInput, "new todo");
    await userEvent.click(submitBtn);

    const newTodo = screen.getByText("new todo");
    expect(newTodo).toBeInTheDocument();
  });

  it("should remove todo", async () => {
    render(<App />);
    const todoItem = screen.queryByText("Do the dishes");
    const removeBtn = screen.getAllByRole("button", { name: "X" })[0];
    expect(todoItem).toBeInTheDocument();
    await userEvent.click(removeBtn);
    expect(todoItem).not.toBeInTheDocument();
  });

  it("should display edit input when edit button is clicked", async () => {
    render(<App />);
    const editBtn = screen.getAllByRole("button", { name: "Edit" })[0];
    await userEvent.click(editBtn);
    const editInput = screen.queryAllByRole("textbox")[1];
    expect(editInput).toBeInTheDocument();
  });

  it("should edit todo", async () => {
    render(<App />);
    const editBtn = screen.getAllByRole("button", { name: "Edit" })[0];
    await userEvent.click(editBtn);
    const editInput = screen.queryAllByRole("textbox")[1];
    await userEvent.type(editInput, " before 5pm");
    const submitButton = screen.queryAllByRole("button", {name: "Enter"})[1];
    await userEvent.click(submitButton );
    screen.debug();
    const editedTodo = screen.getByText("Do the dishes before 5pm");
    expect(editedTodo).toBeInTheDocument();
  });
});
