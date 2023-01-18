import {fireEvent, render, screen} from '@testing-library/react';
import TickButton from '../TickButton';

const setup = (checked, handleTickMock) => {
    render(<TickButton checked={checked} handleTick={handleTickMock}/>)
    const inputButton = screen.getByRole('button', { name: 'Tick' });

    return {inputButton};
}

test('check tick button initial state is enabled', () => {
    const {inputButton} = setup();
    expect(inputButton).toBeEnabled();
});

test('clicking tick button triggers onClick handler', () => {
    const handleTickMock = jest.fn();
    const {inputButton} = setup(false, handleTickMock);

    fireEvent.click(inputButton);
    expect(handleTickMock).toBeCalledTimes(1);
});


test('check tick button is disabled when checked is true', () => {
    const handleTickMock = jest.fn();
    const {inputButton} = setup(true, handleTickMock);

    expect(inputButton).toBeDisabled();
});

test('clicking tick button when disabled does not trigger onClick handler', () => {
    const handleTickMock = jest.fn();
    const {inputButton} = setup(true, handleTickMock);

    fireEvent.click(inputButton);
    expect(handleTickMock).toBeCalledTimes(0);
});
