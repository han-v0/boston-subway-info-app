export const getRoutes = async () => {
    const data = await fetch(`${process.env.REACT_APP_SUBWAY_INFO_APP_API as string}/routes/`);
    const routes = await data.json()
    return routes.routes;
}

export const getStops = async (route: string) => {
    const data = await fetch(`${process.env.REACT_APP_SUBWAY_INFO_APP_API as string}/routes/${route}`);
    const stops = await data.json()
    return stops.stops
}