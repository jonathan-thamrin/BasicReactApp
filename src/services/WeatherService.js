// Related Topics: Abstraction, Law of Demeter
// With this implementation, WeatherWidget still needs to know how WeatherService packs the data block regardless.
// It knows how the returned data is structured (i.e., in an object called Data containing Image, Description, Temperature.)
//   Accesses it by calling UseWeatherService(), then accessing the returned object:
//     data.image, data.description, data.temperature which violates Law of Demeter.
// Keep in mind now all information needs to be returned to the WeatherWidget like it currently is in the "data" block.

// Alternatively, WeatherWidget can make numerous calls to get required information.
// Behind the scenes in WeatherService, it makes one call and stores the returned information separately in respective states.
// Extract UseAPI method out into separate file.
// Export axios.get so when UseWeatherService called, can hard-code mock for response.

// EXTRA: Look into useState vs Callbacks
// https://github.com/myob-fma/line-up/blob/master/line-up-client/src/common/hooks/useAPIData.ts
// https://github.com/myob-fma/line-up/blob/master/line-up-client/src/features/rooms/CreateRoom/CreateRoom.tsx

// ADDITIONAL INFO ABOUT UseEffect:
// Normally, there would be a clean-up function to remove any listeners etc. usually AFTER the component has been unmounted from the DOM.
// Callback function can contain TWO functions: One for general content and another for clean-up.


import {useEffect, useState} from "react";

const axios = require('axios').default;

function UseWeatherService() {

    return UseApi(axios.get("http://api.weatherstack.com/forecast", {
            params: {
                access_key: "90dcbcf3ded57d0e7ce1d6ecc1790029",
                query: "auckland"
            }
        }
    ), data => ({
        image: data.current.weather_icons[0],
        description: data.current.weather_descriptions[0],
        temperature: data.current.temperature
    }));

}

function UseApi(axiosApi, dataMapper = x => x) {

    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {

        setPending(true);

        axiosApi.then(res => {
            setData(dataMapper(res.data));
        }).catch(e => {
            setError(e);
        }).finally(() => setPending(false))


    }, [])

    return [pending, error, data];

}

export default UseWeatherService;