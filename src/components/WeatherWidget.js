import {Typography} from "@mui/material";
import UseWeatherService from "../services/WeatherService";

const {Box, CardMedia, CardContent, Card, Skeleton, LinearProgress} = require("@mui/material");

function WeatherWidget() {

    const [pending, error, data] = UseWeatherService();

    return (
        <Box>
            <Card variant="outlined" sx={{height: 175, width: 250}}>
                <CardContent sx={{display: "block"}}>
                    <Typography variant="h6" paragraph={true}>
                        Auckland, New Zealand
                    </Typography>
                    <Typography variant="body2" paragraph={true}>
                        The current weather conditions is:
                        <br/>
                        {data && <b>{data.description}</b>}
                        {pending && <LinearProgress/>}
                        <b>{error}</b>
                    </Typography>
                    <Typography variant="body2" paragraph={true}>
                        The current temperature is:
                        <br/>
                        {data && <b>{data.temperature}°C</b>}
                        {pending && <LinearProgress/>}
                        <b>{error}</b>
                    </Typography>
                </CardContent>
            </Card>

            {data && <CardMedia
                component="img"
                sx={{height: 175, width: 175}}
                image={data.image}
                alt="weather icon"
            />}

            {pending && <Skeleton variant="rectangular" width={175} height={175}/>}

            <b>{error}</b>

        </Box>
    )
}

export default WeatherWidget;