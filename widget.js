(function () {
    console.log('Widget instalado');

    // Configurações do widget
    // Configurações do widget
    const WIDGET_CONFIG = {
        buttonSize: '60px',
        iframeWidth: '320px',
        iframeHeight: '600px',
        iframeUrl: 'http://localhost:5173', // URL do app React em desenvolvimento
        zIndex: 999999
    };

    // Estado do widget
    let isOpen = false;
    let widgetButton = null;
    let widgetIframe = null;
    let widgetContainer = null;

    // Função para criar o botão flutuante
    function createWidgetButton() {
        widgetButton = document.createElement('div');
        widgetButton.id = 'widget-button';
        widgetButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none;">
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16ZM7 9H17V11H7V9ZM7 12H15V14H7V12Z" fill="white"/>
            </svg>
        `;

        // Estilos do botão
        Object.assign(widgetButton.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: WIDGET_CONFIG.buttonSize,
            height: WIDGET_CONFIG.buttonSize,
            backgroundColor: '#228be6',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: WIDGET_CONFIG.zIndex,
            transition: 'all 0.3s ease',
            border: 'none',
            userSelect: 'none' // Evita seleção de texto
        });

        // Efeitos hover
        widgetButton.addEventListener('mouseenter', () => {
            widgetButton.style.transform = 'scale(1.1)';
            widgetButton.style.backgroundColor = '#1971c2';
        });

        widgetButton.addEventListener('mouseleave', () => {
            widgetButton.style.transform = 'scale(1)';
            widgetButton.style.backgroundColor = '#228be6';
        });

        // Evento de clique
        widgetButton.addEventListener('click', toggleWidget);

        // Adicionar ao DOM
        document.body.appendChild(widgetButton);
    }

    // Função para criar o container do iFrame
    function createWidgetContainer() {
        widgetContainer = document.createElement('div');
        widgetContainer.id = 'widget-container';

        // Estilos do container
        Object.assign(widgetContainer.style, {
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: WIDGET_CONFIG.iframeWidth,
            height: WIDGET_CONFIG.iframeHeight,
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            zIndex: WIDGET_CONFIG.zIndex,
            display: 'none',
            overflow: 'hidden',
            border: '1px solid #e9ecef'
        });

        // Responsividade para mobile
        if (window.innerWidth <= 480) {
            Object.assign(widgetContainer.style, {
                bottom: '90px',
                right: '10px',
                left: '10px',
                width: 'auto',
                maxWidth: WIDGET_CONFIG.iframeWidth
            });
        }

        document.body.appendChild(widgetContainer);
    }

    // Função para criar o iFrame
    function createWidgetIframe() {
        widgetIframe = document.createElement('iframe');
        widgetIframe.id = 'widget-iframe';
        widgetIframe.src = WIDGET_CONFIG.iframeUrl;

        // Estilos do iframe
        Object.assign(widgetIframe.style, {
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '12px'
        });

        // Atributos de segurança
        widgetIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
        widgetIframe.setAttribute('loading', 'lazy');

        widgetContainer.appendChild(widgetIframe);

        // Escutar quando o iframe carregou
        widgetIframe.addEventListener('load', () => {
            console.log('iFrame carregado, enviando dados...');
            // Aguardar um pouco para garantir que o React app inicializou
            setTimeout(() => {
                sendWidgetOpenedMessage();
                sendUserIdToIframe();
            }, 500);
        });

        // Escutar mensagens do iFrame
        window.addEventListener('message', handleIframeMessage);
    }

    // Função para alternar a visibilidade do widget
    function toggleWidget() {
        if (isOpen) {
            closeWidget();
        } else {
            openWidget();
        }
    }

    // Função para abrir o widget
    function openWidget() {
        console.log('Abrindo widget...');

        if (!widgetContainer) {
            createWidgetContainer();
            createWidgetIframe();
        }

        widgetContainer.style.display = 'block';
        isOpen = true;

        // Atualizar ícone do botão para X
        widgetButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none;">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
            </svg>
        `;

        // Se o iframe já existe, apenas notificar que foi reaberto
        if (widgetIframe) {
            setTimeout(() => {
                sendWidgetOpenedMessage();
                sendUserIdToIframe();
            }, 100);
        }
    }

    // Função para fechar o widget
    function closeWidget() {
        console.log('Fechando widget...');

        if (widgetContainer) {
            widgetContainer.style.display = 'none';
        }
        isOpen = false;

        // Voltar ícone do botão para chat
        widgetButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none;">
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16ZM7 9H17V11H7V9ZM7 12H15V14H7V12Z" fill="white"/>
            </svg>
        `;
    }

    // Função para notificar que o widget foi aberto
    function sendWidgetOpenedMessage() {
        if (widgetIframe && widgetIframe.contentWindow) {
            console.log('Enviando mensagem WIDGET_OPENED');
            widgetIframe.contentWindow.postMessage({
                type: 'WIDGET_OPENED'
            }, '*');
        }
    }

    // Função para enviar o userId para o iFrame
    function sendUserIdToIframe() {
        if (widgetIframe && widgetIframe.contentWindow && window.loggedUserId) {
            console.log('Enviando userId:', window.loggedUserId);
            widgetIframe.contentWindow.postMessage({
                type: 'SET_USER_ID',
                userId: window.loggedUserId
            }, '*');
        } else {
            console.warn('Não foi possível enviar userId:', {
                iframe: !!widgetIframe,
                contentWindow: !!(widgetIframe && widgetIframe.contentWindow),
                loggedUserId: window.loggedUserId
            });
        }
    }

    // Função para lidar com mensagens do iFrame
    function handleIframeMessage(event) {
        console.log('Mensagem recebida do iFrame:', event.data);

        // Verificar origem (opcional, para segurança)
        // if (event.origin !== 'http://localhost:5173') return;

        if (event.data.type === 'CLOSE_WIDGET') {
            closeWidget();
        }
    }

    // Função para ajustar responsividade
    function handleResize() {
        if (widgetContainer) {
            if (window.innerWidth <= 480) {
                Object.assign(widgetContainer.style, {
                    bottom: '90px',
                    right: '10px',
                    left: '10px',
                    width: 'auto',
                    maxWidth: WIDGET_CONFIG.iframeWidth
                });
            } else {
                Object.assign(widgetContainer.style, {
                    bottom: '90px',
                    right: '20px',
                    left: 'auto',
                    width: WIDGET_CONFIG.iframeWidth
                });
            }
        }
    }

    // Função para fechar widget ao clicar fora
    function handleClickOutside(event) {
        if (isOpen &&
            !widgetContainer.contains(event.target) &&
            !widgetButton.contains(event.target)) {
            closeWidget();
        }
    }

    // Função de inicialização
    function init() {
        // Aguardar o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createWidgetButton);
        } else {
            createWidgetButton();
        }

        // Escutar eventos
        window.addEventListener('resize', handleResize);
        document.addEventListener('click', handleClickOutside);

        // Disponibilizar funções globalmente para debug
        window.widgetAPI = {
            open: openWidget,
            close: closeWidget,
            toggle: toggleWidget,
            setUserId: (userId) => {
                console.log('Definindo userId via API:', userId);
                window.loggedUserId = userId;
                if (isOpen) {
                    sendUserIdToIframe();
                }
            }
        };

        console.log('✅ Widget inicializado com sucesso!');
        console.log('💡 Use window.widgetAPI para controlar o widget programaticamente');
    }

    // Inicializar o widget
    init();

})();
