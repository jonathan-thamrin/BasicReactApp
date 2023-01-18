import {useState} from "react";
import {Button, Input} from '@mui/material';

function ItemForm({items, setItems}) {

    const [input, setInput] = useState("");
    const [addSuccess, setAddSuccess] = useState(true);

    let handleSubmit = () => {
        if(isEmptyOrWhitespace(input)) {
            setAddSuccess(false);
            setInput("");
            return;
        }

        setItems([
            ...items,
            {name: input, checked: false}
        ]);

        setInput("");
        setAddSuccess(true);
    }

    // Forms containing multiple input fields can utilise the SAME onChange function by using "event.target.name" and "event.target.value".
    // Each input field MUST have a unique "name" field for this to work.
    // Using checkboxes etc. is possible but will require the "event.target" to be broken down using destructuring assignment (@ 8:20:00 of Beginners React Tutorial FCC).

    return (
        <div id="shopping-list-form">
            <label htmlFor="item-name">What item would you like to add?</label>
            <Input placeholder={"Enter item name here..."} error={!addSuccess} style={{width: "15%"}} id="item-name" name="item" type="text" value={input} onChange={event => setInput(event.target.value)}/>
            <Button variant="contained" type="submit" onClick={handleSubmit}>Add Item</Button>
        </div>
    );

    // We had set the "value" of the Input element to equal to the Input State declared earlier <- Maintains single source of truth for React.
    // This is called "Controlled Components".

}

function isEmptyOrWhitespace(input) {
    return /^\s*$/.test(input) || input === "";
}

export default ItemForm;