import { theme } from "./theme/theme.js";

(function () {
    const button = document.createElement('button');
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '2';
    button.style.width = '60px';
    button.style.height = '60px';
    button.style.borderRadius = '100%';
    button.style.backgroundColor = theme.palette.primary.regular;
    button.style.border = `1px solid ${theme.palette.neutral.lightest}`;
    button.style.cursor = 'pointer';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.boxShadow = `0 4px 8px ${theme.palette.neutral.darkest}`;
    document.body.appendChild(button);

    const arrow = document.createElement('img');
    arrow.src = 'http://localhost:5173/arrow-up.svg';
    arrow.style.width = '24px';
    arrow.style.height = '24px';
    arrow.style.transition = 'transform 0.3s ease';
    button.appendChild(arrow);

    const container = document.createElement('div');
    container.id = 'widget-container';
    container.style.backgroundColor = theme.palette.primary.regular;
    container.style.position = 'fixed';
    container.style.bottom = '100px';
    container.style.right = '20px';
    container.style.maxWidth = '400px';
    container.style.height = '600px';
    container.style.display = 'none';
    container.style.zIndex = '2';
    container.style.boxShadow = `0 0 10px ${theme.palette.neutral.darkest}`;
    document.body.appendChild(container);

    const iframe = document.createElement('iframe');
    iframe.id = 'widget-content-iframe'
    iframe.src = 'http://localhost:5173/';
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.setAttribute('scrolling', 'no');

    iframe.onload = () => {
        console.log(window.loggedUserId);
        if (window.loggedUserId) {
            setTimeout(() => {
                iframe.contentWindow.postMessage(
                    { type: 'USER_ID', id: window.loggedUserId },
                    '*'
                );
            }, 5000);
        }
    };

    container.appendChild(iframe);

    let isOpen = false;

    function toggleWidget(forceState) {
        isOpen = typeof forceState === 'boolean' ? forceState : !isOpen;

        container.style.display = isOpen ? 'block' : 'none';
        arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }

    button.addEventListener('click', () => toggleWidget());

    window.addEventListener('message', (event) => {
        if (event.data?.type === 'WIDGET_CLOSE') {
            toggleWidget(false);
        }
    });
})();