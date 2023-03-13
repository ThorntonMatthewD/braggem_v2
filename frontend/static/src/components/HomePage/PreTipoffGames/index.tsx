import { BsCheckCircleFill } from "react-icons/bs";
import { CardProps } from "../types";
import { activeTeam } from "../utils";
import {
  Form,
  GameButtonContainer,
  GameDetailsContainer,
  GameLocationHeader,
  GameStatusHeader,
  ImageContainer,
  PickSubmittedContainer,
  SpanBar,
  SubmitButton,
  SubmittedAlert,
  TeamButton,
  TeamCity,
  TeamLogoImage,
  WinLoss,
} from "./style";
import Image from "../../Base/Image";

const PreTipoffGames = ({
  todaysGames,
  handleSubmit,
  handleAwayTeamInput,
  handleHomeTeamInput,
  gameID,
  awayTeamFocus,
  homeTeamFocus,
}: CardProps) => {
  return todaysGames.map((game: any) => (
    <Form
      className="formbox"
      data-aos="zoom-in"
      key={game.gameId}
      onSubmit={handleSubmit}
    >
      <GameStatusHeader>
        {game.day}, {game.gameStatusText}
      </GameStatusHeader>
      <GameLocationHeader>
        {game.arenaName} - {game.arenaCity}, {game.arenaState}
      </GameLocationHeader>
      <SpanBar />
      <GameButtonContainer>
        <TeamButton
          type="button"
          id={game.gameId}
          name={game.homeTeam.teamName}
          onClick={handleAwayTeamInput}
          value={game.awayTeam.teamName}
          background={activeTeam(game.awayTeam.teamTricode)}
          // className=
          //   gameID == game.gameId && awayTeamFocus
          //     ? `gamebtn${game.awayTeam.teamTricode} gamebtn col-12 selected-border`
          //     : `gamebtn${game.awayTeam.teamTricode} gamebtn col-12`
          // }
          disabled={localStorage.getItem(game.gameId) ? true : false}
        >
          <ImageContainer>
            <TeamLogoImage>
              <Image
                imageKey={game.awayTeam.teamTricode}
              />
            </TeamLogoImage>
          </ImageContainer>
          <GameDetailsContainer>
            <TeamCity>
              {game.awayTeam.teamCity} {game.awayTeam.teamName}
            </TeamCity>
            <WinLoss>
              {game.awayTeam.wins}-{game.awayTeam.losses}
            </WinLoss>
          </GameDetailsContainer>
        </TeamButton>
        <TeamButton
          type="button"
          id={game.gameId}
          name={game.awayTeam.teamName}
          onClick={handleHomeTeamInput}
          value={game.homeTeam.teamName}
          background={activeTeam(game.homeTeam.teamTricode)}
          // className={
          //   gameID == game.gameId && homeTeamFocus
          //     ? `gamebtn${game.homeTeam.teamTricode} gamebtn col-12 selected-border`
          //     : `gamebtn${game.homeTeam.teamTricode} gamebtn col-12`
          // }
          disabled={localStorage.getItem(game.gameId) ? true : false}
        >
          <ImageContainer>
            <TeamLogoImage>
              <Image
                imageKey={game.homeTeam.teamTricode}
              />
            </TeamLogoImage>
          </ImageContainer>
          <GameDetailsContainer>
            <TeamCity>
              {game.homeTeam.teamCity} {game.homeTeam.teamName}
            </TeamCity>
            <WinLoss>
              {game.homeTeam.wins}-{game.homeTeam.losses}
            </WinLoss>
          </GameDetailsContainer>
        </TeamButton>
      </GameButtonContainer>
      <PickSubmittedContainer>
        {localStorage.getItem(game.gameId) ? (
          <SubmittedAlert>
            Pick Submitted <BsCheckCircleFill style={{ marginLeft: "5px" }} />
          </SubmittedAlert>
        ) : (
          <SubmitButton
            type="submit"
            disabled={gameID == game.gameId ? false : true}
          >
            {gameID == game.gameId ? "Submit Pick" : "Choose a team!"}
          </SubmitButton>
        )}
      </PickSubmittedContainer>
    </Form>
  ));
};

export default PreTipoffGames;
