import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './login.css'; // Create and customize CSS for this component

const Login = () => {
  return (
    <div className="login-page" style={{ backgroundImage: `url("path_to_your_background_image.jpg")` }}>
      <div className="overlay">
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Row>
            <Col md={12} className="login-form-container">
              <h1 className="text-white text-center mb-4">Sign In</h1>
              <Form>
                <Form.Group controlId="formBasicEmail" className="d-flex justify-content-center align-items-center">
                  {/* <Form.Label className="text-white">Email or mobile number</Form.Label> */}
                  <Form.Control className="w-50"type="email" placeholder="Email or mobile number" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="d-flex justify-content-center align-items-center mt-3">
                  {/* <Form.Label className="text-white">Password</Form.Label> */}
                  <Form.Control type="password" className="w-50" placeholder="Password" />
                </Form.Group>

                <Button variant="danger" className="d-flex justify-content-center align-items-center w-50 mt-4" type="submit">
                  Sign In
                </Button>
              </Form>

              <div className="text-center text-white mt-4">
                <span>OR</span>
                <div className="mt-2">
                  <Button variant="secondary" className="d-flex justify-content-center align-items-center w-50">
                    Use a Sign-In Code
                  </Button>
                </div>
              </div>

              <div className="text-center mt-3 text-white">
                <a href="#" className="text-decoration-none text-white">
                  Forgot password?
                </a>
              </div>

              <div className="d-flex justify-content-between align-items-center text-white mt-3">
                <Form.Check
                  type="checkbox"
                  id="rememberMe"
                  label="Remember me"
                />
              </div>

              <div className="text-center mt-3">
                <span className="text-white">
                  New to Netflix?{" "}
                  <a href="#" className="text-decoration-none text-white">
                    Sign up now.
                  </a>
                </span>
              </div>
              <p className="text-white text-center mt-4" style={{ fontSize: "0.8rem" }}>
                This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
                <a href="#" className="text-decoration-none text-white">
                  Learn more.
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
