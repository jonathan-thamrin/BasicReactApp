import {fireEvent, render, screen} from '@testing-library/react';
import App from '../../App'

const mockItems = [
    {
        name: "Milk",
        checked: false
    },
    {
        name: "Bread",
        checked: true
    }
]

const setup = () => {
    render(<App shoppingList={mockItems}/>);
    const input = screen.getByRole('textbox', {name: "What item would you like to add?"});
    const submitButton = screen.getByRole('button', {name: 'Add Item'});
    return {
        input,
        submitButton
    }
}

test('displays default shopping list items correctly', () => {
    const {} = setup();
    const firstItem = screen.getByText("Milk", {});
    const secondItem = screen.getByText("Bread", {});

    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
    expect(secondItem).toHaveClass('item-complete')
});

test('renders new item in shopping list when input is given', () => {
    const {input, submitButton} = setup();
    fireEvent.change(input, {target: {value: "Butter"}});

    expect(input.value).toBe("Butter");
    fireEvent.click(submitButton);
    expect(input.value).toBe("");

    expect(screen.getByText("Butter", {})).toBeInTheDocument();
    const listItems = screen.getAllByRole('button');
    expect(listItems.length).toEqual(4);

});

test('no new item added to shopping list if no input or whitespace is given', () => {
    const {input, submitButton} = setup();
    fireEvent.change(input, {target: {value: "  "}});

    expect(input.value).toBe("  ");
    fireEvent.click(submitButton);
    expect(input.value).toBe("");

    const listItems = screen.getAllByRole('button');
    expect(listItems.length).toEqual(3);
});

test('clicking tick button crosses through respective item and disables button', () => {
    const {} = setup();
    const itemTickButtons = screen.getAllByRole('button', {name: 'Tick'});
    const firstItemTickButton = itemTickButtons[0];

    fireEvent.click(firstItemTickButton);
    expect(firstItemTickButton).toBeDisabled();

    expect(screen.getByText("Milk", {})).toHaveClass("item-complete");
});
