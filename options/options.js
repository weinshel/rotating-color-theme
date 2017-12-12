function saveOptions(e) {
  e.preventDefault();

  let uselessOption = document.querySelector("#uselessOption").value;

  let options = {
      uselessOption: uselessOption
  }

  browser.storage.local.set({options});

}

async function restoreOptions() {

  const {options} = await browser.storage.local.get("options");
  document.querySelector("#uselessOption").value = options.uselessOption;

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
