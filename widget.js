(function () {
  console.log("[Widget] - Widget instalado");

  //Properties
  const COLORS = {
    primary: "#9C0000",
    primaryDark: "#5E0000",
    secondary: "#D9D9D9",
  };

  const RESPONSIVE_RULES = [
    {
      querry: "(max-width: 400px)",
      width: "100%",
      height: "70%",
      right: "0px",
    },
    {
      querry: "(min-width: 701px) and (max-width: 1000px)",
      width: "320px",
      height: "600px",
    },
  ];

  let IFRAME_CONFIG = {
    url: "http://localhost:5173",
    iFrameIsOpened: false,
  };

  //Extra functions
  function ajustResposiveScreen() {
    console.log(
      "[ajustResposiveScreen] - Executando ajuste de responsividade no iFrame"
    );
    let iFrameWidth = "320px";
    let iFrameHeight = "600px";
    let iFrameRight = "30px";

    for (let rule of RESPONSIVE_RULES) {
      if (window.matchMedia(rule.querry).matches) {
        iFrameWidth = rule.width;
        iFrameHeight = rule.height;
        if (rule.right) {
          iFrameRight = rule.right;
        }
      }
    }

    iFrame.style.width = iFrameWidth;
    iFrame.style.height = iFrameHeight;
    iFrame.style.right = iFrameRight;
  }

  function clickOnWidget() {
    console.log("[clickOnWidget] - Widget pressionado");
    if (!IFRAME_CONFIG.iFrameIsOpened) {
      IFRAME_CONFIG.iFrameIsOpened = true;
      iFrame.style.opacity = "1";
      iFrame.style.transform = "translateY(-5px)";
      widget.querySelector("svg").style.transform = "rotate(0deg)";
    } else {
      IFRAME_CONFIG.iFrameIsOpened = false;
      iFrame.style.opacity = "0";
      iFrame.style.transform = "translateY(5px)";
      widget.querySelector("svg").style.transform = "rotate(-180deg)";
    }
  }

  //Widget Button
  const widget = document.createElement("button");
  widget.id = "widgetButton";
  widget.style.display = "flex";
  widget.style.alignItems = "center";
  widget.style.justifyContent = "center";
  widget.style.outline = "none";
  widget.style.all = "none";
  widget.style.position = "fixed";
  widget.style.bottom = "30px";
  widget.style.right = "30px";
  widget.style.backgroundColor = COLORS.primary;
  widget.style.color = COLORS.secondary;
  widget.style.borderRadius = "100px";
  widget.style.width = "64px";
  widget.style.height = "64px";
  widget.style.zIndex = "9999";
  widget.style.border = "none";
  widget.innerHTML = `
  <svg width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill="${COLORS.secondary}"/>
  </svg>
  `;
  widget.querySelector("svg").style.transition = "all 0.5s ease";
  widget.querySelector("svg").style.transform = "rotate(-180deg)";

  //iFrame
  const iFrame = document.createElement("iframe");
  iFrame.id = "iFrame";
  iFrame.src = IFRAME_CONFIG.url;
  iFrame.style.border = "none";
  iFrame.style.borderRadius = "15px";
  iFrame.style.display = "block";
  iFrame.style.opacity = "0";
  iFrame.style.transform = "translateY(5px)";
  iFrame.style.transition = "all 0.5s ease";
  iFrame.style.position = "fixed";
  iFrame.style.bottom = "100px";
  iFrame.style.right = "30px";
  iFrame.style.width = "320px";
  iFrame.style.height = "600px";
  iFrame.style.zIndex = "10000";

  widget.addEventListener("click", clickOnWidget);

  document.body.appendChild(widget);
  document.body.appendChild(iFrame);
  ajustResposiveScreen();
  window.addEventListener("resize", ajustResposiveScreen);
})();
