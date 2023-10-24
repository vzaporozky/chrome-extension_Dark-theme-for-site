const setClassName = async (input, inputColor) => {
   let className = input.value;

   const chromeStorage = await chrome.storage.local.get([
      "listOfClass_forDarkTheme",
   ]);

   chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url.split("/")[2];

      if (chromeStorage.listOfClass_forDarkTheme) {
         const site = chromeStorage.listOfClass_forDarkTheme[url];

         if (site) {
            chrome.storage.local.set({
               listOfClass_forDarkTheme: {
                  ...chromeStorage.listOfClass_forDarkTheme,
                  [url]: {
                     ...chromeStorage.listOfClass_forDarkTheme[url],
                     [className]: inputColor.value,
                  },
               },
            });
         }
      } else {
         chrome.storage.local.set({
            listOfClass_forDarkTheme: {
               [url]: { [className]: inputColor.value },
            },
         });
      }
   });

   input.value = "";
};

const documentEvents = () => {
   const inputClass = document.querySelector(".enter_class");
   const inputColor = document.querySelector(".color_input");
   const saveButton = document.querySelector(".save_button");

   saveButton.addEventListener("click", () =>
      setClassName(inputClass, inputColor)
   );
};

document.addEventListener(
   "DOMContentLoaded",
   () => documentEvents(document),
   false
);
