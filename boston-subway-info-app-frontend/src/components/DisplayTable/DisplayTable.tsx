import React from "react";
import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getRoutes, getStops } from "../../api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DisplayTable = () => {
  const [stops, setStops] = React.useState<any>([]);
  const [routes, setRoutes] = React.useState<any>([]);

  const handleOnClick = (route_id: any) => {
    getStops(route_id)
      .then((data: any) => {
        setStops(data);
      })
      .catch();
  };
  const handleClear = () => {
    setStops([]);
  };

  React.useEffect(() => {
    getRoutes()
      .then((data: any) => {
        setRoutes(data);
      })
      .catch();
  }, []);
  React.useEffect(() => {}, [stops]);
  return (
    <Row>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Route Id #</th>
              <th>Route Name</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((data: any) => {
              return (
                <tr>
                  <td>
                    <p
                      style={{
                        cursor: "pointer",
                        color: "#0d6efd",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        handleOnClick(data.route_id);
                      }}
                    >
                      {data.route_id}
                    </p>
                  </td>
                  <td>{data.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>

      <Col>
        <div style={{ paddingBottom: "10px" }}>
          <Button variant="outline-dark" onClick={handleClear}>
            Clear
          </Button>
        </div>

        {stops.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stop Id #</th>
                <th>Stop Name</th>
              </tr>
            </thead>
            <tbody>
              {stops.map((data: any) => {
                return (
                  <tr>
                    <td>{data.stop_id}</td>
                    <td>{data.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Card border="light" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text>
                Click on the id on the left of the route to look at for all
                stops on that route.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default DisplayTable;
