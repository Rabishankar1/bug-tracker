import { useAuth } from "../app/context/AuthProvider";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #2d2d2d, #1a1a1a);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 8px;
    text-align: center;
  }
`;

const Username = styled.div`
  justify-self: start;
  font-weight: bold;
  color: #f0f0f0;
  font-size: 1.2rem;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 600px) {
    justify-self: center;
  }
`;

const Role = styled.div`
  justify-self: center;
  color: #d0d0d0;
  font-size: 1.1rem;
  letter-spacing: 0.75px;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 600px) {
    order: 2;
  }
`;

const LogoutButton = styled.button`
  justify-self: end;
  padding: 0.5rem 1rem;
  background: #e53e3e;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  font-size: 1rem;
  letter-spacing: 0.75px;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    background: #c53030;
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    justify-self: center;
  }
`;

export default function Navbar() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <NavbarContainer>
      <Username>{user?.username || ""}</Username>
      <Role>{user?.role || ""}</Role>
      <LogoutButton onClick={logout}>Logout</LogoutButton>
    </NavbarContainer>
  );
}
