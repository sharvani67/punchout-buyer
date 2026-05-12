import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BASEURL } from "../Config/Api";

const SupplierPage = () => {

const handlePunchout = async (supplierName) => {
  const buyerId = localStorage.getItem("buyerId");

  const res = await fetch(`${BASEURL}/api/buyer/punchout/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "buyer-id": buyerId,
    },
  });

  const data = await res.json();

  // ✅ Show success message
  alert("Punchout session started successfully 🚀");

  // ✅ Redirect after small delay
  setTimeout(() => {
    window.location.href = data.redirectUrl;
  }, 1000);
};

  const suppliers = [
    {
      name: "MVB Supplier",
      description: "IT Products & Accessories",
      color: "primary",
    },
    {
      name: "TechZone",
      description: "Electronics & Gadgets",
      color: "success",
    },
    {
      name: "OfficeMart",
      description: "Office Supplies & Stationery",
      color: "warning",
    },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">🏢 Select a Supplier</h2>

      <Row>
        {suppliers.map((supplier, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="shadow-lg h-100 border-0">
              <Card.Body className="text-center">
                <Card.Title className={`text-${supplier.color}`}>
                  {supplier.name}
                </Card.Title>

                <Card.Text className="mb-4">
                  {supplier.description}
                </Card.Text>

                <Button
                  variant={supplier.color}
                  onClick={() => handlePunchout(supplier.name)}
                >
                  Punchout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SupplierPage;