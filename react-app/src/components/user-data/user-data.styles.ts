import styled from "styled-components";
import { COLORS } from "../../utils/colors/colors";
import Skeleton from "react-loading-skeleton";

export const Container = styled.div`
  background-color: ${COLORS.primaryDark};
  border-radius: 10px;
  max-width: 100%;
  margin: 5px 10px;
  padding: 15px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 800;
  margin: 0px;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0px;
`;

export const UserDataSkeleton = styled(Skeleton).attrs({
  baseColor: COLORS.primaryDark,
  highlightColor: COLORS.primary,
})`
  max-width: 100%;
  height: 400px;
`;
