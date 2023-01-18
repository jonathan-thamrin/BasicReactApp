import {useState} from 'react';
import ItemForm from './components/ItemForm';
import ItemCard from './components/ItemCard';
import WeatherWidget from './components/WeatherWidget'

import './App.css';

function App({shoppingList}) {

    const [items, setItems] = useState(shoppingList);

    return (
        <>
            <h2>Shopping List</h2>

            <ItemForm items={items} setItems={setItems}/>

            <WeatherWidget/>

            <div className="item-cards">
                {items.map(item =>
                    <ItemCard item={item} items={items} setItems={setItems} key={items.indexOf(item)}/>
                )}
            </div>
        </>
    );
}

export default App;
