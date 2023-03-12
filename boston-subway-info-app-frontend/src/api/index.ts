export const getRoutes = async (currentPage: number = 1) => {
    const data = await fetch(`${process.env.REACT_APP_SUBWAY_INFO_APP_API as string}/routes/?size=10&page=${currentPage}`);
    const routes = await data.json()
    return routes;
}

export const getStops = async (route: string) => {
    const data = await fetch(`${process.env.REACT_APP_SUBWAY_INFO_APP_API as string}/routes/${route}`);
    const stops = await data.json()
    return stops.stops
}