(function () {
  const userId = window.loggedUserId;

  const button = document.createElement("button");
  const icon = document.createElement("div");

  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 256 256"><path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path></svg>`;
  icon.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  icon.style.display = "flex";
  icon.style.justifyContent = "center";
  icon.style.alignItems = "center";
  icon.style.fontSize = "24px";

  button.appendChild(icon);

  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.zIndex = "9999";
  button.style.width = "50px";
  button.style.height = "50px";
  button.style.borderRadius = "50%";
  button.style.border = "none";
  button.style.backgroundColor = "#6631c6";
  button.style.color = "white";

  button.style.cursor = "pointer";
  button.style.display = "flex";
  button.style.justifyContent = "center";
  button.style.alignItems = "center";
  button.style.transition = "all .3s ease";
  document.body.appendChild(button);

  let iframe = null;

  button.onclick = () => {
    icon.style.opacity = "0";
    icon.style.transform = "scale(0.5)";

    setTimeout(() => {
      if (iframe) {
        iframe.remove();
        iframe = null;
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 256 256"><path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path></svg>`;
      } else {
        iframe = document.createElement("iframe");
        iframe.src = "http://localhost:5173/";
        iframe.style.position = "fixed";
        iframe.style.bottom = "90px";
        iframe.style.right = "20px";
        iframe.style.width = "320px";
        iframe.style.height = "580px";
        iframe.style.zIndex = "9999";
        iframe.style.border = "none";
        iframe.style.borderRadius = "12px";
        iframe.style.background = "transparent";
        if (window.matchMedia("(max-width: 450px)").matches) {
          iframe.style.width = "310px";
          iframe.style.height = "500px";
        }

        document.body.appendChild(iframe);

        iframe.onload = () => {
          setTimeout(() => {
            iframe.contentWindow.postMessage({ userId }, "*");
          }, 500);
        };

        window.addEventListener("message", (event) => {
          if (event.data === "close-widget") {
            iframe?.remove();
            iframe = null;
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 256 256"><path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path></svg>`;
            icon.style.opacity = "1";
            icon.style.transform = "scale(1)";
            icon.style.fontSize = "24px";
          }
        });

        icon.innerHTML = "&#10005;";
      }

      icon.style.opacity = "1";
      icon.style.transform = "scale(1)";
    }, 200);
  };
})();
