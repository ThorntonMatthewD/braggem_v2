import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { handleError } from "../../utils";
import moment from "moment";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {
  AvatarBox,
  AvatarSection,
  BackButton,
  BackButtonContainer,
  ChallengeButton,
  ChallengeContainer,
  DateJoined,
  ImageContainer,
  Label,
  LandscapeContainer,
  LifetimeContainer,
  MainStatsContainer,
  NumbersContainer,
  StatsHeader,
  TeamImage,
  TitlesContainer,
  UserBoxContainer,
  UserImage,
  Username,
  UsernameContainer,
} from "./style";
import { favoriteTeam } from "./utils";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { OptionsProps } from "../../types";
import Image from "../Base/Image";

const UserInfo = () => {
  const { user }: any = useAuth();
  const [userData, setUserData] = useState(Object);
  const [lifetimePicks, setLifetimePicks] = useState([]);
  const navigate = useNavigate();
  let { username } = useParams();

  const day = new Date();
  const today = moment(day).format("YYYY-MM-DD");

  useEffect(() => {
    getUserData();
    getLifetimePicks();
  }, []);

  const getUserData = async () => {
    const response: any = await fetch(
      `/api_v1/user/profile/${username}/`
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setUserData(data[0]);
    }
  };

  const getLifetimePicks = async () => {
    const response: any = await fetch(
      `/api_v1/picks/lifetime/${username}`
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setLifetimePicks(data);
    }
  };
  const getOccurrence = (array: any, value: any) => {
    return array.filter((v: any) => v === value).length;
  };
  const lifetimeWinLoss = lifetimePicks.map((pick: any) => pick.is_correct);
  const lifetimeCorrectGuesses = getOccurrence(lifetimeWinLoss, true);
  const lifetimeIncorrectGuesses = getOccurrence(lifetimeWinLoss, false);
  const lifetimeTotalGuesses =
    lifetimeCorrectGuesses + lifetimeIncorrectGuesses;
  const lifetimeGuessPercentage = (
    (lifetimeCorrectGuesses / lifetimeTotalGuesses) *
    100
  ).toFixed(0);

  const initialSignUpDate = userData?.date_joined;
  const dateJoined = moment(initialSignUpDate).format("MMM YYYY");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("challenger", user.user);
    formData.append("opponent", userData.user);
    formData.append("date", today);
    const options: OptionsProps = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response: any = await fetch("/api_v1/challenges/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 4000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: `You challenged ${username}!`,
    });
    navigate("/home/headtohead");
  };

  return (
    <>
      <BackButtonContainer>
        <Link to="/home/leaderboard/">
          <BackButton>
            <IoIosArrowBack /> Back to Leaderboard
          </BackButton>
        </Link>
      </BackButtonContainer>
      <UserBoxContainer>
        <LandscapeContainer
          background={`${favoriteTeam(userData?.favorite_team)}`}
        >
          <ImageContainer>
            <Image
              imageKey={userData?.favorite_team}
              style={{width: "100%"}}
            />
          </ImageContainer>
        </LandscapeContainer>
        <AvatarSection>
          <AvatarBox>
            <UserImage src={userData?.avatar} alt="" />
          </AvatarBox>
        </AvatarSection>
        <UsernameContainer>
          <Username>{userData?.username}</Username>
        </UsernameContainer>
        <DateJoined>User since {dateJoined}</DateJoined>
        <MainStatsContainer>
          <LifetimeContainer>
            <StatsHeader>Lifetime Stats</StatsHeader>
            <TitlesContainer>
              <Label textDecoration="underline">Correct Picks</Label>
              <Label textDecoration="underline">Games</Label>
              <Label textDecoration="underline">Percentage</Label>
            </TitlesContainer>
            <NumbersContainer>
              <Label>{lifetimeCorrectGuesses}</Label>
              <Label>{lifetimeTotalGuesses}</Label>
              <Label>{lifetimeGuessPercentage}%</Label>
            </NumbersContainer>
          </LifetimeContainer>
          <ChallengeContainer>
            <Link to="/home/headtohead">
              <ChallengeButton onClick={handleSubmit}>
                Challenge <MdOutlinePersonAddAlt />
              </ChallengeButton>
            </Link>
          </ChallengeContainer>
        </MainStatsContainer>
      </UserBoxContainer>
    </>
  );
};
export default UserInfo;
