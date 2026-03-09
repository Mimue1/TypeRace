import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import { Timer } from './Timer'

describe("Timer component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() =>{
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });
  
  const setup = (countdownStarted: boolean , startSeconds: number) => {
      render(<Timer countdownStarted={countdownStarted} startSeconds={startSeconds}/>);
  }

  it("renders the initial time correctly", () => {
    setup(false, 90);
    expect(screen.getByText("01:30")).toBeInTheDocument();
  });

});