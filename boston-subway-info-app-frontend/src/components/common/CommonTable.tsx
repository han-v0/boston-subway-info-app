import React from "react";
import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getRoutes, getStops } from "../../api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import { Route, StopsInfo, Stop } from "../../utils/types";

const CommonTable = (props: any) => {
  const { data, whichType, handleOnClick } = props;

  const displayRoutesOrStopsData = () => {
    return whichType == "routes"
      ? data.map((route: Route) => {
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
        })
      : data.stops.map((stop: Stop) => {
          return (
            <tr key={stop.stop_id}>
              <td>{stop.stop_id}</td>
              <td>{stop.name}</td>
            </tr>
          );
        });
  };
  return (
    <>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        {whichType == "routes"
          ? "All Subway Routes in Boston"
          : `Stops for Route ${data.route_id}`}
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              {whichType == "routes" ? (
                <>
                  <th>Route ID</th>
                  <th>Route Name</th>
                </>
              ) : (
                <>
                  <th>Stop ID</th>
                  <th>Stop Name</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>{displayRoutesOrStopsData()}</tbody>
        </Table>
      </Row>
    </>
  );
};

export default CommonTable;
