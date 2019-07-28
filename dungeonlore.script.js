/* Dungeon Lore Script contains all rule logic for the character sheet */

function confirmAction(element) {
  var result = confirm("Have you really leveled up?")
  if (result) {
    addAttributePoints(element);
  } else {
    element.value = element.defaultValue;
  }
}

function addAttributePoints(element) {
  var remainingPts = document.getElementById("remaining_pts").innerHTML;
  var level = document.getElementById("remaining_pts").innerHTML;
  var difference = (element.value - element.defaultValue);

  if (element.defaultValue < element.value) {
    var attributePts = parseInt(remainingPts) + (difference * 4);
    if (level >= 20) {
      attributePts = parseInt(remainingPts) + (difference * 3);
    } else if (level >= 50) {
      attributePts = parseInt(remainingPts) + (difference * 2);
    }
    element.defaultValue = element.value;
    document.getElementById("remaining_pts").innerHTML = attributePts;
  } else if (element.defaultValue >= element.value) {
    element.value = element.defaultValue;
  }
}

function checkAttributeLimit(element) {
  var difference = element.value - element.defaultValue;
  var remainingPts = document.getElementById("remaining_pts").innerHTML;

  if (element.value < 5 | difference > remainingPts ) {
    element.value = element.defaultValue;
  } else if (difference <= remainingPts) {
    remainingPts = (parseInt(remainingPts) - difference);
    document.getElementById("remaining_pts").innerHTML = remainingPts;
    element.defaultValue = element.value;
  }

  updateTraits(element);
}

function updateTraits(element) {
  if (element.id == "wis-mod" || element.id == "wis") {
    updateKnowledgeAndSkills(element);
  } else if (element.id == "vit-mod" || element.id == "vit") {
    updateHealth(element);
  } else if (element.id == "str-mod" || element.id == "str") {
    updateBodyWeightAndCapcity(element);
  } else if (element.id == "agi-mod" || element.id == "agi") {
    updateSpeed(element);
  } else if (element.id == "spi-mod" || element.id == "spi") {
    updateSurvivalPoints(element);
    updateStressPoints(element);
  }
}

/* Character Abilities */

function addAbilityEntry(element, tableId, entryName) {
  var classHistory = document.getElementById(tableId);

  var rowCount = document.getElementById(tableId).getElementsByTagName("tr").length;
  var row = classHistory.insertRow(rowCount);

  var cellOne = row.insertCell(0);
  cellOne.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellTwo = row.insertCell(1);
  cellTwo.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_effect\" type=\"text\" oninput=\"saveValue(this)\" />"
}

/* Character Techniques & Feats */

function addTechniqueEntry(element, tableId, entryName) {
  var classHistory = document.getElementById(tableId);

  var rowCount = document.getElementById(tableId).getElementsByTagName("tr").length;
  var row = classHistory.insertRow(rowCount);

  var cellOne = row.insertCell(0);
  cellOne.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellTwo = row.insertCell(1);
  cellTwo.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_desc\" type=\"text\" oninput=\"saveValue(this)\" />"
}

/* Afflictions Functions  */

function addAfflictionEntry(element, tableId, entryName) {
  var classHistory = document.getElementById(tableId);

  var rowCount = document.getElementById(tableId).getElementsByTagName("tr").length;
  var row = classHistory.insertRow(rowCount);

  var cellOne = row.insertCell(0);
  cellOne.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_name\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellTwo = row.insertCell(1);
  cellTwo.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_duration\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellThree = row.insertCell(2);
  cellThree.innerHTML = "<textarea id=\"" + entryName + "_" + rowCount + "_effects\" type=\"number\" oninput=\"saveValue(this)\" ></textarea>"
}

/* Spell Functions  */

function addSpellEntry(element, tableId, entryName) {
  var classHistory = document.getElementById(tableId);

  var rowCount = document.getElementById(tableId).getElementsByTagName("tr").length;
  var row = classHistory.insertRow(rowCount);

  var cellOne = row.insertCell(0);
  cellOne.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_name\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellTwo = row.insertCell(1);
  cellTwo.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_attack\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellThree = row.insertCell(2);
  cellThree.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_mod\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellFour = row.insertCell(3);
  cellFour.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_usage\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellFive = row.insertCell(4);
  cellFive.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_requirements\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellSix = row.insertCell(5);
  cellSix.innerHTML = "<textarea id=\"" + entryName + "_" + rowCount + "_effects\" type=\"number\" oninput=\"saveValue(this)\" ></textarea>"
}

/* Trait Update Functions  */

function updateHealth(element) {
  var vitality = parseInt(document.getElementById("vit").value);
  var vitMod = parseInt(document.getElementById("vit-mod").value);
  document.getElementById("health").innerHTML = " / " + (vitality + vitMod);
  document.getElementById("damage").value = vitality + vitMod;
  document.getElementById("damage").max = vitality + vitMod;
  document.getElementById("damage").min = 0;
}

function updateSurvivalPoints(element) {
  var spirit = Math.floor(parseInt(document.getElementById("spi").value) / 5);
  var spiMod = parseInt(document.getElementById("spi-mod").value / 5);
  document.getElementById("survival-pts").innerHTML = " / " + (spirit + spiMod);
  document.getElementById("survival-pts-used").value = spirit + spiMod;
  document.getElementById("survival-pts-used").max = spirit + spiMod;
  document.getElementById("survival-pts-used").min = 0;
}

function updateStressPoints(element) {
  var stressPts = parseInt(document.getElementById("spi").value) * 2;
  var spiMod = parseInt(document.getElementById("spi-mod").value) * 2;
  document.getElementById("stress-pts").innerHTML = " / " + (stressPts + spiMod);
  document.getElementById("stress-pts-used").value = 0;
  document.getElementById("stress-pts-used").min = 0;
}

function updateBodyWeightAndCapcity(element) {
  var str = parseInt(document.getElementById("str").value);
  var strMod = parseInt(document.getElementById("str-mod").value);
  var totalStr = str + strMod;

  document.getElementById("body-weight").innerHTML = (totalStr * 10) + 30;
  document.getElementById("capacity").innerHTML = "/ " + (totalStr * 20) + " lb " + calculateAGIModifier();
  document.getElementById("capacity-value").innerHTML = (totalStr * 20);
}

function updateSpeed(element) {
  var agi = document.getElementById("agi").value;
  document.getElementById("speed").innerHTML = Math.floor(parseInt(agi)/3);
  var intAGI = parseInt(agi);
  if (intAGI >= 6) {
    document.getElementById("action-pts").innerHTML = Math.floor(intAGI/6);
  } else {
    // default of 1 for 6 or lower
    document.getElementById("action-pts").innerHTML = 1;
  }
}

function updateKnowledgeUsed(element) {
  var knowledge = document.getElementById("knl").value;
  if (element.value > knowledge) {
    element.value = element.defaultValue;
  } else if (parseInt(element.value) < 0) {
    element.value = 0;
  }
  document.getElementById("knl-used").max = knowledge;
  document.getElementById("knl-used").min = 0;
}

function updateDamage(element) {
  var health = document.getElementById("health").value;
  if (parseInt(element.value) > health) {
    element.value = element.defaultValue;
  } else if (parseInt(element.value) < 0) {
    element.value = 0;
  }
  document.getElementById("damage").max = health;
  document.getElementById("damage").min = 0;
}

function updateSurvivalPointsUsed(element) {
  var spirit = Math.floor(parseInt(document.getElementById("spi").value) / 5);
  if (parseInt(element.value) > spirit) {
    element.value = element.defaultValue;
  } else if (parseInt(element.value) < 0) {
    element.value = 0;
  }
  document.getElementById("survival-pts-used").max = spirit;
  document.getElementById("survival-pts-used").min = 0;
}

function updateStressPointsUsed(element) {
  if (parseInt(element.value) < 0) {
    element.value = 0;
  }
  document.getElementById("stress-pts-used").min = 0;
}

function updateKnowledgeAndSkills(element) {
  var wisdom = document.getElementById("wis").value;
  var wisdomMod = parseInt(document.getElementById("wis-mod").value);
  var knowledge = (parseInt(wisdom) + wisdomMod) / 5;
  document.getElementById("knl").innerHTML = " / " + Math.floor(knowledge);
  document.getElementById("knl-used").max = knowledge;
  document.getElementById("knl-used").min = 0;

  var skillPtsRemaining = parseInt(document.getElementById("skill_pts").innerHTML);
  var skillPtsAssigned = parseInt(document.getElementById("skill_pts_assigned").innerHTML);
  var totalPts = skillPtsRemaining + skillPtsAssigned;

  var skillPtsMax = wisdom;
  var newSkillPts = 0;

  if (totalPts > skillPtsMax) {
    // Remove skill points path
    document.getElementById("skill_pts").innerHTML = "0";
    document.getElementById("skill_pts_assigned").innerHTML = skillPtsMax;
    var pointsToRemove = totalPts - skillPtsMax;
    if (skillPtsRemaining >= pointsToRemove) {
      document.getElementById("skill_pts").innerHTML = skillPtsRemaining - pointsToRemove;
    } else if (skillPtsRemaining < pointsToRemove) {
      var remainingPtsToRemove = pointsToRemove - skillPtsRemaining;
      document.getElementById("skill_pts").innerHTML = 0;
      var characterSkills = document.getElementById("character-skills");
      var index = 0;
      var skillInputs = characterSkills.getElementsByTagName("input");
      var limit = skillInputs.length;
      while (remainingPtsToRemove > 0 & index < limit) {
        var inputValue = skillInputs[index].value;
        if (inputValue !== 0){
          if (inputValue <= remainingPtsToRemove) {
            skillInputs[index].value = 0;
            skillInputs[index].defaultValue = 0;
            remainingPtsToRemove = remainingPtsToRemove - inputValue;
          } else if (inputValue > remainingPtsToRemove) {
            skillInputs[index].value = inputValue - remainingPtsToRemove;
            remainingPtsToRemove = 0;
          }
        }
        index++;
      }
    }
    skillPtsRemaining = parseInt(document.getElementById("skill_pts").innerHTML);
    updateAllSkillProperties(skillPtsRemaining);
  } else if (totalPts <= skillPtsMax) {
    // Add skill points path
    var difference = skillPtsMax - totalPts;
    newSkillPts = skillPtsRemaining + difference;

    document.getElementById("skill_pts").innerHTML = newSkillPts;
    updateAllSkillProperties(newSkillPts);
  }
}

/* Skill Update Functions  */

function updateSkillPoints(skill) {
  var remainingPts = parseInt(document.getElementById("skill_pts").innerHTML);
  var skillPtsAssigned = parseInt(document.getElementById("skill_pts_assigned").innerHTML);
  var totalPts = remainingPts + skillPtsAssigned;
  var skillValue = parseInt(skill.value);
  var skillDefaultValue = parseInt(skill.defaultValue);

  if (skillValue < 0) {
    skill.value = 0;
  } else if (skillValue <= skillDefaultValue) {
    var diff = skill.defaultValue - skill.value;
    document.getElementById("skill_pts").innerHTML = remainingPts + diff;
    document.getElementById("skill_pts_assigned").innerHTML = skillPtsAssigned - diff;
    remainingPts = parseInt(document.getElementById("skill_pts").innerHTML);
  } else if (skillValue >= skillDefaultValue && remainingPts > 0) {
    var difference = parseInt(skill.value) - parseInt(skill.defaultValue);
    document.getElementById("skill_pts").innerHTML = remainingPts - difference;
    document.getElementById("skill_pts_assigned").innerHTML = skillPtsAssigned + difference;
  } else if (skillValue > remainingPts || remainingPts === 0) {
    // Skip as player does not have enough points...
    skill.value = skill.defaultValue;
  }
  skill.defaultValue = skill.value;

  remainingPts = parseInt(document.getElementById("skill_pts").innerHTML);
  updateAllSkillProperties(remainingPts);
}


function updateAllSkillProperties(remainingPts) {
  updateSkillProperties("acrobatics", remainingPts);
  updateSkillProperties("alchemy", remainingPts);
  updateSkillProperties("arcane-sorcery", remainingPts);
  updateSkillProperties("archery", remainingPts);
  updateSkillProperties("art", remainingPts);
  updateSkillProperties("atheltics", remainingPts);
  updateSkillProperties("blade", remainingPts);
  updateSkillProperties("block", remainingPts);
  updateSkillProperties("blunt", remainingPts);
  updateSkillProperties("brawl", remainingPts);
  updateSkillProperties("carpentry", remainingPts);
  updateSkillProperties("catalyst", remainingPts);
  updateSkillProperties("culinary-arts", remainingPts);
  updateSkillProperties("communing-arts", remainingPts);
  updateSkillProperties("cryokinesis", remainingPts);
  updateSkillProperties("deception", remainingPts);
  updateSkillProperties("discipline", remainingPts);
  updateSkillProperties("dodge", remainingPts);
  updateSkillProperties("duel-wield", remainingPts);
  updateSkillProperties("enchantment", remainingPts);
  updateSkillProperties("grapple", remainingPts);
  updateSkillProperties("mechanics", remainingPts);
  updateSkillProperties("handle-animal", remainingPts);
  updateSkillProperties("herbalism", remainingPts);
  updateSkillProperties("lore", remainingPts);
  updateSkillProperties("literacy", remainingPts);
  updateSkillProperties("magnemancy", remainingPts);
  updateSkillProperties("masonry", remainingPts);
  updateSkillProperties("medicine", remainingPts);
  updateSkillProperties("necromancy", remainingPts);
  updateSkillProperties("persuasion", remainingPts);
  updateSkillProperties("psionics", remainingPts);
  updateSkillProperties("pyromancy", remainingPts);
  updateSkillProperties("resilience", remainingPts);
  updateSkillProperties("ride", remainingPts);
  updateSkillProperties("sewing", remainingPts);
  updateSkillProperties("shamanism", remainingPts);
  updateSkillProperties("slight-of-hand", remainingPts);
  updateSkillProperties("smithing", remainingPts);
  updateSkillProperties("staff", remainingPts);
  updateSkillProperties("spellcraft", remainingPts);
  updateSkillProperties("sneak", remainingPts);
  updateSkillProperties("throw", remainingPts);
  updateSkillProperties("vigilance", remainingPts);
  updateSkillProperties("void-sorcery", remainingPts);
  updateSkillProperties("whip", remainingPts);
}

function updateSkillProperties(elementName, remainingPts) {
  var value = parseInt(document.getElementById(elementName).value);
  // Set the max value to the already assigned points plus remaining)
  document.getElementById(elementName).max = (value + remainingPts);
  document.getElementById(elementName).min = 0;

  return value;
}

/* Inventory Functions  */

function addInventoryItem(element) {
  var inventory = document.getElementById("inventory");

  var rowCount = document.getElementById("inventory").getElementsByTagName("tr").length;
  var row = inventory.insertRow(rowCount);

  var cellOne = row.insertCell(0);
  cellOne.innerHTML = "<input id=\"item_" + rowCount + "_name\" type=\"text\" oninput=\"saveValue(this)\" />";
  var cellTwo = row.insertCell(1);
  cellTwo.innerHTML = "<input id=\"item_" + rowCount + "_desc\" type=\"text\" oninput=\"saveValue(this)\" />";
  var cellThree = row.insertCell(2);
  cellThree.innerHTML = "<input id=\"item_" + rowCount + "_weight\" type=\"number\" oninput=\"updateTotalWeightUsed(this)\" />";
}

function updateTotalWeightUsed(element) {
  var changeValue = element.value;
  if (changeValue < 0) {
    element.value = 0;
  }

  var totalCapcityUsed = document.getElementById("used-capacity").innerHTML;
  var diff = element.defaultValue - element.value;
  document.getElementById("used-capacity").innerHTML = (totalCapcityUsed - diff).toFixed(2);
  element.defaultValue = element.value;

  document.getElementById("capacity").innerHTML = " / " + document.getElementById("capacity-value").innerHTML + " lb " + calculateAGIModifier();
}

function calculateAGIModifier() {
  var capcityValue = parseInt(document.getElementById("capacity-value").innerHTML);
  var usedCapacity = parseInt(document.getElementById("used-capacity").innerHTML);
  var overCapcity = capcityValue - usedCapacity;
  var ratio = (usedCapacity / capcityValue) * 100;
  var agi = parseInt(document.getElementById("agi").value);
  var agiModifier = " ";
  if (overCapcity < 0) {
    // Over capacity calculator
    var agiModValue = agi;
    agiModifier = " (" + agiModValue + " AGI)";
  } else if (ratio >= 75) {
    // Over 50% body weight, AGI decrease of 25%
    var agiModValue = Math.ceil(agi / 4);
    agiModifier = " (-" + agiModValue + " AGI)";
  } else if (ratio >= 50) {
    // Over 50% body weight, AGI decrease of 10%
    var agiModValue = Math.ceil(agi / 10);
    agiModifier = " (-" + agiModValue + " AGI)";
  } else if (ratio >= 25) {
    // Over 50% body weight, AGI decrease of 5%
    var agiModValue = Math.floor(agi / 20);
    agiModifier = " (-" + agiModValue + " AGI)";
  }
  return agiModifier;
}

/* Table Functions  */

function addEntry(element, tableId, entryName) {
  var classHistory = document.getElementById(tableId);

  var rowCount = document.getElementById(tableId).getElementsByTagName("tr").length;
  var row = classHistory.insertRow(rowCount);

  var cellOne = row.insertCell(0);
  cellOne.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_name\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellTwo = row.insertCell(1);
  cellTwo.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_years\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellThree = row.insertCell(2);
  cellThree.innerHTML = "<textarea id=\"" + entryName + "_" + rowCount + "_notes\" type=\"number\" oninput=\"saveValue(this)\" ></textarea>"
}

function removeEntry(element, tableId) {
  var classHistory = document.getElementById(tableId);

  var rowCount = document.getElementById(tableId).getElementsByTagName("tr").length;
  if (rowCount > 1) {
    classHistory.deleteRow(rowCount - 1 );
    removeWeightFromTotalWeight(tableId, rowCount);
  }
}

function removeWeightFromTotalWeight(tableId, rowCount) {
  var table = document.getElementById(tableId);
  if (table == undefined || table == null
      || table.rows[rowCount - 1] == undefined
      || table.rows[rowCount - 1] == null
      || table.rows[rowCount - 1].cells[2] == undefined
      || table.rows[rowCount - 1].cells[2] == null
      || table.rows[rowCount - 1].cells[2].children[0] == undefined
      || table.rows[rowCount - 1].cells[2].children[0] == null) {
    return;
  }
  var element = table.rows[rowCount - 1].cells[2].children[0];

  var totalCapcityUsed = parseInt(document.getElementById("used-capacity").innerHTML);
  document.getElementById("used-capacity").innerHTML = (totalCapcityUsed - parseInt(element.value)).toFixed(2);

  var overCapcity = parseInt(document.getElementById("capacity-value").innerHTML) - parseInt(document.getElementById("used-capacity").innerHTML);
  var agiModifier = " ";
  if (overCapcity < 0) {
    var agiModValue = Math.floor(overCapcity/2);
    agiModifier = " (" + agiModValue + " AGI)";
  }
  document.getElementById("capacity").innerHTML = " / " + document.getElementById("capacity-value").innerHTML + " lb " + agiModifier;
}

/* Mounts Functions  */

function addMountOrChampionEntry(element, tableId, entryName) {
  var classHistory = document.getElementById(tableId);

  var rowCount = document.getElementById(tableId).getElementsByTagName("tr").length;
  var row = classHistory.insertRow(rowCount);

  var cellOne = row.insertCell(0);
  cellOne.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_name\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellTwo = row.insertCell(1);
  cellTwo.innerHTML = "<input id=\"" + entryName + "_" + rowCount + "_requirements\" type=\"text\" oninput=\"saveValue(this)\" />"
  var cellThree = row.insertCell(2);
  cellThree.innerHTML = "<textarea id=\"" + entryName + "_" + rowCount + "_desc\" type=\"number\" oninput=\"saveValue(this)\" ></textarea>"
}

/* Load and Save Character Sheet Functions */

function loadCharacterSheet(element) {
  var file = element.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    document.getElementById('content').innerHTML = contents;
  };
  reader.readAsText(file);
}


function saveCharacterSheet(element) {
  var characterName = document.getElementById("name").value;
  characterName = characterName.replace(new RegExp(" ", 'g'), "_");
  var characterClass = document.getElementById("title").value;
  characterClass = characterClass.replace(new RegExp(" ", 'g'), "_");

  var characterSheet = document.getElementById("content").innerHTML;
  downloadSheet( characterName + "_" + characterClass + ".html", characterSheet);
}

function downloadSheet(filename, text) {
  var dom = document.createElement('a');
  dom.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(text));
  dom.setAttribute("download", filename);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    dom.dispatchEvent(event);
  } else {
    dom.click();
  }
}

function saveValue(element) {
  element.defaultValue = element.value;
}

/* Collapse and Expand Functions */

function collapseExpand(btnName, elementName) {
  var element = document.getElementById(elementName);
  var style = window.getComputedStyle(element);
  var display = style.getPropertyValue('display');

  var nameOfBtn = document.getElementById(btnName).innerHTML
  nameOfBtn = nameOfBtn.substring(1, nameOfBtn.length-1);
   if (display === "none") {
    element.style.display = "block";
    document.getElementById(btnName).innerHTML = "- " + nameOfBtn + " -";
  } else {
   element.style.display = "none";
   document.getElementById(btnName).innerHTML = "+ " + nameOfBtn + " +";
 }
}

function loadCharacterArt(element) {
  var file = element.files[0];
  if (!file) {
    return;
  }
  var image = document.getElementById('character-art');
  var reader = new FileReader();
  reader.onload = function readSuccess(evt) {
      image.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

/* Dice Emulator Functions */

function rollOneDFour(element) {
  document.getElementById("1d4").innerHTML = Math.round((Math.random(4) * new Date().getTime()) % 4) + 1;
}

function rollOneDFive(element) {
  document.getElementById("1d5").innerHTML = Math.round((Math.random(5) * new Date().getTime()) % 5) + 1;
}

function rollOneDSix(element) {
  document.getElementById("1d6").innerHTML = Math.round((Math.random(6) * new Date().getTime()) % 6) + 1;
}

function rollOneDSeven(element) {
  document.getElementById("1d7").innerHTML = Math.round((Math.random(7) * new Date().getTime()) % 7) + 1;
}

function rollOneDEight(element) {
  document.getElementById("1d8").innerHTML = Math.round((Math.random(8) * new Date().getTime()) % 8) + 1;
}

function rollOneDNine(element) {
  document.getElementById("1d9").innerHTML = Math.round((Math.random(9) * new Date().getTime()) % 9) + 1;
}

function rollOneDTen(element) {
  document.getElementById("1d9").innerHTML = Math.round((Math.random(10) * new Date().getTime()) % 10) + 1;
}

function rollOneDTen(element) {
  document.getElementById("1d10").innerHTML = Math.round((Math.random(10) * new Date().getTime()) % 10) + 1;
}

function rollOneDTwelve(element) {
  document.getElementById("1d12").innerHTML = Math.round((Math.random(12) * new Date().getTime()) % 12) + 1;
}

function rollOneDTwenty(element) {
  document.getElementById("1d20").innerHTML = Math.round((Math.random(20) * new Date().getTime()) % 20) + 1;
}
