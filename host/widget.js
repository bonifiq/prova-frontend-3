(function () {
  const IFRAME_URL = window.WIDGET_IFRAME_URL;
  const IFRAME_ORIGIN = new URL(IFRAME_URL).origin;
  const WIDTH = 320;
  const HEIGHT = 600;

  function createEl(tag, props = {}, styles = {}) {
    const el = document.createElement(tag);
    Object.assign(el, props);
    Object.assign(el.style, styles);
    return el;
  }

  const styleId = 'custom-widget-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @keyframes widget-pop { from { transform: scale(0.85); opacity: 0 } to { transform: scale(1); opacity: 1 } }
      @keyframes widget-pop-out { from { transform: scale(1); opacity: 1 } to { transform: scale(0.85); opacity: 0 } }
    `;
    document.head.appendChild(style);
  }

  const btn = createEl(
  'button',
  {
    id: 'cw-btn',
    innerHTML: `
      <svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.1746043,10.1203717 C15.3842672,9.94066062 15.6999172,9.96494139 15.8796283,10.1746043 C16.0593394,10.3842672 16.0350586,10.6999172 15.8253957,10.8796283 L12.3253957,13.8796283 C12.1381508,14.0401239 11.8618492,14.0401239 11.6746043,13.8796283 L8.17460431,10.8796283 C7.96494139,10.6999172 7.94066062,10.3842672 8.1203717,10.1746043 C8.30008277,9.96494139 8.61573277,9.94066062 8.82539569,10.1203717 L12,12.8414611 L15.1746043,10.1203717 Z"></path> </g></svg>
    `
  },
  {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: 'none',
    background: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(99,102,241,0.18)',
    cursor: 'pointer',
    zIndex: 2147483647,
    transition: 'transform 220ms ease, box-shadow 220ms ease'
  }
);

btn.setAttribute('aria-label', 'Abrir widget');

let widgetAberto = false;
btn.addEventListener('click', () => {
  widgetAberto = !widgetAberto;

  if (widgetAberto) {
    // Seta para baixo
    btn.innerHTML = `
<svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.1746043,10.1203717 C15.3842672,9.94066062 15.6999172,9.96494139 15.8796283,10.1746043 C16.0593394,10.3842672 16.0350586,10.6999172 15.8253957,10.8796283 L12.3253957,13.8796283 C12.1381508,14.0401239 11.8618492,14.0401239 11.6746043,13.8796283 L8.17460431,10.8796283 C7.96494139,10.6999172 7.94066062,10.3842672 8.1203717,10.1746043 C8.30008277,9.96494139 8.61573277,9.94066062 8.82539569,10.1203717 L12,12.8414611 L15.1746043,10.1203717 Z"></path> </g></svg>`  } else {
    // Seta para cima
    btn.innerHTML = `
<svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.1746043,10.1203717 C15.3842672,9.94066062 15.6999172,9.96494139 15.8796283,10.1746043 C16.0593394,10.3842672 16.0350586,10.6999172 15.8253957,10.8796283 L12.3253957,13.8796283 C12.1381508,14.0401239 11.8618492,14.0401239 11.6746043,13.8796283 L8.17460431,10.8796283 C7.96494139,10.6999172 7.94066062,10.3842672 8.1203717,10.1746043 C8.30008277,9.96494139 8.61573277,9.94066062 8.82539569,10.1203717 L12,12.8414611 L15.1746043,10.1203717 Z"></path> </g></svg>    `;
  }
});

  const container = createEl('div', { id: 'cw-container' }, {
    position: 'fixed',
    right: '20px',
    bottom: '90px',
    width: WIDTH + 'px',
    height: HEIGHT + 'px',
    maxWidth: 'calc(100% - 40px)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 12px 34px rgba(16,24,40,0.18)',
    background: '#fff',
    zIndex: 2147483646,
    transform: 'scale(0.85)',
    transformOrigin: 'bottom right',
    opacity: '0',
    display: 'none'
  });

  const iframe = createEl('iframe', { id: 'cw-iframe', src: IFRAME_ORIGIN, title: 'Widget'}, {
    width: '100%',
    height: '100%',
    border: '0',
    display: 'block'
  });

  container.appendChild(iframe);
  document.body.appendChild(container);
  document.body.appendChild(btn);

  let open = false;
  let initSent = false;

  function openWidget() {
    if (open) return;
    open = true;
    container.style.display = 'block';
    container.style.animation = 'widget-pop 220ms ease forwards';
   
  }

  function closeWidget() {
    if (!open) return;
    open = false;
    container.style.animation = 'widget-pop-out 180ms ease forwards';
    setTimeout(() => container.style.display = 'none', 200);
  }

  btn.addEventListener('click', () => {
    if (!open) openWidget(); else closeWidget();
  });

  window.addEventListener('message', function (ev) {
    if (ev.origin !== IFRAME_ORIGIN) return;

    let data = ev.data;
    try { if (typeof data === 'string') data = JSON.parse(data); } catch (err) { return; }
    if (!data || !data.type) return;

    if (data.type === 'IFRAME_READY') {
      const userId = (typeof window.loggedUserId === 'number') ? window.loggedUserId : null;
      const payload = { type: 'INIT', userId };
      iframe.contentWindow.postMessage(JSON.stringify(payload), '*');
      initSent = true;
    }

    if (data.type === 'CLOSE_WIDGET') {
      closeWidget();
    }
  });

  iframe.addEventListener('load', () => {
    if (!initSent) {
      setTimeout(() => {
        const userId = (typeof window.loggedUserId === 'number') ? window.loggedUserId : null;
        try {
          iframe.contentWindow.postMessage(JSON.stringify({ type: 'INIT', userId }), '*');
          initSent = true;
        } catch (e) {
        }
      }, 250);
    }
  });

  window.MyWidget = {
    open: openWidget,
    close: closeWidget,
    toggle: () => { if (open) closeWidget(); else openWidget(); },
    iframeOrigin: IFRAME_ORIGIN,
    iframeUrl: IFRAME_URL
  };

})();