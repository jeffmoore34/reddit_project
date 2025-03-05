
// Unit tests for: Home

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, fetchPosts, setSearchTerm } from '../../../api/redditSlice';
import Home from '../home';
import "@testing-library/jest-dom";

jest.mock("../../../api/redditSlice", () => {
  const originalModule = jest.requireActual("../../../api/redditSlice");
  return {
    __esModule: true,
    ...originalModule,
    fetchPosts: jest.fn(),
    setSearchTerm: jest.fn(),
    fetchComments: jest.fn(),
  };
});

jest.mock("../../Post/post", () => {
  return function Post({ post, onToggleComments }) {
    return (
      <div data-testid="post">
        <h3>{post.title}</h3>
        <button onClick={() => onToggleComments(post.permalink)}>Toggle Comments</button>
      </div>
    );
  };
});

describe('Home() Home method', () => {
  let mockDispatch;
  let mockUseSelector;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockUseSelector = jest.fn();

    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) => mockUseSelector(selector));
  });

  describe('Happy Paths', () => {
    it('should render loading state initially', () => {
      mockUseSelector.mockReturnValueOnce({ isLoading: true, error: null, searchTerm: '', selectedSubreddit: '' });
      render(<Home />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render posts when available', () => {
      const posts = [{ id: '1', title: 'Post 1', permalink: '/post1' }];
      mockUseSelector.mockReturnValueOnce({ isLoading: false, error: null, searchTerm: '', selectedSubreddit: '' });
      mockUseSelector.mockReturnValueOnce(posts);
      render(<Home />);
      expect(screen.getByTestId('post')).toBeInTheDocument();
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });

    it('should dispatch fetchPosts on mount', () => {
      mockUseSelector.mockReturnValueOnce({ isLoading: false, error: null, searchTerm: '', selectedSubreddit: 'reactjs' });
      render(<Home />);
      expect(fetchPosts).toHaveBeenCalledWith('reactjs');
    });
  });

  describe('Edge Cases', () => {
    it('should render error message when there is an error', () => {
      mockUseSelector.mockReturnValueOnce({ isLoading: false, error: true, searchTerm: '', selectedSubreddit: '' });
      render(<Home />);
      expect(screen.getByText('Posts failed to load...')).toBeInTheDocument();
    });

    it('should render no posts message when posts array is empty', () => {
      mockUseSelector.mockReturnValueOnce({ isLoading: false, error: null, searchTerm: 'test', selectedSubreddit: '' });
      mockUseSelector.mockReturnValueOnce([]);
      render(<Home />);
      expect(screen.getByText('No posts matching "test"')).toBeInTheDocument();
    });

    it('should call setSearchTerm when "Go home" button is clicked', () => {
      mockUseSelector.mockReturnValueOnce({ isLoading: false, error: null, searchTerm: 'test', selectedSubreddit: '' });
      mockUseSelector.mockReturnValueOnce([]);
      render(<Home />);
      fireEvent.click(screen.getByText('Go home'));
      expect(setSearchTerm).toHaveBeenCalledWith('');
    });

    it('should call fetchComments when "Toggle Comments" button is clicked', () => {
      const posts = [{ id: '1', title: 'Post 1', permalink: '/post1' }];
      mockUseSelector.mockReturnValueOnce({ isLoading: false, error: null, searchTerm: '', selectedSubreddit: '' });
      mockUseSelector.mockReturnValueOnce(posts);
      render(<Home />);
      fireEvent.click(screen.getByText('Toggle Comments'));
      expect(fetchComments).toHaveBeenCalledWith(0, '/post1');
    });
  });
});

// End of unit tests for: Home
