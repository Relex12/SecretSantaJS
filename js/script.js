var i;
var collapse = document.getElementsByClassName("collapsible");

for (i = 0; i < collapse.length; i++) {
  collapse[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// TODO: fix this that makes it crash
// lorsque le radio est sur mail, pop-up
// puis griser ce qui doit l'être
var mode = document.forms.elements["mode"];
for(var i = 0, max = mode.length; i < max; i++) {
    mode[i].onclick = function() {
        alert(this.value);
    }
}

document.getElementById("confirm-step-1").addEventListener("click", function() {
	document.getElementById("step-1").style.display = "none";
	document.getElementById("step-2").style.display = "block";
});

document.getElementById("back-step-1").addEventListener("click", function() {
	document.getElementById("step-1").style.display = "block";
	document.getElementById("step-2").style.display = "none";
});

document.getElementById("confirm-step-2").addEventListener("click", function() {
	document.getElementById("step-2").style.display = "none";
	document.getElementById("step-3").style.display = "block";
});

document.getElementById("back-step-2").addEventListener("click", function() {
	document.getElementById("step-2").style.display = "block";
	document.getElementById("step-3").style.display = "none";
});

document.getElementById("confirm-step-3").addEventListener("click", function() {
	document.getElementById("step-3").style.display = "none";
	document.getElementById("results").style.display = "block";
});
