import Button from '@mui/material/Button'

function TickButton({checked, handleTick}) {
    return (
        <Button disabled={checked} className="tick-button" onClick={handleTick}>Tick</Button>
    )
}

export default TickButton