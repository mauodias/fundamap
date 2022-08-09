// ==UserScript==
// @name        Funda Map On Results
// @match       https://www.funda.nl/*
// @grant       none
// @run-at      document-idle
// @version     1.0
// @author      mauodias
// @description Adds a collapsable map to Funda results page. Currently requires Google Maps API key
// ==/UserScript==

const STYLE = "/* Style the button that is used to open and close the collapsible content */" +
"details {" +
"  background-color: #eee;" +
"  color: #444;" +
"  width: 100%;" +
"  border: none;" +
"  text-align: center;" +
"  outline: none;" +
"  font-size: 15px;" +
"}";

let MAPDIV = '<details>' +
'  <summary>View map</summary>' +
'  <div>' +
'    <iframe' +
'      style="border:0"' +
'      width="100%"' +
'      height="500"' +
'      loading="lazy"' +
'      allowfullscreen' +
'      src="https://www.google.com/maps/embed/v1/place?key={KEY}&q={ADDRESS}"&zoom=14>' +
'    </iframe>' +
'  </div>' +
'</details>';

const MAPS_API_KEY = "";

(function() {
  'use strict';
  GM_addStyle(STYLE);
  function generateMapDiv(value) {
    const street_number = value.querySelector("h2.search-result__header-title").textContent;
    const city_zip = value.querySelector("h4.search-result__header-subtitle").textContent;
    const address = street_number.trim().replaceAll(" ", "+") + "+" + city_zip.trim().replaceAll(" ", "+");
    const div = MAPDIV.replace("{KEY}", MAPS_API_KEY).replace("{ADDRESS}", address);
    let main = value.querySelector(".search-result-main");
    let node = document.createElement("div");
    node.innerHTML = div;
    main.insertAdjacentElement('afterend', node);
  }
  let list_results = document.querySelectorAll("li.search-result:not(.promo)");
  list_results.forEach(generateMapDiv);
})();
