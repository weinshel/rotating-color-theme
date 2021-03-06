function saveOptions(e) {
  e.preventDefault();

  let colors = document.querySelector("#colors").value;
  colors = colors.split(" ");

  let options = {
      colors: colors
  }

  browser.storage.sync.set({options});

}

async function restoreOptions() {

  const {options} = await browser.storage.sync.get("options");
  document.querySelector("#colors").value = options.colors.join(" ");

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
