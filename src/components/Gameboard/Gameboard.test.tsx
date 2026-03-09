import {beforeEach, describe, expect, it, vi} from 'vitest'
import { render, screen } from "@testing-library/react";
import { Gameboard } from './Gameboard'

describe("Gameboard", () => {

    const setup = () => {
        const challangeWords = ["a", "b", "c"]

        render(
            <Gameboard challangeWords={challangeWords}/> 
        )
    }

    beforeEach(() => {
        vi.clearAllMocks();
    })

    it("renders correctly", () => {
        setup();

        expect(screen.getByText(/Words\/Minute/)).toBeInTheDocument();

        expect(screen.getByRole("button", {name: "30 sek"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "1 min"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "2 min"})).toBeInTheDocument();
        
        expect(screen.getAllByPlaceholderText("press Space...").length).toBeGreaterThan(0);

        expect(screen.getByText(/Score:/)).toBeInTheDocument();

        expect(screen.getByRole("button", {name: "Start"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Reset"})).toBeInTheDocument();
    });
});