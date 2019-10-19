"use strict"

var knygynas = { 
	grozines : [
		{ISBN: 3548354, leidimoMetai: 1988, pavadinimas: "receptu knyga", puslapiai: 421, kaina: 0.99},
		{ISBN: 7441354, leidimoMetai: 1988, pavadinimas: "haris poteris7", puslapiai: 231, kaina: 5.99},
		{ISBN: 3592354, leidimoMetai: 2018, pavadinimas: "ziedu valdovdas", puslapiai: 482, kaina: 9.99},
		{ISBN: 3321354, leidimoMetai: 2018, pavadinimas: "qwerty", puslapiai: 391, kaina: 12.99}
	],
	mokslines : [
		{ISBN: 3548954, leidimoMetai: 1988, pavadinimas: "haris poteris2", puslapiai: 119, kaina: 8.75},
		{ISBN: 3751354, leidimoMetai: 1888, pavadinimas: "nauji metai", puslapiai: 222, kaina: 6.75},
		{ISBN: 3543454, leidimoMetai: 1988, pavadinimas: "haris poteris", puslapiai: 222, kaina: 15.75},
		{ISBN: 3549254, leidimoMetai: 1988, pavadinimas: "rokis balbo", puslapiai: 345, kaina: 11.00}
	],
	detektyvai : [
		{ISBN: 3546354, leidimoMetai: 1988, pavadinimas: "haris poteris4", puslapiai: 109, kaina: 15.30},
		{ISBN: 3541329, leidimoMetai: 1988, pavadinimas: "haris poteris1", puslapiai: 324, kaina: 9.30},
		{ISBN: 3741354, leidimoMetai: 2018, pavadinimas: "romie", puslapiai: 221, kaina: 11.30},
		{ISBN: 3573355, leidimoMetai: 2018, pavadinimas: "haris poteris11", puslapiai: 623, kaina: 8.30}
	]
}

let knygos_html = document.querySelector(".knygos");
let section = document.querySelector(".knygynas");

for(let kategorija in knygynas){
	let li = document.createElement("li");
	li.style.listStyle = "none";
	li.style.display = "inline"
	let button = document.createElement("button");
	button.innerHTML = kategorija;
	button.onclick = function(){
		try{
			let kategorija = document.getElementsByClassName("kategorija")[0];
			kategorija.remove();		
		}
		catch(e){

		}
		let ul = document.createElement("ul");
		ul.className = "kategorija";

		for(let kategorija in knygynas){
			if(kategorija == button.innerHTML)
			for(let knyga in knygynas[kategorija]){
				let list = document.createElement("li");
				list.style.listStyle = "none";
				list.innerHTML = knygynas[kategorija][knyga]['pavadinimas'];
				ul.appendChild(list);
			}
		}
		knygos_html.appendChild(ul);
	};
	li.appendChild(button);
	knygos_html.appendChild(li);

}

let forma = document.querySelector("form");
forma.onsubmit = function(event){
	try{
		let ul = document.querySelector(".sarasas");
		ul.remove();
	}
	catch(e){};
	let ul = document.createElement("ul");
	ul.className = "sarasas";
	section.appendChild(ul);
	event.preventDefault(); //sita daznai naudoja.
	let parinkta_kategorija = document.querySelector('input[name="kategorija"]:checked').value;
	let parinktas_pavadinimas = document.getElementById("sitas").value;
	for(let kategorija in knygynas){
		if(kategorija == parinkta_kategorija){
			for(let knyga in knygynas[kategorija]){
				if (knygynas[kategorija][knyga]['pavadinimas'].includes(parinktas_pavadinimas)){
					let li = document.createElement("li");
					li.style.listStyle = "none";
					li.innerHTML = knygynas[kategorija][knyga]['pavadinimas'];
					ul.appendChild(li);
				}
			}
		}
	}
}
















// isleista2008();
// pigiausiaKategorijoj();
// paieska_pagal_pavadinima();


class Skaitytojas{
	constructor(vardas, pavarde, perskaitytos_knygos){
		this.vardas = vardas;
		this.pavarde = pavarde;
		this.perskaitytos_knygos = perskaitytos_knygos;
	}
}

var skaitytojas1 = new Skaitytojas("Deividas", "Zemaitis", ["rommie", "rokis balbo", "qwerty"])
// console.log(skaitytojas1.perskaitytos_knygos[1]);


function pavadinimuMasyvoSukurimas(){
	let knyguPavadinimai = []

	for (let kategorija in knygynas){
		for (let knyga in knygynas[kategorija]){
			knyguPavadinimai.push(knygynas[kategorija][knyga]['pavadinimas'])
		}
	}
	knyguPavadinimai.sort()
	for(let pavadinimas of knyguPavadinimai){
		console.log(pavadinimas)
	}
}

function isleista2008(){
	console.log("-----Knygos isleistos 2018 metais :-----")
	for (let kategorija in knygynas){
		for(let knyga in knygynas[kategorija]){
			if (knygynas[kategorija][knyga]['leidimoMetai'] == 2018){
				console.log(knygynas[kategorija][knyga]['pavadinimas'] +" " + knygynas[kategorija][knyga]['leidimoMetai'])
			}
		}
	}
}

function pigiausiaKategorijoj(){
	for (let kategorija in knygynas){
		console.log("pigiausia knyga kategorijoje - " + kategorija + " - yra:")
		knygynas[kategorija].sort(function(a, b){
			return a.kaina > b.kaina;
		});
		console.log(knygynas[kategorija][0]['pavadinimas'] + " : " + knygynas[kategorija][0]['kaina'] + "eur")
	}
}

const input = "harIS poteris"; //paieskos uzklausa
var query = input.toLowerCase(); // i lower case pries ieskant.

function paieska_pagal_pavadinima(){
	console.log(`------Rastos knygos:------`)
	for (let kategorija in knygynas){ //of negalima naudot objektam, nes ne iterable. O su listu[] of reiksmes, in indexai.
		for (let knyga of knygynas[kategorija]){
			if(knyga['pavadinimas'].toLocaleLowerCase().includes(query)){
				var success = true;
				for(let i in knyga){
					console.log(`${i}: \n ${knyga[i]}`) // \n i kita eilute, grazesnis output tiesiog.
				}
				console.log("---------------")
			}
		}
	}
	if(!success){
		console.log("Knygu pagal toki pavadinima nerasta")
	}
}

// 1.4 Sukurti knygos paieškos programą, kuri ieško pagal visas savybes, kurias turi knygos objektas.
// Padartya: Reiktu tobulinti filtrus. Pvz ivedus tuscia pavadinima "", randa visas knygas. Dar butu galima parasyti,
// pagal kokia savybe rado knyga.
const input_pavadinimas = "asds" 
const input_isbn = ""
const input_puslapiai = ""
const input_kaina = 12.99
const input_leidimoMetai = ""

// paieska_pilna();

function paieska_pilna(){
	console.log(`------Rastos knygos pagal, bent viena is ivestu kriteriju:------`)
	for (let kategorija in knygynas){ //of negalima naudot objektam, nes ne iterable. O su listu[] of reiksmes, in indexai.
		for (let knyga of knygynas[kategorija]){
			if(knyga['pavadinimas'].toLocaleLowerCase().includes(input_pavadinimas)
				|| knyga['ISBN'] == input_isbn
				|| knyga['leidimoMetai'] == input_leidimoMetai
				|| knyga['puslapiai'] == input_puslapiai
				|| knyga['kaina'] == input_kaina){
				var success = true;
				for(let i in knyga){
					console.log(`${i}: \n ${knyga[i]}`) // \n i kita eilute, grazesnis output tiesiog.
				}
				console.log("---------------")
			}
		}
	}
	if(!success){
		console.log("Knygu pagal tokias reiksmes nerasta")
	}
}