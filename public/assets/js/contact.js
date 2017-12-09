function toggle(divId) {
	var element = document.getElementById(divId);
  if (element.style.display === "none") {
      element.style.display = "block";
  } else {
      element.style.display = "none";
  }
}

function hideAll(divClass) {
	var elements = document.getElementsByClassName(divClass);
	console.log(elements);
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.display = "none";
	}}

function show(divId) {
	document.getElementById(divId).style.display = "block";
}

var formSubmit = function(token) {
	console.log(token);
	hideAll("error");
	var name = document.forms["contactForm"]["name"].value;
	var email = document.forms["contactForm"]["email"].value;
	var subject = document.forms["contactForm"]["subject"].value;
	var text = document.forms["contactForm"]["text"].value;
	var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var fine = true;

	if (name == "") {
		show("nameNull");
		fine = false;
	}
	if (email == "" || !filter.test(email)) {
		show("emailNull");
		fine = false;
	}
	if (subject == "") {
		show("subjectNull");
		fine = false;
	}
	if (text == "") {
		show("textNull");
		fine = false;
	}
	if (fine) {
  	document.getElementById("contactForm").submit();
  }
}

