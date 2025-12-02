import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Input } from '../../components/common/Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" name="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Input name="email" placeholder="Enter email" />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input name="email" error="Email is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
  });

  it('displays helper text when no error', () => {
    render(<Input name="email" helperText="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('does not display helper text when there is an error', () => {
    render(
      <Input
        name="email"
        error="Email is required"
        helperText="Enter your email address"
      />
    );
    expect(screen.queryByText('Enter your email address')).not.toBeInTheDocument();
  });

  it('applies error styles when error is present', () => {
    render(<Input name="email" error="Invalid email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input-error');
  });

  it('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<Input name="email" onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test@example.com' },
    });

    expect(handleChange).toHaveBeenCalled();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Input name="email" error="Invalid email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('uses name as id when id is not provided', () => {
    render(<Input name="email" label="Email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'email');
  });

  it('uses provided id over name', () => {
    render(<Input id="custom-id" name="email" label="Email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'custom-id');
  });
});
