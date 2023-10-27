import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createTimeCapsule, updateTimeCapsule } from "./api";
import { useAuth } from "./AuthContext";
import UpcomingTimeCapsules from "./UpcomingTimeCapsules";
import PreviousTimeCapsules from "./PreviousTimeCapsules";
import CreateCapsule from "./CreateCapsule";
import UpdateTimeCapsule from "./UpdateTimeCapsule";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [openDateTime, setOpenDateTime] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState(null);
  const [capsule, setCapsule] = useState({
    title: "",
    description: "",
    message: "",
    media: null,
  });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [capsuleToUpdate, setCapsuleToUpdate] = useState(null);
  const navigate = useNavigate();

  const [openedCapsule, setOpenedCapsule] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  const handleTimeCapsuleOpen = (data) => {
    setOpenedCapsule(data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCapsule((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCapsule((prevState) => ({ ...prevState, media: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser || !currentUser.id) {
      console.error("currentUser is null or doesn't have an id");
      return;
    }

    const fullCapsuleData = {
      ...capsule,
      openDate: openDateTime.isValid() ? openDateTime.toISOString() : null,
      userId: currentUser.id,
    };

    try {
      let responseData;
      if (isUpdateMode) {
        console.log("Capsule Data in isUpdateMode:", capsuleToUpdate);
        responseData = await updateTimeCapsule(
          capsuleToUpdate.capsuleId,
          fullCapsuleData
        );
        setSuccessMessage("Time Capsule updated successfully!");
      } else {
        responseData = await createTimeCapsule(fullCapsuleData);
        setSuccessMessage("Time Capsule created successfully!");
      }
      console.log("Response:", responseData);

      setCapsule({
        title: "",
        description: "",
        message: "",
        media: null,
      });
    } catch (error) {
      console.error("There was an error:", error);
    }
  };
  const switchToUpdateMode = (capsuleData) => {
    console.log("Capsule Data in switchToUpdateMode:", capsuleData);
    setIsUpdateMode(true);
    setCapsuleToUpdate(capsuleData);
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-secondary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Virtual Time Capsule
          </a>
          <div class="d-flex align-items-end flex-column">
            <button class="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {currentUser && (
        <Container className="mt-5">
          <Row className="my-5">
            <Col>
              <h4 className="mx-3">Previous Time Capsules</h4>
              <PreviousTimeCapsules
                switchToUpdateMode={switchToUpdateMode}
                onOpen={handleTimeCapsuleOpen}
              />
            </Col>
            <Col>
              <h4 className="mx-3">Upcoming Time Capsules</h4>
              <UpcomingTimeCapsules switchToUpdateMode={switchToUpdateMode} />
            </Col>
          </Row>
          {isUpdateMode ? (
            <UpdateTimeCapsule
              existingData={capsuleToUpdate}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              openDateTime={openDateTime}
              setOpenDateTime={setOpenDateTime}
              handleSubmit={handleSubmit}
              successMessage={successMessage}
            />
          ) : (
            <CreateCapsule
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              openDateTime={openDateTime}
              setOpenDateTime={setOpenDateTime}
              handleSubmit={handleSubmit}
              successMessage={successMessage}
            />
          )}
          <div className="mt-5 d-flex justify-content-center rounded-pill bg-dark-subtle">
            <div className="row d-block">
              {openedCapsule && <p>{openedCapsule.message}</p>}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Dashboard;
