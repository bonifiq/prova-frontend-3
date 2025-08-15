import { useEffect, useState } from "react";
import type { UserType } from "./types/user";
import type { ContentType } from "./types/contents";
import { INITIAL_USER_DATA } from "./constants";

export const useWidgetHook = () => {
    const [user, setUser] = useState<UserType>(INITIAL_USER_DATA);
    const [content, setContent] = useState<ContentType[]>([]);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isContentLoading, setIsContentLoading] = useState(true);

    const toggleUserIsLoading = () => {
        setIsUserLoading(!isUserLoading)
    }

    const toggleContentIsLoading = () => {
        setIsContentLoading(!isContentLoading)
    }

    const handleClose = () => {
        window.parent.postMessage({ type: 'WIDGET_CLOSE' }, '*');
    };

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
                            console.warn('Usuário não encontrado.');
                            setUser(INITIAL_USER_DATA);
                        }
                    })
                    .catch((err) => {
                        console.error('Erro ao buscar dados do usuário:', err);
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
                            console.warn('Nenhum conteúdo encontrado para este usuário.');
                            setContent([]);
                        }
                    })
                    .catch((err) => {
                        console.error('Erro ao buscar dados do conteúdo:', err);
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
        isContentLoading
    }
}