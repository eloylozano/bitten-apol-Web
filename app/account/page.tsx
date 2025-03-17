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
  phone: string;
  profilePicture: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

const AccountContainer = styled.div`
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  gap: 10px;
  margin-top: 20px;
`;

const ProfilePicture = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0px auto 20px;
  `;

const AccountPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [editedStreet, setEditedStreet] = useState("");
  const [editedCity, setEditedCity] = useState("");
  const [editedPostalCode, setEditedPostalCode] = useState("");
  const [editedCountry, setEditedCountry] = useState("");

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await axios.get("/api/auth/me");

        if (res.status === 200) {
          setUser(res.data);
          setEditedFirstName(res.data.firstName);
          setEditedLastName(res.data.lastName);
          setEditedPhone(res.data.phone || "");
          setProfilePicture(res.data.profilePicture || "");
          if (res.data.address) {
            setEditedStreet(res.data.address.street);
            setEditedCity(res.data.address.city);
            setEditedPostalCode(res.data.address.postalCode);
            setEditedCountry(res.data.address.country);
          }
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        window.location.href = "/login";
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
        phone: editedPhone,
        profilePicture,
      });

      if (res.status === 200) {
        setUser(res.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleProfilePictureUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload-profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.url) {
        setProfilePicture(res.data.url);
        await axios.put("/api/auth/update", {
          profilePicture: res.data.url,
        });
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleSaveAddress = async () => {
    try {
      const res = await axios.put("/api/auth/update-address", {
        street: editedStreet,
        city: editedCity,
        postalCode: editedPostalCode,
        country: editedCountry,
      });
  
      if (res.status === 200) {
        setUser(res.data);
        setIsEditingAddress(false);
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("authToken");
      localStorage.removeItem("cart");
      window.location.reload();
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
          <Column>
            <Title>Profile Information</Title>
            <WhiteBox>
              <UserInfo>
                <ProfilePicture
                  src={profilePicture || "/default-profile.png"}
                  alt="Profile Picture"
                />
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
                <InfoRow>
                  <Label>Phone:</Label>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                    />
                  ) : (
                    <Value>{user.phone || "Not provided"}</Value>
                  )}
                </InfoRow>
                {isEditing && (
                  <InfoRow>
                    <Label>Profile Picture:</Label>
                    <Input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleProfilePictureUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </InfoRow>
                )}
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
                <Button grey onClick={handleLogout}>
                  Logout
                </Button>
              </ButtonContainer>
            </WhiteBox>
          </Column>

          <Column>
            <Title>Address Information</Title>
            <WhiteBox>
              <UserInfo>
                <InfoRow>
                  <Label>Street:</Label>
                  {isEditingAddress ? (
                    <Input
                      type="text"
                      value={editedStreet}
                      onChange={(e) => setEditedStreet(e.target.value)}
                    />
                  ) : (
                    <Value>{user.address?.street || "Not provided"}</Value>
                  )}
                </InfoRow>
                <InfoRow>
                  <Label>City:</Label>
                  {isEditingAddress ? (
                    <Input
                      type="text"
                      value={editedCity}
                      onChange={(e) => setEditedCity(e.target.value)}
                    />
                  ) : (
                    <Value>{user.address?.city || "Not provided"}</Value>
                  )}
                </InfoRow>
                <InfoRow>
                  <Label>Postal Code:</Label>
                  {isEditingAddress ? (
                    <Input
                      type="text"
                      value={editedPostalCode}
                      onChange={(e) => setEditedPostalCode(e.target.value)}
                    />
                  ) : (
                    <Value>{user.address?.postalCode || "Not provided"}</Value>
                  )}
                </InfoRow>
                <InfoRow>
                  <Label>Country:</Label>
                  {isEditingAddress ? (
                    <Input
                      type="text"
                      value={editedCountry}
                      onChange={(e) => setEditedCountry(e.target.value)}
                    />
                  ) : (
                    <Value>{user.address?.country || "Not provided"}</Value>
                  )}
                </InfoRow>
              </UserInfo>
              <ButtonContainer>
                {isEditingAddress ? (
                  <Button primary onClick={handleSaveAddress}>
                    Save Address
                  </Button>
                ) : (
                  <Button primary onClick={handleEditAddress}>
                    Edit Address
                  </Button>
                )}
              </ButtonContainer>
            </WhiteBox>
          </Column>
        </AccountContainer>
      </Center>
      <Footer />
    </>
  );
};

export default AccountPage;
