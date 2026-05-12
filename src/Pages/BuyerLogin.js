import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { BASEURL } from "../Config/Api";

const BuyerLogin = () => {
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  const res = await fetch(`${BASEURL}/api/buyer/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, secret }),
  });

  const data = await res.json();

  if (data.buyerId) {
    localStorage.setItem("buyerId", data.buyerId);

    // ✅ Go to supplier selection page
    navigate("/supplier");
  } else {
    alert(data.message || "Login failed");
  }
};
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col md={4} className="mx-auto">
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h3 className="text-center mb-4">🔐 Buyer Login</h3>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyerLogin;