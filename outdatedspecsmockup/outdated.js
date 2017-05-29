var outdatedSpecs = {
  "/tr-pages/outdatedspecsmockup/html4/" : "https://www.w3.org/TR/html51/",
  "/tr-pages/outdatedspecsmockup/html-aria/" : "https://www.w3.org/TR/html-aria/"
}

function collapseWarning(details) {
  var node = document.querySelector(".outdatedwarning");
  var button = document.querySelector(".outdatedwarning input");
  var opacity;
  if (details) {
    node.style.cssText = "position: fixed; bottom: 50%;left: 0;right: 0;margin: 0 auto 0 auto;width: 50%;background: maroon;color: white;border-radius: 1em;box-shadow: 0 0 1em red;padding: 2em;text-align: center;z-index:2;";
    button.value = '\u25BE collapse';
    button.onclick = function() {collapseWarning(false)};
    opacity = "0.5";
  } else {
    node.style.cssText = "z-index:2;bottom: 0;left: 0;right: 0;border-radius: 0;position: fixed;margin: 0 auto;background: maroon;color: white;text-align:center;";
    button.value = '\u25B4 expand';
    button.onclick = function() {collapseWarning(true)};
    opacity = "0";
  }
  var nodes = document.querySelectorAll("body, h1, h2, h3");
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].setAttribute("style", "background-color: rgba(0,0,0," + opacity + ");");
  }
}

const pathname = window.location.pathname;
var spec = Object.keys(outdatedSpecs).filter(function(k) {return pathname.indexOf(k) === 0;}).shift();
if (spec) {
  var css = 'a#deprecationnote:hover{ background-color: transparent }';
  var style = document.createElement('style');
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.getElementsByTagName('head')[0].appendChild(style);
  var nodes = document.querySelectorAll("body, h1, h2, h3");
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].setAttribute("style", "background-color: rgba(0,0,0,0.5);");
  }
  var node = document.createElement("p");
  node.className = "outdatedwarning";
  node.style.cssText = "position: fixed; bottom: 50%;left: 0;right: 0;margin: 0 auto 0 auto;width: 50%;background: maroon;color:white;border-radius: 1em;box-shadow: 0 0 1em red;padding: 2em;text-align: center;z-index:2;";

  node.innerHTML = '<strong>This version is outdated!</strong><div>For the latest version, please look at the <a id="deprecationnote" style="color:white" href="' + outdatedSpecs[spec]+ '"> ' + outdatedSpecs[spec] + '</a>.</div><input onclick="collapseWarning(false)" style="margin: 0;border: 0;padding: 0.25em 0.5em;background: transparent;color: black;position: absolute;top: 0em;right: 0;font: 1.25em sans-serif;text-align: center;" type="button" value="&#9662; collapse">';

  document.querySelector("body").appendChild(node);
}
