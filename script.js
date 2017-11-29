var firstVisit;
var eventlist = [];
var campus1info = [];
var campus2info = [];
var campus3info = [];

window.onload = init;

function init()
{
  var url = "mainData.json";
  var data;
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function()
  {
    if (request.status == 200)
    {
      data = request.responseText;
      data = JSON.parse(data);
      firstvisit = data.firstvisit;
      eventlist = data.eventlist;
      campus1info = data.campus1info;
      campus2info = data.campus1info;
      campus3info = data.campus1info;
      afterInit();
    }
  }
  request.send(null);
}

function afterInit(){
	
	//Adds sample text on first visit, and after each clear
	checkFirstVisit();
	
	//Event Submit Button
	var eventsubmitbutton = document.getElementById("eventsubmit");
	eventsubmitbutton.onclick = handleEventSubmitClick;
	loadEventList();

	//Clear data button
	var clearButton = document.getElementById("clrButton");
	clearButton.onclick = clearStorage;
	
	//Default data button
	var defaultButton = document.getElementById("rstButton");
	defaultButton.onclick = setDefault;
	
	//Campus Info Update Button
	var campusinfosubmitbutton = document.getElementById("campusinfosubmit");
	campusinfosubmitbutton.onclick = handleCampusInfoSubmitClick;

	//Loading the campus information
	loadCampusList(campus1info, "campus1info");
	loadCampusList(campus2info, "campus2info");
	loadCampusList(campus3info, "campus3info");
}

function checkFirstVisit(){
	if (firstvisit == "no"){
		console.log("do nothing");
	}
	else{
		firstvisit = "no";
		fillSampleText();
	}
}


function clearStorage() {
	/*localStorage.clear();*/
	firstvisit = "no";
	eventlist = [];
	campus1info = [];
	campus2info = [];
	campus3info = [];
	writeData();
	//localStorage.setItem("firstvisit", "no");
	alert("All data cleared!");
	location.reload();
}

function writeData()
{
	var fullData = { firstvisit: firstvisit, eventlist: eventlist, campus1info: campus1info, campus2info: campus2info, campus3info: campus3info};
	fullData = JSON.stringify(fullData);
	//console.log(fullData);
	var params = 'data='+fullData;
	var request = new XMLHttpRequest();
	request.open("POST", "/writeMainData");
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(params);
}

function setDefault(){
	clearStorage();
	fillSampleText();
	alert("Set to default!");
	location.reload();
}	
	
function handleEventSubmitClick(){

	//grab the name of the event from the text box
	var eventtextbox = document.getElementById("eventname"); 
	eventtext = eventtextbox.value;

	//create the element with the text as its value
	var li = document.createElement("li");
	li.innerHTML = eventtext;

	//add the element to the list
	var eventList = document.getElementById("eventlist");
	eventList.appendChild(li);
	
	//saving
	saveArray(eventtext, eventlist); //New. Saves (pushes) the first argument to the array named in the second argument -SS

}

function handleCampusInfoSubmitClick(){

	//determine which campus to update from the selection box
	var campusselect = document.getElementById("campusinfoselect");
	var num = campusselect.value;
	
	//var campustoupdate = document.getElementById(num);
	var campustoupdate;
	if (num == "campus1info")
	{
		campustoupdate = campus1info;	
	}
	else if (num == "campus2info")
	{
		campustoupdate = campus2info;	
	}
	else
	{
		campustoupdate = campus3info;
	}

	//get the input text from the text box
	var campusinfotextbox = document.getElementById("campusinfotext");
	eventtext = campusinfotextbox.value;
	
	//create the element with the text as its value
	var li = document.createElement("li");
	li.innerHTML = eventtext;

	//add the element to the list
	var campuslist = document.getElementById(num);
	campuslist.appendChild(li);
	
	//saving
	console.log(typeof campustoupdate);
	saveArray(eventtext, campustoupdate);	
}


//===========Saving/Loading arrays=====================================

function saveArray(item, arrayname) {	
	arrayname.push(item);
	writeData();
}

function loadEventList() {
	var eventListArray = eventlist;
	var ul = document.getElementById("eventlist");
	if (eventListArray != null) {
		for (var i = 0; i < eventListArray.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = eventListArray[i];
			ul.appendChild(li);
		}
	}
}

function getSavedEvents() {
	return eventlist;
}

/*function getStoreArray(key) {
	var eventListArray = localStorage.getItem(key);
	if (eventListArray == null || eventListArray == "") {
		eventListArray = new Array();
	}
	else {
		eventListArray = JSON.parse(eventListArray);
	}
	return eventListArray;
}*/

//================Savid/Loading Campus info========================================
function loadCampusList(arrayname, name) {
	var eventListArray = arrayname;
	var ul = document.getElementById(name);
	if (eventListArray != null) {
		for (var i = 0; i < eventListArray.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = eventListArray[i];
			ul.appendChild(li);

		}
	}
}
/*function getSavedCampus(campustoupdate) {
	return getStoreArray(campustoupdate);
}*/
//==================================================================================

//Text to fill the page on the first visit
function fillSampleText(){
	eventlist.push("Monday - Basketball Game");
	eventlist.push("Tuesday - Another thing");
	eventlist.push("Wednesday - Another thing");
	eventlist.push("Thursday - Another thing");
	eventlist.push("Friday - Another thing");
	eventlist.push("Saturday - Another thing");
	eventlist.push("Sunday - Another thing");
	
	/*saveArray("Monday - Basketball Game", "eventlist"); 
	saveArray("Tuesday - Another thing", "eventlist"); 
	saveArray("Wednesday - Another thing", "eventlist"); 
	saveArray("Thursday - Another thing", "eventlist"); 
	saveArray("Friday - Another thing", "eventlist"); 
	saveArray("Saturday - Another thing", "eventlist"); 
	saveArray("Sunday - Another thing", "eventlist");*/

	campus1info.push("The new high-tech institute, great for students willing to get involved with technology.");
	campus1info.push("Its main study programs are Computer Science and Computer Engineering");
	
	/*saveArray("The new high-tech institute, great for students willing to get involved with technology.", "campus1info");
	saveArray("Its main study programs are Computer Science and Computer Engineering", "campus1info");*/
	
	campus2info.push("The campus with great history behind it.");
	campus2info.push("Its main study programs are Chemistry, Anthropology, English and Language Studies.");
	/*saveArray("The campus with great history behind it.", "campus2info");
	saveArray("Its main study programs are Chemistry, Anthropology, English and Language Studies.", "campus2info");*/
	
	campus3info.push("The first campus.");
	campus3info.push("Its main study programs are Philosophy and Music");
	/*saveArray("The first campus.", "campus3info");
	saveArray("Its main study programs are Philosophy and Music", "campus3info");*/
}