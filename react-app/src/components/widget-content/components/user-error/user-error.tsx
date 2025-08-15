import type { ReactElement } from "react";
import type { UserErrorLayoutProps } from "./types";
import { Typography } from "../../../typography/typography";
import { TypographyVariants } from "../../../typography/types";

export const UserError = ({ message }: UserErrorLayoutProps): ReactElement => {
    return (
        <Typography variant={TypographyVariants.TITLE}>{message}</Typography>
    )
}