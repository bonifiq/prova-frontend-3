import { useEffect, useState } from "react";
import type { UserType } from "./types/user";
import type { ContentType } from "./types/content";
import { INITIAL_ERROR, INITIAL_USER_DATA } from "./constants";
import type { Error, WidgetContentLayoutProps } from "./types/props";
import { ErrorKey } from "./types/error-enum";

export const useWidgetHook = ():WidgetContentLayoutProps => {
    const [user, setUser] = useState<UserType>(INITIAL_USER_DATA);
    const [content, setContent] = useState<ContentType[]>([]);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isContentLoading, setIsContentLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<Error>(INITIAL_ERROR);

    const handleClose = () => {
        window.parent.postMessage({ type: 'WIDGET_CLOSE' }, '*');
    };

    const toggleUserIsLoading = () => {
        setIsUserLoading(!isUserLoading)
    }

    const toggleContentIsLoading = () => {
        setIsContentLoading(!isContentLoading)
    }

    const handleErrorMessage = (errorKey: string, message: string) => {
        setErrorMessage(prev => ({
            ...prev,
            [errorKey]: message
        }));
    }

    useEffect(() => {
        const handleUserInfo = (event: MessageEvent) => {
            if (event.data?.type === 'USER_ID') {
                const userId = event.data.id;

                fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then((data) => {
                        if (data && Object.keys(data).length > 0) {
                            setUser(data);
                        } else {
                            handleErrorMessage(ErrorKey.USER, 'Usuário não encontrado.')
                            setUser(INITIAL_USER_DATA);
                        }
                    })
                    .catch(() => {
                        handleErrorMessage(ErrorKey.USER, `Erro ao buscar dados do usuário: ${userId}`)
                        setUser(INITIAL_USER_DATA);
                    })
                    .finally(toggleUserIsLoading);
            }
        };

        window.addEventListener('message', handleUserInfo);
        return () => window.removeEventListener('message', handleUserInfo);
    }, []);


    useEffect(() => {
        const handleContentData = (event: MessageEvent) => {
            if (event.data?.type === 'USER_ID') {
                const userId = event.data.id;

                fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`Erro HTTP: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then((data) => {
                        if (Array.isArray(data) && data.length > 0) {
                            setContent(data);
                        } else {
                            handleErrorMessage(ErrorKey.CONTENT, 'Nenhum conteúdo encontrado para este usuário.');
                            setContent([]);
                        }
                    })
                    .catch(() => {
                         handleErrorMessage(ErrorKey.CONTENT, 'Erro ao buscar dados do conteúdo:');
                        setContent([]);
                    })
                    .finally(toggleContentIsLoading);
            }
        };

        window.addEventListener('message', handleContentData);
        return () => window.removeEventListener('message', handleContentData);
    }, []);

    return {
        handleClose,
        user,
        content,
        isUserLoading,
        isContentLoading,
        error: errorMessage
    }
}