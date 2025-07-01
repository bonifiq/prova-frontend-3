(function () {
    console.log('widget instalado');

    const host = window.location.hostname;
    const app_url = `http://${host}:5173`

    const button = document.createElement('button');
    button.style.width = '40px'
    button.style.height = '40px'
    button.style.border = '1px solid ';
    button.style.borderRadius = '50%';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px 20px';
    button.style.display = 'flex'
    button.style.alignItems = 'center'
    button.style.justifyContent = 'center'
    button.style.color = '#fff';
    button.style.fontSize = '1.5rem'
    button.style.fontWeight = 'bold'
    button.textContent = '\u2191'
    button.style.transition = 'transform 0.3s ease';
    button.style.zIndex = '999';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = '#007bff';

    const iframe = document.createElement('iframe');
    iframe.src = app_url;
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    iframe.style.width = '90vw';
    iframe.style.maxWidth = '320px';
    iframe.style.height = '80vh';
    iframe.style.maxHeight = '600px';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '70px';
    iframe.style.right = '20px';
    iframe.style.zIndex = '999';
    iframe.style.display = 'none';
    iframe.style.borderRadius = '8px';
    iframe.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    iframe.style.transition = 'transform 0.3s ease-in-out';
    iframe.style.backgroundColor = '#dadada'

    let isOpen = false;

    button.onclick = function () {
        isOpen = !isOpen;
        iframe.style.display = isOpen ? 'block' : 'none';
        button.textContent = isOpen ? '\u2191' : '\u2193';
        button.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }

    document.body.appendChild(button);
    document.body.appendChild(iframe);

    window.addEventListener('message', function (event) {
        if (event.data === "getLoggedUserId") {
            iframe.contentWindow.postMessage({
                loggedUserId: window.loggedUserId
            }, "*")
        }

        if (event.data.action === "closeWidget") {
            isOpen = false;
            iframe.style.display = 'none';
            button.textContent = '\u2191';
            button.style.transform = 'rotate(0deg)';
        }
    });
})();