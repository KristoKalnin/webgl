// @vitest-environment jsdom

import Index from "../index.svelte";
import { cleanup, render, screen } from "@testing-library/svelte";
import { beforeEach, test, expect } from "vitest";

beforeEach(cleanup);

test("Render page", () => {
    render(Index);
});

/*
test("can find the correct page title", () => {
    const { getByText } = render(Index);
    expect(getByText("About this app")).toBeDefined();
});

test("has input fields", () => {
    let { container } = render(Index);
    expect(container.querySelectorAll("input").length).toBe(4);
});
test("has buttons", () => {
    let { container } = render(Index);
    expect(container.querySelectorAll("button").length).toBe(7);
});

test("has width input field", () => {
    render(Index);
    let input = screen.getByPlaceholderText("width");
    expect(input).toBeDefined();
});
test("has length input field", () => {
    render(Index);
    let input = screen.getByPlaceholderText("length");
    expect(input).toBeDefined();
});
*/