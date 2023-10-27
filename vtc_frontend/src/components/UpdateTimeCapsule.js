import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const UpdateTimeCapsule = ({
  handleInputChange,
  handleFileChange,
  openDateTime,
  setOpenDateTime,
  handleSubmit,
  successMessage,
  existingData,
}) => {
  console.log("Existing Data:", existingData);

  return (
    <>
      <Row className="justify-content-center mb-5">
        <h2>Update Time Capsule</h2>
      </Row>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            defaultValue={existingData?.title || ""}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Description"
            name="description"
            defaultValue={existingData?.description || ""}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Message Content"
            name="message"
            defaultValue={existingData?.message || ""}
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
            Update Capsule
          </Button>
        </Col>
        <Col xs={2}>
          <Button variant="secondary">Reset</Button>
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

export default UpdateTimeCapsule;
