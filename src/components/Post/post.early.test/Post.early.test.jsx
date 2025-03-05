
// Unit tests for: Post

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import shortenNumber from '../../../utils/shortenNumber';
import Post from '../post';
import "@testing-library/jest-dom";

// Mock the shortenNumber function
jest.mock("../../../utils/shortenNumber", () => {
  const originalModule = jest.requireActual("../../../utils/shortenNumber");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(),
  };
});

// Mock the Card and Comment components
jest.mock("../../Card/card", () => {
  return function Card({ children }) {
    return <div data-testid="mock-card">{children}</div>;
  };
});

jest.mock("../../Comment/comment", () => {
  return function Comment({ comment }) {
    return <div data-testid="mock-comment">{comment.body}</div>;
  };
});

describe('Post() Post method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should render the post with title, image, and author details', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        url: 'http://example.com/image.jpg',
        author: 'test_author',
        num_comments: 10,
        showingComments: false,
      };

      shortenNumber.mockReturnValue('10');

      render(<Post post={post} onToggleComments={jest.fn()} />);

      expect(screen.getByText('Test Post')).toBeInTheDocument();
      expect(screen.getByAltText("test_author's profile")).toBeInTheDocument();
      expect(screen.getByRole('img', { name: '' })).toHaveAttribute('src', 'http://example.com/image.jpg');
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should call onToggleComments when the comments button is clicked', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        url: 'http://example.com/image.jpg',
        author: 'test_author',
        num_comments: 10,
        showingComments: false,
        permalink: '/r/test/comments/1',
      };

      const onToggleComments = jest.fn();

      render(<Post post={post} onToggleComments={onToggleComments} />);

      fireEvent.click(screen.getByRole('button', { name: /show comments/i }));
      expect(onToggleComments).toHaveBeenCalledWith('/r/test/comments/1');
    });

    it('should render comments when showingComments is true', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        url: 'http://example.com/image.jpg',
        author: 'test_author',
        num_comments: 10,
        showingComments: true,
        comments: [{ id: 'c1', body: 'Test comment' }],
      };

      render(<Post post={post} onToggleComments={jest.fn()} />);

      expect(screen.getByTestId('mock-comment')).toHaveTextContent('Test comment');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should display error message when errorComments is true', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        errorComments: true,
      };

      render(<Post post={post} onToggleComments={jest.fn()} />);

      expect(screen.getByText('Error loading comments')).toBeInTheDocument();
    });

    it('should display loading skeleton when loadingComments is true', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        loadingComments: true,
      };

      render(<Post post={post} onToggleComments={jest.fn()} />);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('should handle missing author profile image gracefully', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        url: 'http://example.com/image.jpg',
        author: 'unknown_author',
        num_comments: 10,
        showingComments: false,
      };

      render(<Post post={post} onToggleComments={jest.fn()} />);

      expect(screen.getByAltText("unknown_author's profile")).toHaveAttribute('src', '/Users/Moores/Reddit_2/src/assets/social-network.png');
    });
  });
});

// End of unit tests for: Post
