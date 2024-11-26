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
        height: "100vh",
      }}
    >
      <div className="overlay">
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Row className="w-75">
            <Col
              xs={12}
              sm={10}
              md={8}
              lg={6}
              className="login-form-container mx-auto "
            >
              <h1 className="text-white mb-4 text-left custom-heading">Sign In</h1>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mt-3 d-flex justify-content-center align-items-center">
                  <Form.Control
                  style={{backgroundColor:"black"}}
                    className="custom-input text-white w-75"
                    type="email"
                    placeholder="Email or mobile number"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3 d-flex justify-content-center align-items-center">
                  <Form.Control
                  style={{backgroundColor:"black"}}
                    className="custom-input text-white w-75"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <div className="mt-4 text-center">
                  <Button
                    className="w-75"
                    type="submit"
                    style={{
                      backgroundColor: "red",
                      borderColor: "red",
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              </Form>

              <div className="text-center text-white mt-4">
                <span>OR</span>
                <div className="mt-2">
                  <Button variant="secondary" className="w-75">
                    Use a Sign-In Code
                  </Button>
                </div>
              </div>

              <div className="text-center mt-3 text-white">
                <a href="#" className="text-decoration-none text-white">
                  Forgot password?
                </a>
              </div>

              <div className="text-center mt-4 text-white">
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
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
