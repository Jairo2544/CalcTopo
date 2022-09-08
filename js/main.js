/*Función que captura los datos*/
function captura(id) { 
	let valor = document.getElementById(id).value;
	return valor
};

abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

/*De Grados minutos y segundo a radianes*/
function degreesRadianes(g,m,s) {
	s = s*1/3600;
	m = m*1/60;
	g = g + s + m;
	rad = g*Math.PI/180;
	rad = rad.toFixed(9);
	return parseFloat(rad);
};

function radianesDegrees(rad) {
	g = rad * 180/Math.PI;
	m = (g - parseInt(g)) * 60;
	s = (m - parseInt(m)) * 60;
	g = parseInt(g);
	m = parseInt(m);
	s = Math.round(s);
	return [g,m,s]
}

/*Operaciones con grados, minutos y segundos*/
function sumaSexagesimal(g1,m1,s1,g2,m2,s2) {
	let s = (s1 + s2) % 60;
	m3 = (s1 + s2 - s)/60;
	let m = (m1 + m2 + m3) % 60;
	g3 = (m1 + m2 + m3 - m)/60;
	let g = g1 + g2 + g3;
	return [g,m,s];
}
function restaSexagesimal(g1,m1,s1,g2,m2,s2) {
	let s;
	let m;
	let g;
	if (g1 >= g2) {
		s = s1 - s2;
		m = m1 - m2;
		g = g1 - g2;
	} else {
		s = s2 - s1;
		m = m2 - m1;
		g = g2 - g1;
	};
	if (s<0) {
		m = m - 1
		s = s + 60
	};
	if (m<0) {
		g = g - 1
		m = m + 60
	};
	if (g1<g2) {
		g = -g
	};
	return [g,m,s];
}


/*Reconocimiento de dato*/
function formPoligonal() {
	let indicacion = '<h2 class="indicacion">Ingrese la distancia de los lados de la poligonal</h2>';
	let boton = '<button class="boton" type="button" onclick="'+ "formAngulos()" +'">Siguiente</button>';
	let nLados = captura("numeroLados");
	let html = "";
	for (let i = 0; i<nLados; i++) {
		let id = "";
		let nombre;
		if (i == nLados - 1) {
			nombre = abc[i] + "-" + "A";
			id = "D" + i;
		} else {
			nombre = abc[i] + "-" + abc[i + 1];
			id = "D" + i;
		};
		html = html + '<h4 class = "fPoligonal">Ingrese la distancia ' + nombre + '</h4><input type="number" name="'+ id + '" id="' + id + '" placeholder="Ingrese la distancia ' + nombre + '"></input>';
	}
	document.getElementById("formNumero").classList.toggle("hidden");
	document.getElementById("formPoligonal").innerHTML = indicacion + "<form>" + html + "</form>" + boton;
}

function formAngulos() {
	let indicacion = '<h2 class="indicacion">Ingrese los ángulos de la poligonal</h2>';
	let boton = '<button class="boton" type="button" onclick="'+ "formAzimut()" +'">Siguiente</button>';
	let nLados = captura("numeroLados");
	let html = "";
	for (let i = 0; i<nLados; i++) {
		let id = "∠";
		let nombre;
		nombre = abc[i];
		id = "∠" + nombre;
		let grados = '<input type="number" name="'+ id + '" id="' + id + "g" + '" placeholder="Ingrese el grado de ' + nombre + '"></input>'
		let minutos = '<input type="number" name="'+ id + '" id="' + id + "m" + '" placeholder="Ingrese los minutos de ' + nombre + '"></input>'
		let segundos = '<input type="number" name="'+ id + '" id="'+ id + "s" + '" placeholder="Ingrese los segundos de ' + nombre + '"></input>'
		html = html + '<h4 class = "fPoligonal">Ingrese el ángulo ' + nombre + '</h4>' + grados + minutos + segundos;
	};
	document.getElementById("formPoligonal").classList.toggle("hidden");
	document.getElementById("formAngulos").innerHTML = indicacion + "<form>" + html + "</form>" + boton;
};

function formAzimut() {
	let indicacion = '<h2 class="indicacion">Ingrese el azimut del lado AB</h2>';
	let boton = '<button class="boton" type="button" onclick="'+ "formCoordenada()" +'">Siguiente</button>';
	let htmlg = '<input type="number" name="AzAB" id="AzABg" placeholder="Ingrese el grado del azimut de AB"></input>';
	let htmlm = '<input type="number" name="AzAB" id="AzABm" placeholder="Ingrese los minutos del azimut de AB"></input>';
	let htmls = '<input type="number" name="AzAB" id="AzABs" placeholder="Ingrese los segundos de AB"></input>';
	document.getElementById("formAngulos").classList.toggle("hidden");
	document.getElementById("formAzimut").innerHTML = indicacion + "<form>" + htmlg + htmlm + htmls + "</form>" + boton;
}
function formCoordenada() {
	let indicacion = '<h2 class="indicacion">Ingrese la coordenada de A</h2>';
	let boton = '<button class="boton" type="button" onclick="'+ "calcular()" +'">Calcular</button>';
	let htmlE = '<h4 class = "fPoligonal">Ingrese la coordenada este de A</h4><input type="number" name="CAE" id="CAE" placeholder="Ingrese la coordenada este de A"></input>';
	let htmlN = '<h4 class = "fPoligonal">Ingrese la coordenada norte de A</h4><input type="number" name="CAN" id="CAN" placeholder="Ingrese la coordenada norte de A"></input>';
	document.getElementById("formAzimut").classList.toggle("hidden");
	document.getElementById("formCoordenada").innerHTML = indicacion + "<form>" + htmlE + htmlN + "</form>" + boton;
}

/*Paso 1: Error angular*/
function angulos() {
	let angulos = [];
	let nLados = captura("numeroLados")
	for (let i = 0; i < nLados; i++) {
		g = parseFloat(captura("∠" + abc[i] + "g"))
		m = parseFloat(captura("∠" + abc[i] + "m"))
		s = parseFloat(captura("∠" + abc[i] + "s"))
		rad = degreesRadianes(g,m,s)
		angulos.push(rad)
	};
	return angulos
}

function errorAngular() {
	let nLados = captura("numeroLados");
	let sAngulos = 0;
	let SAngulosInteriores = 180*(nLados-2);
	let angle = angulos()
	for (let i = 0; i < angle.length; i++) {
		sAngulos = sAngulos + angle[i]
	};
	sAngulos = radianesDegrees(sAngulos);
	let eAngular = restaSexagesimal(SAngulosInteriores,0,0,sAngulos[0],sAngulos[1],sAngulos[2]);
	return eAngular;
}

function correccionAngular() {
	let nLados = parseInt(captura("numeroLados"));
	let eAngular = errorAngular()
	let angles = angulos()
	let angulosCorregidos = []
	let eAngularSexaSeg = eAngular[0]*3600 + eAngular[1]*60 + eAngular[2]
	let cAngular
	let angulo
	if (eAngularSexaSeg % nLados == 0) {
		cAngular = eAngularSexaSeg/nLados;
		for (let i = 0; i < nLados; i++) {
			angulo = radianesDegrees(angles[i])
			let suma = sumaSexagesimal(0,0,cAngular,angulo[0],angulo[1],angulo[2])
			angulosCorregidos.push(degreesRadianes(suma[0], suma[1], suma[2]))
		}
		return angulosCorregidos
	}
	if (eAngularSexaSeg % nLados != 0) {
		cAngular = (eAngularSexaSeg - eAngularSexaSeg%nLados)/nLados;
		let angulosMedio =[]
		for (let index = 0; index < nLados; index++) {
			angulo = radianesDegrees(angles[index])
			let suma = sumaSexagesimal(0,0,cAngular,angulo[0],angulo[1],angulo[2])
			angulosMedio.push(degreesRadianes(suma[0], suma[1], suma[2]))
		}
		for (let index = 0; index < eAngularSexaSeg%nLados; index++) {
			angulo = radianesDegrees(angulosMedio[index])
			let suma = sumaSexagesimal(0,0,1,angulo[0],angulo[1],angulo[2])
			angulosCorregidos.push(degreesRadianes(suma[0], suma[1], suma[2]))
		}
		for (let i=angulosCorregidos.length ;i<angulosMedio.length; i++){
			angulosCorregidos.push(angulosMedio[i])
		}
		return angulosCorregidos
	}
}

/*Paso 2: Azimuts*/
function calcularAzimut() {
	let nLados = captura("numeroLados");
	let AzABg = parseInt(captura("AzABg"))
	let AzABm = parseInt(captura("AzABm"))
	let AzABs = parseInt(captura("AzABs"))
	let Azs = [degreesRadianes(AzABg,AzABm,AzABs)]
	let angulosCorregidos = correccionAngular()
	for (let i = 0; i < nLados - 1 ; i++) {
		pc = Azs[i] + angulosCorregidos[i+1]
		let azrad
		if (pc < Math.PI) {
			azrad = pc+Math.PI
		} else if (pc >= 3*Math.PI) {
			azrad = pc-3*Math.PI
		} else if (pc >= Math.PI) {
			azrad = pc-Math.PI
		}
		Azs.push(azrad)
	}
	return Azs
}

/*Paso 3: Proyecciones*/
/*Proyección Este*/
function distancia() {
	let distancias = [];
	let nLados = parseInt(captura("numeroLados"))
	for (let index = 0; index < nLados; index++) {
		let d = parseFloat(captura("D" + index))
		distancias.push(d)
	};
	return distancias
}
function proyE() {
	let distancias = distancia()
	let Azs = calcularAzimut()
	let proyEs = []
	for (let i = 0; i < distancias.length; i++) {
		let proyEste = distancias[i] * Math.sin(Azs[i])
		proyEste = proyEste.toFixed(3) + ""
		proyEste = parseFloat(proyEste)
		proyEs.push(proyEste)
	}
	return proyEs
}
function proyN() {
	let distancias = distancia()
	let Azs = calcularAzimut()
	let proyNs = []
	for (let i = 0; i < distancias.length; i++) {
		let proyNorte = distancias[i] * Math.cos(Azs[i])
		proyNorte = proyNorte.toFixed(3) + ""
		proyNorte = parseFloat(proyNorte)
		proyNs.push(proyNorte)
	}
	return proyNs
}

/*Error de cierre*/
function eCierre() {
	let proyEs = proyE()
	let proyNs = proyN()
	let sumaE = 0
	let sumaN = 0
	for (let i = 0; i < proyEs.length; i++) {
		sumaE = sumaE + parseFloat(proyEs[i])
	}
	for (let i = 0; i < proyNs.length; i++) {
		sumaN = sumaN + parseFloat(proyNs[i])
	}
	sumaE = parseFloat(sumaE.toFixed(3))
	sumaN = parseFloat(sumaN.toFixed(3))
	let errorCierre = Math.sqrt(sumaE**2+sumaN**2)
	errorCierre = parseFloat(errorCierre.toFixed(3))
	return [errorCierre, sumaE, sumaN]
}

function precision() {
	let errorCierre = parseFloat(eCierre()[0])
	let distancias = distancia()
	let perimetro = 0
	for (i = 0; i<distancias.length; i++){
		perimetro = perimetro + distancias[i]
	}
	let preci = perimetro/errorCierre
	return preci
}

/* Paso 4: Compensaciones*/
/*Compensacion Este*/
function compenE() {
	let distancias = distancia()
	let eCierreE = eCierre()[1]
	let perimetro = 0
	let compE = 0
	let compEs = []
	let compEs3 = []
	let decimales = []
	let diferencia = 0
	let decimalesOrdenados = []
	let nOrden = []
	let bandera = false
	for (i = 0; i<distancias.length; i++){
		perimetro = perimetro + distancias[i]
	}
	for (i = 0; i<distancias.length; i++){
		compE = (-eCierreE*distancias[i])/perimetro
		compE = compE.toFixed(4)
		compEs.push(parseFloat(compE))
	}
	/*Compensando a 3 decimales*/
	let suma = 0
	for (i=0; i<compEs.length;i++){
		suma = suma + parseInt(compEs[i]*1000)/1000
	}
	diferencia = -eCierreE - parseFloat(suma.toFixed(3))
	for (i = 0; i<compEs.length; i++){
		decimales.push(parseFloat((compEs[i]*1000-parseInt(compEs[i]*1000)).toFixed(1))*10)
		decimalesOrdenados.push(parseFloat((compEs[i]*1000-parseInt(compEs[i]*1000)).toFixed(1))*10)
	}
	decimalesOrdenados.sort()
	diferencia = parseInt(diferencia * 1000)
	for(i=0;i<diferencia; i++) {
		for(a=0; a<decimalesOrdenados.length;a++) {
			if (decimales[a] == decimalesOrdenados[decimalesOrdenados.length-i-1]) {
				nOrden.push(a)
			}
		}
	}
	for (i = 0; i<compEs.length; i++){
		bandera = false
		for (a=nOrden.length - 1; a>-1;a--){
			if (i == nOrden[a]) {
				bandera = true
			}
		}
		if (bandera == true) {
			compEs3.push(parseFloat(parseInt(compEs[i]*1000)/1000 + 0.001))
		} else {
		compEs3.push(parseFloat(parseInt(compEs[i]*1000)/1000))
		}
	}
	return compEs3
}

/*Compensacion Norte*/
function compenN() {
	let distancias = distancia()
	let eCierreN = eCierre()[2]
	let perimetro = 0
	let compN = 0
	let compNs = []
	let compNs3 = []
	let decimales = []
	let diferencia = 0
	let decimalesOrdenados = []
	let nOrden = []
	let bandera = false
	for (i = 0; i<distancias.length; i++){
		perimetro = perimetro + distancias[i]
	}
	for (i = 0; i<distancias.length; i++){
		compN = (-eCierreN*distancias[i])/perimetro
		compN = compN.toFixed(4)
		compNs.push(parseFloat(compN))
	}
	/*Compensando a 3 decimales*/
	let suma = 0
	for (i=0; i<compNs.length;i++){
		suma = suma + parseInt(compNs[i]*1000)/1000
	}
	diferencia = -eCierreN - parseFloat(suma.toFixed(3))
	for (i = 0; i<compNs.length; i++){
		decimales.push(parseFloat((compNs[i]*1000-parseInt(compNs[i]*1000)).toFixed(1))*10)
		decimalesOrdenados.push(parseFloat((compNs[i]*1000-parseInt(compNs[i]*1000)).toFixed(1))*10)
	}
	decimalesOrdenados.sort()
	diferencia = parseInt(diferencia * 1000)
	for(i=0;i<diferencia; i++) {
		for(a=0; a<decimalesOrdenados.length;a++) {
			if (decimales[a] == decimalesOrdenados[decimalesOrdenados.length-1-i]) {
				nOrden.push(a)
			}
		}
	}
	for (i = 0; i<compNs.length; i++){
		bandera = false
		for (a=nOrden.length - 1; a>-1;a--){
			if (i == nOrden[a]) {
				bandera = true
			}
		}
		if (bandera == true) {
			compNs3.push(parseFloat(parseInt(compNs[i]*1000)/1000 + 0.001))
		} else {
		compNs3.push(parseFloat(parseInt(compNs[i]*1000)/1000))
		}
	}
	return compNs3
}
/*Paso 5: Corregir*/
/*Este*/
function corregirE(){
	let proyEste = proyE()
	let compEs = compenE()
	let proyEC = 0
	let proyECs = []
	for (let i = 0; i < compEs.length; i++) {
		proyEC = parseFloat(proyEste[i]) + parseFloat(compEs[i])
		proyECs.push(parseFloat(proyEC.toFixed(3)))		
	}
	return proyECs
}
/*Norte*/
function corregirN(){
	let proyNorte = proyN()
	let compNs = compenN()
	let proyNC = 0
	let proyNCs = []
	for (let i = 0; i < compNs.length; i++) {
		proyNC = parseFloat(proyNorte[i]) + parseFloat(compNs[i])
		proyNCs.push(parseFloat(proyNC.toFixed(3)))		
	}
	return proyNCs
}

/*Paso 5: Coordenadas*/
/*Este*/
function coordenadasE() {
	let coorAE = parseFloat(captura("CAE"))
	let proyEs = corregirE()
	let coorEs = [coorAE]
	for (let i = 0; i < proyEs.length - 1; i++) {
		let coorE = parseFloat(coorEs[i]) + parseFloat(proyEs[i])
		coorEs.push(parseFloat(coorE.toFixed(3)))
	}
	return coorEs
}
/*Norte*/
function coordenadasN() {
	let coorAN = parseFloat(captura("CAN"))
	let proyNs = corregirN()
	let coorNs = [coorAN]
	for (let i = 0; i < proyNs.length - 1; i++) {
		let coorN = parseFloat(coorNs[i]) + parseFloat(proyNs[i])
		coorNs.push(parseFloat(coorN.toFixed(3)))
	}
	return coorNs
}

/*Calculo de todo*/
/*Mostrar Eangular*/
function mostrarEangular() {
	let eAngular = errorAngular()
	let html = '<h4 class="result1">El error angular es ' + eAngular[0] + "° " + eAngular[1] + "' " + eAngular[2] + '"' + '</h4>'
	document.getElementById("eAngular").innerHTML = html;
	return
}
/* Mostrar ángulos corregidos*/
function mostrarAngulos() {
	let angulosCorregidos = correccionAngular()
	let html = ""
	let tittle = '<h4 class="result1">Angulos corregidos:</h4>'
	for (let i = 0; i < angulosCorregidos.length; i++) {
		aCorregido = radianesDegrees(angulosCorregidos[i])
		html = html + '<h5 class="result">' + "∠" + abc[i] + ": " + aCorregido[0] + "° " + aCorregido[1] + "' " + aCorregido[2] + '"' + "</h5>"
	}
	document.getElementById("angulosCorregidos").innerHTML = tittle + html;
	return
}

/*Mostrar azimuts*/
function mostrarAzimuts() {
	let azimuts = calcularAzimut()
	let html = ""
	let tittle = '<h4 class="result1">Azimuts:</h4>'
	for (let i = 0; i < azimuts.length; i++) {
		az = radianesDegrees(azimuts[i])
		if (i == azimuts.length-1) {
		html = html + '<h5 class="result"> Az ' + abc[i] + "-" + abc[0] + ": " + az[0] + "° " + az[1] + "' " + az[2] + '"' + "</h5>"
		} else {
		html = html + '<h5 class="result"> Az ' + abc[i] + "-" + abc[i+1] + ": " + az[0] + "° " + az[1] + "' " + az[2] + '"' + "</h5>"
		}
	}
	document.getElementById("azimuts").innerHTML = tittle + html;
	return
}

/*Mostrar proyecciones*/
function mostrarProyecciones() {
	let proyEste = proyE()
	let proyNorte = proyN()
	let htmlE = ""
	let htmlN = ""
	/*Este*/
	for (let i = 0; i < proyEste.length; i++) {
		if (i == proyEste.length-1) {
			htmlE = htmlE + '<h5 class="result"> Proy ' + abc[i] + "-" + abc[0] + ": " + proyEste[i] + "</h5>"
			} else {
			htmlE = htmlE + '<h5 class="result"> Proy ' + abc[i] + "-" + abc[i+1] + ": " + proyEste[i] + "</h5>"
			}
	}
	let tittleE = '<h4 class="result1">Proyeccion Este:</h4>'
	document.getElementById("pEste").innerHTML = tittleE + htmlE;
	/*Norte*/
	for (let i = 0; i < proyNorte.length; i++) {
		if (i == proyNorte.length-1) {
			htmlN = htmlN + '<h5 class="result"> Proy ' + abc[i] + "-" + abc[0] + ": " + proyNorte[i] + "</h5>"
			} else {
			htmlN = htmlN + '<h5 class="result"> Proy ' + abc[i] + "-" + abc[i+1] + ": " + proyNorte[i] + "</h5>"
			}
	}
	let tittleN = '<h4 class="result1">Proyeccion Norte:</h4>'
	document.getElementById("pNorte").innerHTML = tittleN + htmlN;
	return
}

/* Error lineal y precisión*/
function mostrarElineal() {
	let errorCierre = eCierre()
	let html = '<h5 class="result">Error de cierre: ' + errorCierre[0] + '</h5>'
	let htmlE = '<h5 class="result">Error en el este: ' + errorCierre[1] + '</h5>'
	let htmlN = '<h5 class="result">Error en el norte: ' + errorCierre[2] + '</h5>'
	let tittle = '<h4 class="result1">Error de cierre:</h4>'
	document.getElementById("eCierre").innerHTML = tittle + html + htmlE + htmlN;
	return
}

function mostrarPrecision() {
	let prec = precision()
	let tittle = '<h4 class="result1">Precisión</h4>'
	document.getElementById("precision").innerHTML = tittle +'<h5 class="result">1/' + prec +"</h5>";
	return
}

/*Mostrar compensaciones*/
function mostrarCompensaciones() {
	let compE = compenE()
	let compN = compenN()
	let htmlE = ""
	let htmlN = ""
	/*Este*/
	for (let i = 0; i < compE.length; i++) {
		if (i == compE.length-1) {
			htmlE = htmlE + '<h5 class="result"> Comp ' + abc[i] + "-" + abc[0] + ": " + compE[i] + "</h5>"
			} else {
			htmlE = htmlE + '<h5 class="result"> Comp ' + abc[i] + "-" + abc[i+1] + ": " + compE[i] + "</h5>"
			}
	}
	document.getElementById("cEste").innerHTML = '<h4 class="result1">Compensaciones Este:</h4>' + htmlE;
	/*Norte*/
	for (let i = 0; i < compN.length; i++) {
		if (i == compN.length-1) {
			htmlN = htmlN + '<h5 class="result"> Comp ' + abc[i] + "-" + abc[0] + ": " + compN[i] + "</h5>"
			} else {
			htmlN = htmlN + '<h5 class="result"> Comp ' + abc[i] + "-" + abc[i+1] + ": " + compN[i] + "</h5>"
			}
	}
	document.getElementById("cNorte").innerHTML = '<h4 class="result1">Compensaciones Norte:</h4>' + htmlN;
	return
}

/*Mostrar proyecciones corregidas*/
function mostrarProyCor() {
	let proyE = corregirE()
	let proyN = corregirN()
	let htmlE = ""
	let htmlN = ""
	/*Este*/
	for (let i = 0; i < proyE.length; i++) {
		if (i == proyE.length-1) {
			htmlE = htmlE + '<h5 class="result"> Proy ' + abc[i] + "-" + abc[0] + ": " + proyE[i] + "</h5>"
			} else {
			htmlE = htmlE + '<h5 class="result"> Proy ' + abc[i] + "-" + abc[i+1] + ": " + proyE[i] + "</h5>"
			}
	}
	document.getElementById("pEsteC").innerHTML = '<h4 class="result1">Proyeccion Este Corregida:</h4>' + htmlE;
	/*Norte*/
	for (let i = 0; i < proyN.length; i++) {
		if (i == proyN.length-1) {
			htmlN = htmlN + '<h5 class="result"> Proy ' + abc[i] + "-" + abc[0] + ": " + proyN[i] + "</h5>"
			} else {
			htmlN = htmlN + '<h5 class="result"> Proy ' + abc[i] + "-" + abc[i+1] + ": " + proyN[i] + "</h5>"
			}
	}
	document.getElementById("pNorteC").innerHTML = '<h4 class="result1">Proyeccion Norte Corregida:</h4>' + htmlN;
	return
}


/*Mostrar coordenadas*/
function mostrarCoordenada() {
	let coorE = coordenadasE()
	let coorN = coordenadasN()
	let html = ""
	for (let i = 0; i < coorE.length; i++) {
		html = html + '<h5 class="result">' + abc[i] + ": (" + coorE[i] + "; " + coorN[i] + ")" + "</h5>"
	}
	document.getElementById("Coordenadas").innerHTML = '<h4 class="result1">Coordenadas (E; N):</h4>' + html;
	return
}

/*botón reinicio*/
function botonReinicio() {

}

/*todo en 1*/
function calcular() {
	document.getElementById("tittle").innerHTML = '<h4 class="result">Resultados:</h4>';
	document.getElementById("tDatos").classList.toggle("hidden");
	mostrarEangular()
	mostrarAngulos()
	mostrarAzimuts()
	mostrarProyecciones()
	mostrarElineal()
	mostrarPrecision()
	mostrarCompensaciones()
	mostrarProyCor()
	mostrarCoordenada()
	return
}