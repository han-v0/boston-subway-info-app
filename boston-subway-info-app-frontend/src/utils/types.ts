interface Route {
    route_id: string;
    name: string;
}

interface Stop {
    stop_id: string;
    name: string;

}

interface StopsInfo {
    route_id: string;
    stops: Array<Stop>;
}

export type { Route, Stop, StopsInfo }