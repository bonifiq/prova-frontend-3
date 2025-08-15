import type { ContentType } from "./content";
import type { UserType } from "./user";

export type WidgetContentLayoutProps = {
    handleClose: () => void;
    user?: UserType;
    content?: ContentType[];
    isUserLoading: boolean;
    isContentLoading: boolean;
    error: Error;
}

export type Error = {
    user: string;
    content: string;
}