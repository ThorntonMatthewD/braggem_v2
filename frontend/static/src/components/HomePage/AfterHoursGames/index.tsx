import { SpanBar } from "../PreTipoffGames/style";
import { CardProps } from "../types";
import { activeTeam } from "../utils";
import {
  Form,
  InfoContainer,
  StatusContainer,
  Status,
  Location,
  AfterHoursStatus,
  ScoreContainer,
  Tricode,
  Score,
  GameButtonContainer,
  TeamButton,
  ImageContainer,
  TeamLogoImage,
  GameDetailsContainer,
  TeamCity,
  WinLoss,
} from "./style";
import Image from "../../Base/Image";

const AfterHoursGames = ({
  todaysGames,
  handleSubmit,
  handleAwayTeamInput,
  handleHomeTeamInput,
}: CardProps) => {
  return todaysGames.map((game: any) => (
    <Form
      // data-aos="zoom-in"
      key={game.gameId}
      onSubmit={handleSubmit}
    >
      <InfoContainer>
        {game.gameStatus === 1 ? (
          <StatusContainer>
            <Status>
              {game.day}, {game.gameStatusText}
            </Status>
            <Location>
              {game.arenaName} - {game.arenaCity}, {game.arenaState}
            </Location>
          </StatusContainer>
        ) : game.gameStatus === 2 ? (
          <StatusContainer>
            <AfterHoursStatus>{game.gameStatusText}</AfterHoursStatus>
            <Location>
              {game.arenaName} - {game.arenaCity}, {game.arenaState}
            </Location>
          </StatusContainer>
        ) : (
          <StatusContainer>
            <AfterHoursStatus>{game.gameStatusText}</AfterHoursStatus>
            <ScoreContainer>
              <Tricode>{game.awayTeam.teamTricode}</Tricode>
              <Score>{game.awayTeam.score}</Score> -
              <Tricode>{game.homeTeam.teamTricode}</Tricode>
              <Score>{game.homeTeam.score}</Score>
            </ScoreContainer>
          </StatusContainer>
        )}
      </InfoContainer>
      <SpanBar />
      <GameButtonContainer>
        <TeamButton
          disabled
          type="button"
          id={game.gameId}
          name="awayTeam"
          onClick={handleAwayTeamInput}
          value={game.awayTeam.teamName}
          background={activeTeam(game.awayTeam.teamTricode)}
        >
          <ImageContainer>
            <Image
              imageKey={game.awayTeam.teamTricode}
              style={{width: "100%"}}
            />
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
          disabled
          type="button"
          id={game.gameId}
          name="homeTeam"
          onClick={handleHomeTeamInput}
          value={game.homeTeam.teamName}
          background={activeTeam(game.homeTeam.teamTricode)}
        >
          <ImageContainer>
            <Image
              imageKey={game.homeTeam.teamTricode}
              style={{width: "100%"}}
            />
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
    </Form>
  ));
};
export default AfterHoursGames;
