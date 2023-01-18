import axios from 'axios';
import React from "react";
import UseWeatherService from "../../services/WeatherService";
import {act, render, screen} from "@testing-library/react";
import {wait} from "@testing-library/user-event/dist/utils";

jest.mock('axios');

test('when API call is successful should render component with weather data', async () => {

    axios.get.mockResolvedValue(() => {
        setTimeout(() => Promise.resolve(
            {
                data: {
                    current: {
                        weather_icons: ["link.png"],
                        weather_descriptions: ["sunny"],
                        temperature: "1"
                    }
                }
            }
        ))
    })

    // Renders component fully before performing assertions.
    // Anything that causes the component to update (i.e., change in state, prop, etc). must be wrapped in Act().
    await act(() => {
        render(<TestComponent/>);
    });

    expect(screen.getByTestId("weather-desc")).toHaveTextContent("loading");
    expect(screen.getByTestId("temp")).toHaveTextContent("loading");
    expect(screen.getByTestId("img")).toHaveTextContent("loading");

    // findBy: Use when expecting an element to appear but the change to the DOM doesn't happen immediately.
    // waitFor: Use when unit test which mocks API call needs to wait for mock promise to resolve.
    await wait(() => {
        expect(screen.findByTestId("weather-desc")).toHaveTextContent("sunny");
        expect(screen.findByTestId("temp")).toHaveTextContent("1");
        expect(screen.findByTestId("img")).toHaveTextContent("link.png");
    });
})

function TestComponent() {

    const [pending, error, data] = UseWeatherService();

    return (
        <div>
            <span data-testid="weather-desc">{data ? data.description : "loading"}</span>
            <span data-testid="temp">{data ? data.temperature : "loading"}</span>
            <span data-testid="img">{data ? data.image : "loading"}</span>
        </div>
    )
}