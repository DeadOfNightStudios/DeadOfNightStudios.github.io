/* MyRPG Script contains all rule logic for the character sheet */

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
    var attributePts = parseInt(remainingPts) + (difference * 3);
    if (level >= 30) {
      attributePts = parseInt(remainingPts) + (difference * 2);
    } else if (level >= 60) {
      attributePts = parseInt(remainingPts) + (difference * 1);
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
  
  if (element.id == "wis") {
    updateKnowledgeAndSkills(element);
  } else if (element.id == "vit") {
    updateHealth(element);
  } else if (element.id == "str") {
    updateBodyWeightAndCapcity(element);
  } else if (element.id == "agi") {
    updateSpeed(element);
  }
}

/* Trait Update Functions  */

function updateHealth(element) {
  var vitality = document.getElementById("vit").value;
  document.getElementById("health").innerHTML = vitality;
  document.getElementById("damage").value = vitality;
  document.getElementById("damage").max = vitality;
  document.getElementById("damage").min = 0;
}

function updateBodyWeightAndCapcity(element) {
  var str = document.getElementById("str").value;
  document.getElementById("body-weight").innerHTML = parseInt(str) * 10;
  document.getElementById("capacity").innerHTML = parseInt(str) * 20;
}

function updateSpeed(element) {
  var agi = document.getElementById("agi").value;
  document.getElementById("speed").innerHTML = Math.floor(parseInt(agi)/4);
  document.getElementById("action_pts").innerHTML = Math.floor(parseInt(agi)/5);
}

function updateKnowledgeUsed(element) {
  var knowledge = document.getElementById("knl").innerHTML;
  if (element.value > knowledge) {
    element.value = element.defaultValue;
  } else if (parseInt(element.value) < 0) {
    element.value = 0;
  }
  document.getElementById("knl_used").max = knowledge;
  document.getElementById("knl_used").min = 0;
}

function updateDamage(element) {
  var health = document.getElementById("health").innerHTML;
  if (parseInt(element.value) > health) {
    element.value = element.defaultValue;
  } else if (parseInt(element.value) < 0) {
    element.value = 0;
  }
  document.getElementById("damage").max = health;
  document.getElementById("damage").min = 0;
}

function updateKnowledgeAndSkills(element) {
  var wisdom = document.getElementById("wis").value;
  var knowledge = parseInt(wisdom) / 5;
  document.getElementById("knl").innerHTML = Math.floor(knowledge);
  document.getElementById("knl_used").max = wisdom;
  document.getElementById("knl_used").min = 0;
  
  var skillPtsRemaining = parseInt(document.getElementById("skill_pts").innerHTML);
  var skillPtsAssigned = parseInt(document.getElementById("skill_pts_assigned").innerHTML);
  var totalPts = skillPtsRemaining + skillPtsAssigned;
  
  var skillPtsMax = Math.floor(wisdom / 3);
  var newSkillPts = 0;
  
  if (totalPts > skillPtsMax) {
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
  } else if (totalPts <= skillPtsMax) {
    var difference = skillPtsMax - totalPts;
    newSkillPts = skillPtsRemaining + difference;
    
    document.getElementById("skill_pts").innerHTML = newSkillPts;
  }
    
  updateSkillProperties("archery", newSkillPts);
  updateSkillProperties("art", newSkillPts);
  updateSkillProperties("blade", newSkillPts);
  updateSkillProperties("block", newSkillPts);
  updateSkillProperties("blunt", newSkillPts);
  updateSkillProperties("carpentry", newSkillPts);
  updateSkillProperties("chemistry", newSkillPts);
  updateSkillProperties("culinary_arts", newSkillPts);
  updateSkillProperties("dodge", newSkillPts);
  updateSkillProperties("duel_wield", newSkillPts);
  updateSkillProperties("engineering", newSkillPts);
  updateSkillProperties("herbalism", newSkillPts);
  updateSkillProperties("literacy", newSkillPts);
  updateSkillProperties("martial_arts", newSkillPts);
  updateSkillProperties("pick_lock", newSkillPts);
  updateSkillProperties("pick_pocket", newSkillPts);
  updateSkillProperties("sewing", newSkillPts);
  updateSkillProperties("smithing", newSkillPts);
  updateSkillProperties("staff", newSkillPts);
  updateSkillProperties("spell_craft", newSkillPts);
  updateSkillProperties("swim", newSkillPts);
  updateSkillProperties("sneak", newSkillPts);
  updateSkillProperties("whip", newSkillPts);
  
}

/* Skill Update Functions  */

function updateSkillPoints(element) {
  var remainingPts = parseInt(document.getElementById("skill_pts").innerHTML);
  var skillPtsAssigned = parseInt(document.getElementById("skill_pts_assigned").innerHTML);
  var totalPts = remainingPts + skillPtsAssigned;
  
  if (parseInt(element.value) > totalPts) {
    element.value = element.defaultValue;
  } else if (remainingPts === 0) {
    element.value = element.defaultValue;
  } else if (parseInt(element.value) < 0) {
    element.value = 0;
  } else if (parseInt(element.value) < parseInt(element.defaultValue)) {
    var diff = element.defaultValue - element.value;
    document.getElementById("skill_pts").innerHTML = remainingPts + diff;
  } else if (parseInt(element.value) >= parseInt(element.defaultValue)) {
    var difference = parseInt(element.value) - parseInt(element.defaultValue);
    document.getElementById("skill_pts").innerHTML = remainingPts - difference;
  }
  element.defaultValue = element.value;
  
  var assignedPts = updateSkillProperties("archery", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("art", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("blade", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("block", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("blunt", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("carpentry", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("chemistry", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("culinary_arts", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("dodge", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("duel_wield", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("engineering", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("herbalism", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("literacy", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("martial_arts", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("pick_lock", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("pick_pocket", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("sewing", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("smithing", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("staff", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("spell_craft", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("swim", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("sneak", remainingPts);
  assignedPts = assignedPts + updateSkillProperties("whip", remainingPts);
  
  document.getElementById("skill_pts_assigned").innerHTML = assignedPts;
}

function updateSkillProperties(elementName, remainingPts) {
  var value = parseInt(document.getElementById(elementName).value);
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
  cellOne.innerHTML = "<input id=\"item_" + rowCount + "_name\" type=\"text\" />"
  var cellTwo = row.insertCell(1);
  cellTwo.innerHTML = "<input id=\"item_" + rowCount + "_name\" type=\"text\" />"
  var cellThree = row.insertCell(2);
  cellThree.innerHTML = "<input id=\"item_" + rowCount + "_name\" type=\"text\" />"
}

/* Load and Save Character Sheet Functions */

function loadCharacterSheet(e) {
  var file = e.target.files[0];
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
  var characterClass = document.getElementById("class").value;
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
  if (display === "block") {
    element.style.display = "none";
    document.getElementById(btnName).innerHTML = "+ " + nameOfBtn + " +";
  } else {
    element.style.display = "block";
    document.getElementById(btnName).innerHTML = "- " + nameOfBtn + " -";
  }
}



