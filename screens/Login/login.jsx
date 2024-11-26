import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './login.css'; // Custom CSS
import wall from "../../src/assets/wall.jpg"; // Ensure the image path is correct

const Login = () => {
  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${wall})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh"
      }}
    >
      <div className="overlay">
        <Container className="w-50">
          <Row>
            <Col md={12} className="login-form-container mt-5 w-75">
              <h1 className="text-white mb-4 text-left custom-heading">Sign In</h1>
              <Form>
                <Form.Group controlId="formBasicEmail" className="d-flex justify-content-center">
                  <Form.Control
                    style={{ backgroundColor: "black" }}
                    className="w-50 custom-input text-white"
                    type="email"
                    placeholder="Email or mobile number"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="d-flex justify-content-center mt-3">
                  <Form.Control
                    style={{ backgroundColor: "black" }}
                    className="w-50 custom-input text-white"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <div className="d-flex justify-content-center mt-4">
                  <Button className="w-50" type="submit" style={{ backgroundColor: "red",borderBlockColor:"red", borderLeftColor:"red", borderRightColor:"red" }}>
                    Sign In
                  </Button>
                </div>
              </Form>

              <div className="text-center text-white mt-4">
                <span>OR</span>
                <div className="d-flex justify-content-center mt-2">
                  <Button variant="secondary" className="w-50">
                    Use a Sign-In Code
                  </Button>
                </div>
              </div>

              <div className="text-center mt-3 text-white">
                <a href="#" className="text-decoration-none text-white">
                  Forgot password?
                </a>
              </div>

              <div className="d-flex justify-content-between align-items-center text-white mt-5 ">
                <Form.Check
                style={{marginLeft:"7.5rem"}}
                  type="checkbox"
                  id="rememberMe"
                  label="Remember me"
                />
              </div>

              <div className="mt-3" style={{marginLeft:"7.5rem"}}>
                <span className="text-white">
                  New to Netflix?{" "}
                  <a href="#" className="text-decoration-none text-white">
                    Sign up now.
                  </a>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
