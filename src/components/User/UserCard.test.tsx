import { render, screen } from '@testing-library/react';
import { IUser } from '@/interfaces/user.interface';

// testing render UserCard
import UserCard from './UserCard';

describe('UserCard Component', () => {
  const mockUser: IUser = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    avatar: 'https://picsum.photos/id/30/100/100',
  };

  test('correct render user full name', () => {
    render(<UserCard {...mockUser} />);
    const fullNameElement = screen.getByText('John Doe');
    expect(fullNameElement).toBeInTheDocument();
  });

  test('correct render user avatar', () => {
    render(<UserCard {...mockUser} />);
    const avatarElement = screen.getByAltText('John Doe');
    expect(avatarElement).toHaveAttribute('src', 'https://picsum.photos/id/30/100/100');
  });
});
