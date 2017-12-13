

const defaultTheme = {
  images: {
    headerURL: ""
  },
  colors: {
    accentcolor: "#252525",
    textcolor: "#ffffff",
    // tab_text: "#444444",
    toolbar: "#F9F9FA",
    toolbar_text: "#4A4A4B",
    toolbar_field: "#ffffff",
    toolbar_field_text: "#000000",
    toolbar_bottom_separator: "#E1E1E2",
    toolbar_vertical_separator: "#D4D4D4"
  }
}

async function onWindowCreate(window) {

  let {options} = await browser.storage.sync.get("options");

  if (!options || !options.colors || options.colors == []) {
    init();
  }

  const newColor = randomArrayElem(options.colors);

  let newTheme = Object.assign({}, defaultTheme);
  newTheme.colors.accentcolor = newColor;

  console.log(newTheme);
  
  browser.theme.update(window.id,newTheme);
}

browser.windows.onCreated.addListener(onWindowCreate);

async function init() {
  // set default theme to avoid ugly flashes
  browser.theme.update(defaultTheme);

  let {options} = await browser.storage.sync.get("options");

  // const defaultColors = ["#EC5958", "#8BCFB7", "#83D2E6", "#C1A9D2", "#EFA02E", "#D7EACF", "#EFE564", "#69BAE8", "#F06498", "#B357A1", "#C1A9D2", "#91B0DC"];
  const defaultColors = ["#8969AE", "#B357A1", "#83D2E6", "#EC5958", "#EFA02E", "#69BAE8", "#8BCFB7"];

  if (!options) {
    options = {colors: defaultColors};
  } else if (!options.colors || options.colors == []) {
    options.colors = defaultColors;
  }

  browser.storage.sync.set({options})
}

init();

// HELPER FUNCTIONS

function randomArrayElem(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}
