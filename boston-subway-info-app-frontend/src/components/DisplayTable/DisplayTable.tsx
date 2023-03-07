import React from "react";
import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getRoutes, getStops } from "../../api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Route, StopsInfo, Stop } from "../../utils/types";

const DisplayTable = () => {
  const [stops, setStops] = React.useState<StopsInfo>({
    route_id: "",
    stops: [],
  });
  const [routes, setRoutes] = React.useState<Array<Route>>([]);

  const handleOnClick = (route_id: string) => {
    getStops(route_id)
      .then((data: Array<Stop>) => {
        setStops({ route_id, stops: data });
      })
      .catch();
  };

  const handleClear = () => {
    setStops({ route_id: "", stops: [] });
  };

  React.useEffect(() => {
    getRoutes()
      .then((data: Array<Route>) => {
        setRoutes(data);
      })
      .catch();
  }, []);
  React.useEffect(() => {}, [stops]);
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
      </Col>

      <Col style={{ paddingLeft: "50px" }}>
        <div style={{ paddingBottom: "10px" }}>
          <Button variant="outline-dark" onClick={handleClear}>
            Clear
          </Button>
        </div>

        {stops.stops.length > 0 ? (
          <>
            <Row
              style={{ display: "flex", justifyContent: "center" }}
            >{`Stops for Route ${stops.route_id}`}</Row>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Stop ID</th>
                    <th>Stop Name</th>
                  </tr>
                </thead>
                <tbody>
                  {stops.stops.map((stop: Stop) => {
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
                Click on the id on the left of the route to look at for all
                stops on that route. Use the Clear button below to clear the
                Stops table.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default DisplayTable;
