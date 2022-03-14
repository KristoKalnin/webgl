// @vitest-environment jsdom

// simple test to check if vitest can load .svelte files without errors
import { test, expect } from "vitest"
import { render } from "@testing-library/svelte"

import Index from "../check.svelte";

test(".svelte files can be loaded", () => {
    const { getByText } = render(Index)
    expect(getByText("Welcome to SvelteKit.")).toBeTruthy()
})