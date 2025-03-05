
// Unit tests for: Header

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../../api/redditSlice";
import Header from '../header';
import "@testing-library/jest-dom";

// Mock the setSearchTerm function
jest.mock("../../../api/redditSlice", () => {
  const originalModule = jest.requireActual("../../../api/redditSlice");
  return {
    __esModule: true,
    ...originalModule,
    setSearchTerm: jest.fn(),
  };
});

// Mock useSelector and useDispatch from react-redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Header() Header method', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  describe('Happy Paths', () => {
    test('renders the Header component with default elements', () => {
      // Arrange
      useSelector.mockReturnValue('');

      // Act
      render(<Header />);

      // Assert
      expect(screen.getByText('RedditReader')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    test('updates local search term state on input change', () => {
      // Arrange
      useSelector.mockReturnValue('');
      render(<Header />);
      const input = screen.getByPlaceholderText('Search');

      // Act
      fireEvent.change(input, { target: { value: 'React' } });

      // Assert
      expect(input.value).toBe('React');
    });

    test('dispatches setSearchTerm action on form submit', () => {
      // Arrange
      useSelector.mockReturnValue('');
      render(<Header />);
      const input = screen.getByPlaceholderText('Search');
      const button = screen.getByRole('button', { name: /search/i });

      // Act
      fireEvent.change(input, { target: { value: 'React' } });
      fireEvent.click(button);

      // Assert
      expect(setSearchTerm).toHaveBeenCalledWith('React');
      expect(dispatchMock).toHaveBeenCalledWith(setSearchTerm('React'));
    });
  });

  describe('Edge Cases', () => {
    test('handles empty search term gracefully', () => {
      // Arrange
      useSelector.mockReturnValue('');
      render(<Header />);
      const button = screen.getByRole('button', { name: /search/i });

      // Act
      fireEvent.click(button);

      // Assert
      expect(setSearchTerm).toHaveBeenCalledWith('');
      expect(dispatchMock).toHaveBeenCalledWith(setSearchTerm(''));
    });

    test('updates local search term when global search term changes', () => {
      // Arrange
      useSelector.mockReturnValue('Redux');
      render(<Header />);
      const input = screen.getByPlaceholderText('Search');

      // Assert
      expect(input.value).toBe('Redux');
    });
  });
});

// End of unit tests for: Header
