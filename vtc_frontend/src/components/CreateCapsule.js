import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const CreateCapsule = ({
  handleInputChange,
  handleFileChange,
  openDateTime,
  setOpenDateTime,
  handleSubmit,
  successMessage,
}) => {
  const handleReset = () => {
    handleInputChange({ target: { name: "title", value: "" } });
    handleInputChange({ target: { name: "description", value: "" } });
    handleInputChange({ target: { name: "message", value: "" } });
  };

  return (
    <>
      <Row className="justify-content-center mb-5">
        <h2>Create a New Time Capsule</h2>
      </Row>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Message Content"
            name="message"
            onChange={handleInputChange}
          />
        </Col>
      </Row>
      <Row className="align-items-center mt-3">
        <Col className="col-3">
          <Form.Group>
            <Form.Label>Date and Time</Form.Label>
            <Datetime
              value={openDateTime}
              onChange={setOpenDateTime}
              inputProps={{
                placeholder: "Select Date and Time",
                className: "form-control",
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={2} className="ms-auto">
          <Button variant="primary" onClick={handleSubmit}>
            Create Capsule
          </Button>
        </Col>
        <Col xs={2}>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Col>
        {successMessage && (
          <div style={{ color: "green", marginTop: "20px" }}>
            {successMessage}
          </div>
        )}
      </Row>
    </>
  );
};

export default CreateCapsule;
