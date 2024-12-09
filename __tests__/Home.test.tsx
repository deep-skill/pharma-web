import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

// Mock tests
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: 'Deep Pharma',
    });

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  it("renders the text: 'Welcome everyone'", () => {
    render(<Home />);

    const paragraph = screen.getByText('Welcome');

    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('H2');
  });
});
