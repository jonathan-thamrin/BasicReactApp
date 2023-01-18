import TickButton from './TickButton';
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";

function ItemCard({item, items, setItems}) {
    return (
        <Card variant="outlined" className="item-card">
            <CardMedia
                component="img"
                height="50%"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQcmrXJy8NiZnwe2qfBEg44NS96_1cvgwcjQ&usqp=CAU"
                alt="placeholder image"
                className={item.checked ? "img-fade" : ""}
            />
            <CardContent className="item-card-content">
                <span className={item.checked ? "item-complete" : ""}>{item.name}</span>
            </CardContent>
            <CardActions className="item-card-actions">
                <TickButton checked={item.checked} handleTick={() => {HandleTick(item, items, setItems)}}/>
            </CardActions>
        </Card>
    )
}

function HandleTick(item, items, setItems) {

    const itemIndex = items.indexOf(item);

    setItems([
        ...items.slice(0, itemIndex),
        {
            name: item.name,
            checked: true
        },
        ...items.slice(itemIndex + 1, items.length)
    ])
}

export default ItemCard;