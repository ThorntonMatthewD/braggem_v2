import { useAuth } from "../../hooks/useAuth";
import {
  Circle,
  Container,
  CourtLogoContainer,
  CurveHead,
  HeaderTitle,
} from "./style";

const Header = () => {
  const { user }: any = useAuth();
  return (
    <Container>
      <CurveHead>
        <Circle />
        <HeaderTitle>Braggem</HeaderTitle>
        {!!user && (
          <CourtLogoContainer>
            <img
              src={require(`../../media/${user?.favorite_team}.png`)}
              alt=""
            />
          </CourtLogoContainer>
        )}
      </CurveHead>
    </Container>
  );
};
export default Header;
