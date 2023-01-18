import {render, screen} from '@testing-library/react';
import ItemCard from '../ItemCard';

const setup = (itemMock) => {
    render(<ItemCard item={itemMock} />);
    const item = screen.getByText(itemMock.name, {});
    const tickButton = screen.getByRole('button', {name: 'Tick'})

    return (
        {
            item,
            tickButton
        }
    )
}

test('renders a single shopping list item correctly on initial startup', () => {
    const itemMock = {name: "Milk", checked: false};
    const {item, tickButton} = setup(itemMock);

    expect(item).toHaveTextContent(itemMock.name);
    expect(tickButton).toBeInTheDocument();
})

test('renders a single completed shopping list item correctly', () => {
    const itemMock = {name: "Milk", checked: true};
    const {item} = setup(itemMock);

    expect(item).toHaveTextContent(itemMock.name);
    expect(item).toHaveClass("item-complete");
})