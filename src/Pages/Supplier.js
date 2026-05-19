import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BASEURL } from "../Config/Api";

const SupplierPage = () => {

const handlePunchout = async (supplierName) => {
  try {
    const buyerId = localStorage.getItem("buyerId");
    const orgId = localStorage.getItem("orgId");
    const buyerEmail = localStorage.getItem("buyerEmail");

    const res = await fetch(`${BASEURL}/api/buyer/punchout/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "buyer-id": buyerId,
        "org-id": orgId,
        "buyer-email": buyerEmail,
      },
      body: JSON.stringify({
        supplier: supplierName,
      }),
    });

    const data = await res.json();

    // ❌ If backend returns error (like invalid org)
    if (!res.ok) {
      alert(data.error || "❌ You are not a registered buyer");
      return;
    }

    // ❌ If redirect URL missing
    if (!data.redirectUrl) {
      alert("❌ Punchout failed. No redirect URL received.");
      return;
    }

    // ✅ Success case
    alert("✅ Punchout session started successfully 🚀");

    setTimeout(() => {
      window.location.href = data.redirectUrl;
    }, 1000);

  } catch (error) {
    console.error(error);
    alert("❌ Something went wrong. Please try again.");
  }
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