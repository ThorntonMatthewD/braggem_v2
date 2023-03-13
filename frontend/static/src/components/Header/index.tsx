import { useAuth } from "../../hooks/useAuth";
import {
  Circle,
  Container,
  CourtLogoContainer,
  CurveHead,
  HeaderTitle,
} from "./style";
import Image from "../Base/Image";

const Header = () => {
  const { user }: any = useAuth();

  return (
    <Container>
      <CurveHead>
        <Circle />
        <HeaderTitle>Braggem</HeaderTitle>
        {!!user && (
          <CourtLogoContainer>
            <Image
              imageKey={user?.favorite_team}
            />
          </CourtLogoContainer>
        )}
      </CurveHead>
    </Container>
  );
};
export default Header;
