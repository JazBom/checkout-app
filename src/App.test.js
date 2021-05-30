import { render, screen } from '@testing-library/react';
import { App } from './App';
// this test is failing, have to update
test('renders select your ads and checkout link', () => {
  render(<App />);
  const linkElement = screen.getByText(/select your ads and checkout/i);
  expect(linkElement).toBeInTheDocument();
});
