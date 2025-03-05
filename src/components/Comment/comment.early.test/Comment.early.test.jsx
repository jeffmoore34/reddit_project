
// Unit tests for: Comment

import React from 'react'
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileImage } from '../../../api/redditSlice';
import Comment from '../comment';
import "@testing-library/jest-dom";



// Mock the necessary parts of the module
jest.mock("../../../api/redditSlice", () => {
  const originalModule = jest.requireActual("../../../api/redditSlice");
  return {
    __esModule: true,
    ...originalModule,
    fetchUserProfileImage: jest.fn(),
  };
});

jest.mock("react-redux", () => {
  const originalModule = jest.requireActual("react-redux");
  return {
    __esModule: true,
    ...originalModule,
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

describe('Comment() Comment method', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  describe('Happy Paths', () => {
    it('should render the comment with author and body', () => {
      // Test to ensure the component renders correctly with given props
      const comment = { author: 'testUser', body: 'This is a test comment' };
      useSelector.mockReturnValue({ testUser: 'testUserImage.png' });

      render(<Comment comment={comment} />);

      expect(screen.getByText('testUser')).toBeInTheDocument();
      expect(screen.getByText('This is a test comment')).toBeInTheDocument();
      expect(screen.getByAltText("testUser's profile")).toHaveAttribute('src', 'testUserImage.png');
    });

    it('should dispatch fetchUserProfileImage on mount if author exists', () => {
      // Test to ensure the fetchUserProfileImage is dispatched
      const comment = { author: 'testUser', body: 'This is a test comment' };
      useSelector.mockReturnValue({});

      render(<Comment comment={comment} />);

      expect(dispatchMock).toHaveBeenCalledWith(fetchUserProfileImage('testUser'));
    });
  });

  describe('Edge Cases', () => {
    it('should use default image if user profile image is not available', () => {
      // Test to ensure default image is used when no profile image is available
      const comment = { author: 'unknownUser', body: 'This is a test comment' };
      useSelector.mockReturnValue({});

      render(<Comment comment={comment} />);

      expect(screen.getByAltText("unknownUser's profile")).toHaveAttribute('src', 'default.png');
    });

    it('should not dispatch fetchUserProfileImage if author is not provided', () => {
      // Test to ensure no dispatch occurs if author is missing
      const comment = { body: 'This is a test comment' };
      useSelector.mockReturnValue({});

      render(<Comment comment={comment} />);

      expect(dispatchMock).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: Comment
