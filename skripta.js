window.addEventListener('load', function() {
	//stran nalozena
	
	//Dodaj novo barvo
	var dodajBarvo = function(event) {
		var input = document.createElement('button');
        var picker = new jscolor(input);
        picker.fromRGB(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255));
        document.getElementById("barve").appendChild(input);
	};
	
	document.querySelector("#novaBarva").addEventListener('click', dodajBarvo);
		
	//Odstrani barve
	var odstrani = function(event) {
		document.querySelector("#barve").innerHTML= '';
	}
	//Stroboskop
	var vrednosti = [];
	var minCas = 0;
	var maxCas = 0;
	var ustavi = false;
	
	var spremeniBarvo = function(id) {
		document.getElementById("stroboskop").style.backgroundColor = "#"+vrednosti[id];

		if (ustavi) {
			ustavi = false;
		} else {
			novId = (id+1) % vrednosti.length;
			timeout = Math.floor((Math.random() * (maxCas-minCas)) + minCas);
			setTimeout(function() {spremeniBarvo(novId)} , timeout);
		}		
	};
	
	var vstavitev = function(event) {
		ustavi = true;
		var stop = document.querySelector('#start');
		stop.innerHTML = "Zaženi stroboskop";
		stop.removeEventListener('click', vstavitev);
		stop.addEventListener('click', zagon);
		
	};
	
	var zagon = function(event) {
		ustavi=false;
		vrednosti = [];
		var barve = document.querySelectorAll("#barve > button");
		for (i = 0; i < barve.length; i++) {
			var barva = barve[i];
			vrednosti.push(barva.innerHTML);
		}
		
		minCas = document.querySelector('#min').value;
		maxCas = document.querySelector('#max').value;
		spremeniBarvo(0);
		
		var start = document.querySelector("#start");
		start.innerHTML = "Ustavi stroboskop";
		start.removeEventListener('click', zagon);
		start.addEventListener('click', vstavitev);
	}
	
	document.querySelector("#start").addEventListener('click', zagon);
	
	document.querySelector("#odstraniBarve").addEventListener('click', odstrani);
});