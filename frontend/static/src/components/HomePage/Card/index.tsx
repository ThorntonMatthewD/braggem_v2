// import "aos/dist/aos.css";
// import Aos from "aos";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import CountdownTimer from "../../CountdownTimer";
// import CardFooter from "./CardFooter";
import { handleError } from "../../../utils";
import Cookies from "js-cookie";
import moment from "moment";
import { BsCheckCircleFill } from "react-icons/bs";
import { OptionsProps } from "../../../types";
import PreTipoffGames from "../PreTipoffGames";
import AfterHoursGames from "../AfterHoursGames";

const Card = () => {
  const [todaysGames, setTodaysGames] = useState([]);
  const [todaysPicks, setTodaysPicks] = useState([]);
  const [gameID, setGameID] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [userPick, setUserPick] = useState("");
  const [opponent, setOpponent] = useState("");
  const [awayTeamFocus, setAwayTeamFocus] = useState(false);
  const [homeTeamFocus, setHomeTeamFocus] = useState(false);
  const [firstGameTime, setFirstGameTime] = useState("");
  const { user }: any = useAuth();
  const day = new Date();
  const dd = String(day.getDate()).padStart(2, "0");
  const mm = String(day.getMonth() + 1).padStart(2, "0");
  const yyyy = day.getFullYear();
  const currentDay = dd + "-" + mm + "-" + yyyy;

  useEffect(() => {
    getTodaysGames();
    getTodaysPicks();
  }, []);

  useEffect(() => {
    getTodaysPicks();
  }, [userPick]);

  const getTodaysPicks = async () => {
    const response: any = await fetch(`/api_v1/picks/current/${user.id}`).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setTodaysPicks(data);
    }
  };

  const getTodaysGames = async () => {
    const options: OptionsProps = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_APIKEY,
        "X-RapidAPI-Host": "nba-schedule.p.rapidapi.com",
      },
    };
    const data = await fetch(
      `https://nba-schedule.p.rapidapi.com/schedule?date=${currentDay}`,
      options
    ).then((response) => response.json());
    setTodaysGames(data[0].games);
    setFirstGameTime(data[0].games[0].gameDateTimeEst);
    setGameDate(moment(data[0].games[0].gameDateTimeEst).format("YYYY-MM-DD"));
  };

  const handleAwayTeamInput = (e: any) => {
    setUserPick(e.target.value);
    setOpponent(e.target.name);
    setGameID(e.target.id);
    setAwayTeamFocus(true);
    setHomeTeamFocus(false);
  };

  const handleHomeTeamInput = (e: any) => {
    setUserPick(e.target.value);
    setOpponent(e.target.name);
    setGameID(e.target.id);
    setHomeTeamFocus(true);
    setAwayTeamFocus(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("gameid", gameID);
    formData.append("date", gameDate);
    formData.append("user_pick", userPick);
    formData.append("opponent", opponent);
    const options: OptionsProps = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response: any = await fetch("/api_v1/picks/current/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      localStorage.setItem(`00${gameID}`, userPick);
    }
    e.target.children[3].children[0].disabled = true;
    window.scrollBy(0, 330);
    setUserPick("");
    setHomeTeamFocus(false);
    setAwayTeamFocus(false);
  };

  //   useEffect(() => {
  //     Aos.init({ duration: 1000 });
  //   }, []);

  //Before Tip Off//

  const picksCompletedPercentage =
    (todaysPicks.length / todaysGames.length) * 100;

  //After Tip Off//

  const firstGameStartingTime = new Date(firstGameTime);
  const firstGameStartingTimeInMS = firstGameStartingTime.getTime();
  const fiveHoursInMS = 18000000; //use this line for production
  // const fiveHoursInMS = 111144000000; //use this for evening testing
  const nowInMS = new Date().getTime();
  const timeUntilGameInMS = firstGameStartingTimeInMS - nowInMS;
  const gameTimeCountDownInMS = nowInMS + timeUntilGameInMS + fiveHoursInMS;
  const timeUntilEstGameInMS = timeUntilGameInMS + fiveHoursInMS;

  return (
    <>
      <main>
        {timeUntilEstGameInMS > 0 ? (
          <h4 className="welcome">
            Welcome, {user?.username}!{" "}
            <p className="instructions">
              Select your favorite teams to win and check back tomorrow to see
              how you did!
            </p>
          </h4>
        ) : (
          <h4 className="welcome">Welcome, {user?.username}!</h4>
        )}
        <div className="carddiv">
          <CountdownTimer targetDate={gameTimeCountDownInMS} />
        </div>
        <div className="cards col-md-10 offset-md-1 col-12">
          {timeUntilEstGameInMS > 0 ? <PreTipoffGames /> : <AfterHoursGames />}
        </div>
        {/* <CardFooter
          todaysPicks={todaysPicks}
          setTodaysPicks={setTodaysPicks}
          picksCompletedPercentage={picksCompletedPercentage}
          todaysGames={todaysGames}
          getTodaysPicks={getTodaysPicks}
          timeUntilEstGameInMS={timeUntilEstGameInMS}
        /> */}
      </main>
    </>
  );
};

export default Card;
