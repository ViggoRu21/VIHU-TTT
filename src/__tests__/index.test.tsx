import React from "react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios';
import Home from '../pages/index';
import { beforeEach } from "node:test";

// Good starting point: https://testing-library.com/docs/react-testing-library/example-intro

// TODO setup your mock api here (from the mocks folder)
// Feel free to add more files to test various other components

const mockPush = vi.fn();
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('axios');

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title and form inputs', () => {
    render(<Home />);
    expect(screen.getByText('Tic Tac Toe #️⃣')).toBeInTheDocument();

    // Two input fields with correct placeholders
    expect(
      screen.getByPlaceholderText(/❌ Your Name/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/⭕ Opponent Name/i)
    ).toBeInTheDocument();

    // Start Game button
    const button = screen.getByRole('button', { name: /Start Game/i });
    expect(button).toBeInTheDocument();
    // Initially not disabled
    expect(button).not.toBeDisabled();

    // Link to "See all games"
    expect(screen.getByRole('link', { name: /See all games/i })).toHaveAttribute(
      'href',
      '/game/list'
    );
  });

  it('disables the button while creating and calls router.push on success', async () => {
    // Arrange: mock axios.post to resolve with { data: { id: '12345' } }
    vi.spyOn(axios, 'post').mockResolvedValue({ data: { id: '12345' } });

    render(<Home />);

    const playerInput = screen.getByPlaceholderText(/❌ Your Name/i);
    const opponentInput = screen.getByPlaceholderText(/⭕ Opponent Name/i);
    const button = screen.getByRole('button', { name: /Start Game/i });

    // Fill in names
    fireEvent.change(playerInput, { target: { value: 'Meowser' } });
    fireEvent.change(opponentInput, { target: { value: 'Bowser' } });

    // Submit form
    fireEvent.click(button);

    // Button should be disabled immediately
    expect(button).toBeDisabled();

    // Wait for axios.post and router.push to have been called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/new', {
        playerName: 'Meowser',
        secondPlayerName: 'Bowser',
      });
      expect(mockPush).toHaveBeenCalledWith('/game/12345');
    });

    // After the async flow, button should be enabled again
    expect(button).not.toBeDisabled();
  });

  it('logs an error and re-enables the button if axios.post rejects', async () => {
    // Arrange: mock axios.post to reject
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(axios, 'post').mockRejectedValue(new Error('Network Error'));

    render(<Home />);

    const playerInput = screen.getByPlaceholderText(/❌ Your Name/i);
    const opponentInput = screen.getByPlaceholderText(/⭕ Opponent Name/i);
    const button = screen.getByRole('button', { name: /Start Game/i });

    // Fill in names
    fireEvent.change(playerInput, { target: { value: 'Meowser' } });
    fireEvent.change(opponentInput, { target: { value: 'Bowser' } });

    // Submit form
    fireEvent.click(button);

    // Button should be disabled immediately
    expect(button).toBeDisabled();

    // Wait for axios.post and console.log to be called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/new', {
        playerName: 'Meowser',
        secondPlayerName: 'Bowser',
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        'failed to create ',
        expect.any(Error)
      );
    });

    // Button should be enabled again after error
    expect(button).not.toBeDisabled();

    consoleSpy.mockRestore();
  });

  it('does not call router.push if names are empty but button is clicked', async () => {
    vi.spyOn(axios, 'post').mockResolvedValue({ data: { id: '67890' } });

    render(<Home />);

    const button = screen.getByRole('button', { name: /Start Game/i });
    fireEvent.click(button);

    // Button should be disabled
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/new', {
        playerName: '',
        secondPlayerName: '',
      });
      expect(mockPush).toHaveBeenCalledWith('/game/67890');
    });

    // Button re-enabled
    expect(button).not.toBeDisabled();
  });
});