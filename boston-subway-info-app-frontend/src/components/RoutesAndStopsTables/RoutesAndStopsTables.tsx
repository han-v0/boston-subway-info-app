import React from "react";
import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getRoutes, getStops } from "../../api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import { Route, StopsInfo, Stop } from "../../utils/types";

const RoutesAndStopsTables = () => {
  const [stopsInfo, setStopsInfo] = React.useState<StopsInfo>({
    route_id: "",
    stops: [],
  });
  const [routes, setRoutes] = React.useState<Array<Route>>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const handleOnClick = (route_id: string) => {
    getStops(route_id)
      .then((data: Array<Stop>) => {
        setStopsInfo({ route_id, stops: data });
      })
      .catch();
  };

  const handleOnClickPagination = (active: number) => {
    getRoutes(active)
      .then((data: { items: Array<Route>; page: number; pages: number }) => {
        setRoutes(data.items);
        setCurrentPage(data.page);
        setTotalPages(data.pages);
      })
      .catch();
  };

  const setPaginationOnTable = () => {
    let active = currentPage;
    let items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === active}
          onClick={() => handleOnClickPagination(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  const handleClear = () => {
    setStopsInfo({ route_id: "", stops: [] });
  };

  React.useEffect(() => {
    getRoutes()
      .then((data: { items: Array<Route>; page: number; pages: number }) => {
        setRoutes(data.items);
        setCurrentPage(data.page);
        setTotalPages(data.pages);
      })
      .catch();
  }, []);
  React.useEffect(() => {}, [stopsInfo]);

  return (
    <Row>
      <Col style={{ paddingLeft: "20px" }}>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          All Subway Routes in Boston
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Route ID</th>
                <th>Route Name</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route: Route) => {
                return (
                  <tr key={route.route_id}>
                    <td>
                      <p
                        style={{
                          cursor: "pointer",
                          color: "#0d6efd",
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          handleOnClick(route.route_id);
                        }}
                      >
                        {route.route_id}
                      </p>
                    </td>
                    <td>{route.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
        <Row>
          <Pagination>{setPaginationOnTable()}</Pagination>
        </Row>
      </Col>

      <Col style={{ paddingLeft: "50px" }}>
        <div style={{ paddingBottom: "10px" }}>
          <Button variant="outline-dark" onClick={handleClear}>
            Clear
          </Button>
        </div>

        {stopsInfo.stops.length > 0 ? (
          <>
            <Row
              style={{ display: "flex", justifyContent: "center" }}
            >{`Stops for Route ${stopsInfo.route_id}`}</Row>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Stop ID</th>
                    <th>Stop Name</th>
                  </tr>
                </thead>
                <tbody>
                  {stopsInfo.stops.map((stop: Stop) => {
                    return (
                      <tr key={stop.stop_id}>
                        <td>{stop.stop_id}</td>
                        <td>{stop.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </>
        ) : (
          <Card border="light" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text>
                Click on the Route ID on the Subway Routes table to search for
                all stops on that route. Use the Clear button above to clear the
                Stops table.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default RoutesAndStopsTables;
