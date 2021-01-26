const data = require("./tr-with-families.json");

const families = data.reduce((acc, spec) => {
  if (!acc[spec["Family (strict)"]]) {
    acc[spec["Family (strict)"]] = [];
  }
  acc[spec["Family (strict)"]].push(spec);
  return acc;
}, {});

function annotateTitle(s) {
  return s.replace(/(Level ([0-9]*\.?)+)/, '<span class=level>$1</span>')
    .replace(/( ([0-9]\.?)+)/,'<span class=level>$1</span>');
}

function statusClass(status) {
  return status.replace("CRD", "CR").toLowerCase();
}

function w(s) { console.log(s); }

function writeSpec(s) {
  w(`<li><span class="status ${statusClass(s.Status)}">${s.Status}</span> <a href=''>${annotateTitle(s.Spec)}</a></li>`);
}

const isCompleted = s => s.Status === "REC" || s.Status === "Note";
const isInProgress = s => s.Status !== "REC" && s.Status !== "Note" && s.Status !== "ret";
const isSpec = s => !s["Doc type"] || s["Doc type"] === "registry";
const not = f => x => !f(x);
const byDate = (a,b) => -a.Date.localeCompare(b.Date);

function writeSpecsByDate(specs) {
  let i = 0;
  let dateCursor = "";
  while(i < specs.length) {
    if (specs[i].Date !== dateCursor) {
      if (i > 0)
        w('</ol></div>');
      dateCursor = specs[i].Date;
      w(`<div class=date><h4 class="pubdate ${specs[i].isNew ? "new" : ""}">${dateCursor}</h4><ol>`);
    }
    writeSpec(specs[i]);
    i++;
  }
  w('</ol></div>');
}

Object.keys(families).filter(name => families[name].some(s => isCompleted(s) || isInProgress(s)))
  .sort((a, b) => -families[a].sort(byDate)[0].Date.localeCompare(families[b].sort(byDate)[0].Date))
  .forEach(name => {
    const family = families[name];
    const latestDate = family.sort(byDate)[0].Date;
    family.filter(s => s.Date === latestDate).forEach(s => s.isNew = true);
    w(`      <div class="family">
        <h2>${name}</h2>`);
    if (family.some(isSpec)) {
      if (family.filter(isSpec).some(isCompleted)) {
        w('<section class="completed"><h3>Completed</h3>');
        writeSpecsByDate(family.filter(isSpec).filter(isCompleted).sort(byDate));
        w('</section>');
      }
      if (family.filter(isSpec).some(isInProgress)) {
        w('<section class="inprogress"><h3>In Progress</h3>');
        writeSpecsByDate(family.filter(isSpec).filter(isInProgress).sort(byDate));
        w('</section>');
      }
      if (family.some(not(isSpec))) {
        w('<details><summary>Associated documents</summary><ol>');
        family.filter(not(isSpec)).sort(byDate).forEach(writeSpec);
        w('</ol></details>');
      }
    } else {
      if (family.some(isCompleted)) {
        w('<section class="completed"><h3>Completed</h3>');
        writeSpecsByDate(family.filter(isCompleted).sort(byDate));
        w('</section>');
      }
      if (family.some(isInProgress)) {
        w('<section class="inprogress"><h3>In Progress</h3>');
        writeSpecsByDate(family.filter(isInProgress).sort(byDate));
        w('</section>');
      }
    }
    w("</div>");
});
