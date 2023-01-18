import {fireEvent, render, screen} from '@testing-library/react';
import ItemForm from '../ItemForm';

const itemsMock = [
    {
        name: "Butter",
        checked: false
    }
]

const setup = (setItemsMock) => {
    render(<ItemForm items={itemsMock} setItems={setItemsMock}/>);
    const inputBox = screen.getByRole('textbox', {name: 'What item would you like to add?'});
    const submitButton = screen.getByRole('button', {name: 'Add Item'});

    return (
        {
            inputBox,
            submitButton
        }
    )
}

test('renders form to allow for adding additional items', () => {
    const {inputBox, submitButton} = setup();

    expect(inputBox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
});

test('input field clears after submitting form', () => {
    const setItemsMock = jest.fn();
    const {inputBox, submitButton} = setup(setItemsMock);

    fireEvent.change(inputBox, {target: {value: "test item"}});
    expect(inputBox.value).toBe("test item");
    fireEvent.click(submitButton);
    expect(inputBox.value).toBe("");
});