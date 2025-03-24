import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.div`
  h3 {
    color: #108A01;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #4FAB4A;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #8CCC8C;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4FAB4A;
    box-shadow: 0 0 0 2px rgba(79, 171, 74, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: #108A01;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4FAB4A;
  }
`;

export default function Payform() {
  return (
    <FormContainer>
      <Form method="post" action="https://sandbox.payhere.lk/pay/checkout">
        {/* Hidden inputs */}
        <input type="hidden" name="merchant_id" value="" />
        <input type="hidden" name="return_url" value="http://localhost:3000/home" />
        <input type="hidden" name="cancel_url" value="http://localhost:3000/home" />
        <input type="hidden" name="notify_url" value="http://localhost:3000/home" />
        <input type="hidden" name="country" value="Sri Lanka" />
        <input type="hidden" name="hash" value="" />

        {/* Item Details Section */}
        <Section>
          <h3>Item Details</h3>
          <InputGroup>
            <InputWrapper>
              <Label htmlFor="order_id">Order ID</Label>
              <Input id="order_id" type="text" name="order_id" defaultValue="order45" />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="items">Items</Label>
              <Input id="items" type="text" name="items" defaultValue="carrot" />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" type="text" name="currency" defaultValue="LKR" />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="text" name="amount" defaultValue="502" />
            </InputWrapper>
          </InputGroup>
        </Section>

        {/* Customer Details Section */}
        <Section>
          <h3>Customer Details</h3>
          <InputGroup>
            <InputWrapper>
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" type="text" name="first_name" defaultValue="Samaftyyn" />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" type="text" name="last_name" defaultValue="Perfgfgera" />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" defaultValue="techtraazsl@gmail.com" />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" name="phone" defaultValue="0771234567" />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="address">Address</Label>
              <Input id="address" type="text" name="address" defaultValue="No.1, Galle Road" />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="city">City</Label>
              <Input id="city" type="text" name="city" defaultValue="Colombo" />
            </InputWrapper>
          </InputGroup>
        </Section>

        <SubmitButton type="submit">Pay Now</SubmitButton>
      </Form>
    </FormContainer>
  );
}