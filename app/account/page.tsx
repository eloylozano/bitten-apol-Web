"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Center from "../components/Center";
import Title from "../components/Title";
import WhiteBox from "../components/WhiteBox";
import styled from "styled-components";
import Footer from "../components/Footer";
import { SyncLoader } from "react-spinners";
import Button from "../components/Button";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 81vh;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const UserInfo = styled.div`
  background-color: #efefef;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #d0d0d0;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

const Value = styled.span`
  color: #555;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 60%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px; // Espacio entre botones
  margin-top: 20px;
`;

const AccountPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await axios.get("/api/auth/me");

        if (res.status === 200) {
          setUser(res.data);
          setEditedFirstName(res.data.firstName);
          setEditedLastName(res.data.lastName);
        } else {
          window.location.href = "/login"; // Redirige si la sesión no es válida
        }
      } catch (error) {
        window.location.href = "/login"; // Redirige si hay error
      }
    };

    checkUserSession();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put("/api/auth/update", {
        firstName: editedFirstName,
        lastName: editedLastName,
      });

      if (res.status === 200) {
        setUser(res.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout"); // Llama al endpoint de logout
      window.location.href = "/login"; // Redirige al login
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) {
    return (
      <Center>
        <SyncLoader color="#0070f3" />
      </Center>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <AccountContainer>
          <Title>Account Information</Title>
          <WhiteBox>
            <UserInfo>
              <InfoRow>
                <Label>First Name:</Label>
                {isEditing ? (
                  <Input
                    type="text"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                  />
                ) : (
                  <Value>{user.firstName}</Value>
                )}
              </InfoRow>
              <InfoRow>
                <Label>Last Name:</Label>
                {isEditing ? (
                  <Input
                    type="text"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                ) : (
                  <Value>{user.lastName}</Value>
                )}
              </InfoRow>
              <InfoRow>
                <Label>Email:</Label>
                <Value>{user.email}</Value>
              </InfoRow>
            </UserInfo>
            <ButtonContainer>
              {isEditing ? (
                <Button primary onClick={handleSave}>
                  Save Changes
                </Button>
              ) : (
                <Button primary onClick={handleEdit}>
                  Edit Information
                </Button>
              )}
              <Button grey onClick={handleLogout}>Logout</Button>
            </ButtonContainer>
          </WhiteBox>
        </AccountContainer>
      </Center>
      <Footer />
    </>
  );
};

export default AccountPage;