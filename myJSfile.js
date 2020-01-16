
var myGoogleKey = "AIzaSyC2JDE4cNXgd4wSZxTbFuYAaRfug2lVm9g";
var results = $('#results');
var electionID = 2000;
//var myAddress = 'Briarcliff Manor, NY'

/*
This is the main function of the page
It will take the user inputs, validate them, and then search using 
NYtimes articles and also gifs
*/

//logToConsole("Adrienne Shulman")

function onClickLookup(){
  //logToConsole("Luke Skywalker")
  
  var myAddress = $('#searchText').val();
  
  // make the request to Google Civic info about elected officials below!
  $.ajax({
    url: `https://www.googleapis.com/civicinfo/v2/representatives?address=${myAddress}&key=${myGoogleKey}`,    
    type: 'GET',
    success: data => lookupElectedOfficials(data),
  });

  // make the request to Google Civic info about polling places
  //this was returning error code 400 because no election was active at the time of searching
  /*
  $.ajax({
    url: `https://www.googleapis.com/civicinfo/v2/voterinfo?address=156%20Chappaqua%20Road%2C%20Briarcliff%20Manor%2C%20NY%2010510&electionID=4890&key=${myGoogleKey}`,    
    type: 'GET',
    success: data => lookupPollingPlaces(data),
  });
  */

  // make the request to Google Civic info about elections
  
  $.ajax({
    url: `https://www.googleapis.com/civicinfo/v2/elections?key=${myGoogleKey}`,    
    type: 'GET',
    success: data => lookupElections(data),
  });


}

function lookupPollingPlaces(data){
  
  logToConsole(data);
  
  
}

function lookupElections(data){
  
  logToConsole(data);
  
  
}


function lookupElectedOfficials(data){
  logToConsole(data);
  //return;
 
  var listItems = '';

  var offices = data.offices;
  var officials = data.officials;
  // Loop through all offices.  For each office, find out how many
  // People (officials) hold that office and then loop thru the total 
  // number of officials to get their names. 
  for (var i = 0; i < offices.length; i++) {
    var office = offices[i].name; 
    var officialName = "";
    var officialURL = "";
    var numberOfOfficials = offices[i].officialIndices.length;
    
    
    for (var x = 0; x < numberOfOfficials; x++){
      
      if (x>0){
        officialName += " and "
      }
      
      officialIndex = offices[i].officialIndices[x];
      officialURL = officials[officialIndex].urls;
      //logToConsole(officialURL);
      if(typeof officialURL=== "undefined"){
        officialName += `${officials[officialIndex].name}`;  
      }else{
        officialName += `<a href="${officialURL}" target="_new">${officials[officialIndex].name} </a>`;     
      }
      
      //logToConsole(typeof officialURL)
     //logToConsole("Index:" + officialIndex)
    }
    

    listItems += `<li>${office} - ${officialName}</li>`;
  }
  
  var wholeList = `<ul>${listItems}</ul>`;
  //newspaperContent.append(`<h2>Top articles from the New York Times:</h2>`);
  results.append(wholeList);
  
  

}


function lookupPollingPlace(){
  
  
  
  
}

function onClickClearResults(){
  logToConsole("hello world");
  results.html ("");
}


function logToConsole(data){
  console.log(data)
  //document.getElementById("debug").innerHTML += `<br>${data}`;
  //document.getElementById("debugtext").value += `\r\n${data}`;
}



$('#lookup').click(onClickLookup);
$('#clearResults').click(onClickClearResults);