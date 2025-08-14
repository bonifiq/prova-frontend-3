import { render, screen, waitFor } from '@testing-library/react';
jest.mock('../services/api');
import {api} from '../services/api';
import UserView from '../components/UserView';

const mockedApi = api as jest.Mocked<typeof api>;

test('UserView mostra usuário e posts', async () => {
  const mockGet = (url: string) => {
    if (url.includes('/users/')) {
      return Promise.resolve({
        data: { id: 2, name: 'Test User', email: 't@test.com' }
      });
    }
    if (url.includes('/posts')) {
      return Promise.resolve({
        data: [{ id: 1, title: 'T', body: 'B' }]
      });
    }
    return Promise.reject(new Error('not found'));
  };

  mockedApi.get.mockImplementation(mockGet);

  render(<UserView userId={2} />);

  await waitFor(() =>
    expect(screen.getByText('Test User')).toBeInTheDocument()
  );
  expect(screen.getByText(/^T/)).toBeInTheDocument();
});