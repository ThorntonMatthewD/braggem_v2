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
              fileName={`${user?.favorite_team}.png`}
              altText=""
            />
          </CourtLogoContainer>
        )}
      </CurveHead>
    </Container>
  );
};
export default Header;
