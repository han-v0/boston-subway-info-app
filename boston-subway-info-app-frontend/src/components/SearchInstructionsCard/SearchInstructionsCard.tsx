import { Card } from "react-bootstrap";
const SearchInstructionsCard = () => {
  return (
    <Card border="light" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Text>
          Click on the Route ID on the Subway Routes table to search for all
          stops on that route. Use the Clear button above to clear the Stops
          table.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SearchInstructionsCard;
