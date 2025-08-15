import type { ContentType } from "./contents";
import type { UserType } from "./user";

export type WidgetContentLayoutProps = {
    handleClose: () => void;
    user?: UserType;
    content?: ContentType[];
    isUserLoading: boolean;
    isContentLoading: boolean;
}