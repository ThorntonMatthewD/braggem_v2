import { Link, useOutlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { handleError } from "../../utils";
import { Toast, whoseHandIsItAnyway } from "./utils";
import {
  ActiveButton,
  Button,
  HamburgerButton,
  HamburgerContainer,
  HeaderContainer,
  NavItem,
  OffcanvasBody,
  OffcanvasHeader,
} from "./style";
import Offcanvas from "react-bootstrap/Offcanvas";
import Cookies from "js-cookie";
import { HiOutlineMenu } from "react-icons/hi";
import { OptionsProps } from "../../types";

export const ProtectedLayout = () => {
  const { user, logout }: any = useAuth();
  const outlet = useOutlet();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const logoutUser = async () => {
    const options: OptionsProps = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response: any = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Oops! Something went wrong");
    } else {
      const data = await response.json();
      Cookies.remove("Authorization", Cookies.attributes);
      Toast.fire({
        icon: "warning",
        title: "You are now logged out.",
      });
      handleClose();
    }
    logout();
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      {user?.right_handed ? (
        <HamburgerContainer>
          <HamburgerButton padding="20px 20px 10px 0px" onClick={handleShow}>
            <HiOutlineMenu />
          </HamburgerButton>
        </HamburgerContainer>
      ) : (
        <HamburgerContainer>
          <HamburgerButton padding="20px 0px 10px 20px" onClick={handleShow}>
            <HiOutlineMenu />
          </HamburgerButton>
        </HamburgerContainer>
      )}
      <HeaderContainer>
        <Offcanvas
          placement={whoseHandIsItAnyway(user)}
          show={show}
          onHide={handleClose}
          responsive="md"
        >
          <OffcanvasHeader closeButton closeVariant="white" />
          <OffcanvasBody>
            <NavItem>
              <Link to={`/home/${user?.username}/`}>
                {window.location.href.includes(`/home/${user?.username}/`) ? (
                  <ActiveButton onClick={handleClose}>Profile</ActiveButton>
                ) : (
                  <Button onClick={handleClose}>Profile</Button>
                )}
              </Link>
            </NavItem>
            <NavItem>
              <Link to={"leaderboard"}>
                {window.location.href.includes("leaderboard") ? (
                  <ActiveButton onClick={handleClose}>Leaderboard</ActiveButton>
                ) : (
                  <Button onClick={handleClose}>Leaderboard</Button>
                )}
              </Link>
            </NavItem>
            <NavItem>
              <Link to={"/home/games/"}>
                {window.location.href.includes("/home/games/") ? (
                  <ActiveButton autoFocus onClick={handleClose}>
                    Home
                  </ActiveButton>
                ) : (
                  <Button onClick={handleClose}>Home</Button>
                )}
              </Link>
            </NavItem>
            <NavItem>
              <Link to={"headtohead"}>
                {window.location.href.includes("headtohead") ? (
                  <ActiveButton onClick={handleClose}>
                    Head to Head
                  </ActiveButton>
                ) : (
                  <Button onClick={handleClose}>Head to Head</Button>
                )}
              </Link>
            </NavItem>
            <NavItem>
              <Button onClick={() => logoutUser()}>Logout</Button>
            </NavItem>
          </OffcanvasBody>
        </Offcanvas>
      </HeaderContainer>
      {outlet}
    </>
  );
};
