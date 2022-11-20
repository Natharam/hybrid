import App from './App';
import React from 'react';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';
import PostDetail from './components/Details';

const post = {
  title: 'ConvertKit: How Nathan Barry Bootstrapped an Email Marketing Business',
  author: 'nickhould',
  points: 289,
  relevancy_score: 7298
};

jest.mock('axios');

const renderSearchForm = () => {
  return render(<SearchForm searchString="" setSearchString={jest.fn()} />);
};

const renderResultCard = () => {
  return render(<ResultCard post={post} setDetailId={jest.fn()} />);
};

const renderDetails = () => {
  return render(<PostDetail detailId={post} />);
};

describe('<App />', () => {
  test('Render App Component with initial props', async () => {
    render(<App />);
    expect(await screen.findByPlaceholderText('Search Posts?')).toBeInTheDocument();
  });
});

describe('<SearchForm />', () => {
  afterAll(() => cleanup());

  describe('Initial component rendering and data test if exist', () => {
    test('Render SearchForm Component with initial props', async () => {
      renderSearchForm();
      expect(await screen.findByPlaceholderText('Search Posts?')).toBeInTheDocument();
    });

    test('Simulate onchange to check value on input field', async () => {
      renderSearchForm();
      const input = await screen.findByPlaceholderText('Search Posts?');
      fireEvent.change(input, { target: { value: 'my-post' } });
      expect(input).toHaveValue('my-post');
    });
  });
});

describe('<ResultCard />', () => {
  afterAll(() => cleanup());

  describe('Initial component rendering and data test if exist', () => {
    test('Render ResultCard Component with initial props', async () => {
      renderResultCard();
      expect(
        await screen.findByText('ConvertKit: How Nathan Barry Bootstrapped an Email Marketing Business')
      ).toBeInTheDocument();
      expect(await screen.findByText('nickhould')).toBeInTheDocument();
      expect(await screen.findByText(289)).toBeInTheDocument();
      expect(await screen.findByText(7298)).toBeInTheDocument();
    });
  });
});

describe('<Details />', () => {
  afterAll(() => cleanup());

  describe('Initial component rendering and data test if exist', () => {
    test('Render Details Component with initial props', async () => {
      renderDetails();
      expect(await screen.findByText('Loading...')).toBeInTheDocument();
    });

    test('Render Details Component with props update', async () => {
      renderDetails();
      expect(
        await screen.findByText('ConvertKit: How Nathan Barry Bootstrapped an Email Marketing Business')
      ).toBeInTheDocument();
      expect(await screen.findByText(289)).toBeInTheDocument();
    });
  });
});