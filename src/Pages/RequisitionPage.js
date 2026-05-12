import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { BASEURL } from "../Config/Api";

const RequisitionPage = () => {
  const [items, setItems] = useState([]);
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("sessionId");

  useEffect(() => {
    if (!sessionId) return;

    fetch(`${BASEURL}/api/buyer/requisition/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.cart_json) return;

        const parsed = JSON.parse(data.cart_json);
        setItems(parsed);
      });
  }, [sessionId]);

  if (items.length === 0) {
    return <h3 className="text-center mt-5">Loading cart...</h3>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">📦 Requisition</h2>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>₹{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-center">
        <Button variant="success">Approve ✅</Button>
      </div>
    </Container>
  );
};

export default RequisitionPage;