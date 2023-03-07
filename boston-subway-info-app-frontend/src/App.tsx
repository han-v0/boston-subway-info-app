import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DisplayTable from "./components/DisplayTable";
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
      <DisplayTable />
    </Container>
  );
}

export default App;
