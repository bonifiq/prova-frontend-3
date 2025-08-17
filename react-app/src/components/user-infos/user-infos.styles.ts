import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { COLORS } from "../../utils/colors/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Text = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 10px 10px;
`;

export const UserInfoSkeleton = styled(Skeleton).attrs({
  baseColor: COLORS.primaryDark,
  highlightColor: COLORS.primary,
})`
  width: 200px;
  max-width: 100%;
  height: 20px;
  margin: 10px 10px;
`;
