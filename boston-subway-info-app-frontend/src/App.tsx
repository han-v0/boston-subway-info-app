import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RoutesAndStopsTables from "./components/RoutesAndStopsTables";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container fluid>
      <Row>
        <Col
          style={{
            textAlign: "center",
            fontSize: "30px",
            paddingBottom: "50px",
          }}
        >
          Boston Subway Information
        </Col>
      </Row>
      <RoutesAndStopsTables />
    </Container>
  );
}

export default App;
