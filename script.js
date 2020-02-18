if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready(){
    var sterge = document.getElementsByClassName("cos-sterge")
    for (var i = 0; i < sterge.length; i++) {
        var butonSterge = sterge[i]
        butonSterge.addEventListener("click", stergeRand)
    } 
    var cantitateProdus = document.getElementsByClassName("cos-cantitate")
    for (var i = 0; i < cantitateProdus.length; i++) {
        var cantitateIntrodusa = cantitateProdus[i]
        cantitateIntrodusa.addEventListener("change", cantitateSchimbata)
    }
    var adaugaInCos = document.getElementsByClassName("lista-produs-adauga")
    for (var i = 0; i < adaugaInCos.length; i++) {
        var butonAdauga = adaugaInCos[i]
        butonAdauga.addEventListener("click", adaugatInCos)
    }
    var a = document.getElementsByClassName("modal fade")[0]
    var b = a.getElementsByClassName("modal-dialog")[0]
    var c = b.getElementsByClassName("modal-content")[0]
    var d = c.getElementsByClassName("modal-body")[0]
    d.getElementsByClassName("buton-cumpara")[0].addEventListener("click", cumparaturiEfectuate)
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })
}
function cumparaturiEfectuate(){ 
    alert("cumparat")
    $(".close").click()
    var a = document.getElementsByClassName("modal fade")[0]
    var b = a.getElementsByClassName("modal-dialog")[0]
    var c = b.getElementsByClassName("modal-content")[0]
    var d = c.getElementsByClassName("modal-body")[0]
    var cosProduse = d.getElementsByClassName("cos-produse")[0]
    while (cosProduse.hasChildNodes()) {
        cosProduse.removeChild(cosProduse.firstChild)
    }
    actualizeazaTotal()
}
function adaugatInCos(event) {
    var butonAdauga = event.target
    var listaProdus = butonAdauga.parentElement
    var listaProdusNume = listaProdus.getElementsByClassName("lista-produs-nume")[0].innerText
    var listaProdusPret = listaProdus.getElementsByClassName("lista-produs-pret")[0].innerText
    var listaProdusImagine = listaProdus.getElementsByClassName("lista-produs-imagine")[0].src
    produsAdaugatInCos(listaProdusNume, listaProdusPret, listaProdusImagine)
    actualizeazaTotal()
}
function produsAdaugatInCos(listaProdusNume, listaProdusPret, listaProdusImagine) {
    var cosRand = document.createElement("div")
    cosRand.classList.add("cos-rand")
    var a = document.getElementsByClassName("modal fade")[0]
    var b = a.getElementsByClassName("modal-dialog")[0]
    var c = b.getElementsByClassName("modal-content")[0]
    var d = c.getElementsByClassName("modal-body")[0]
    var cosProduse = d.getElementsByClassName("cos-produse")[0]
    var verificaProdus = cosProduse.getElementsByClassName("cos-produs")
    for (var i = 0; i < verificaProdus.length; i++) {
        if (verificaProdus[i].innerText == listaProdusNume) {
            alert("deja adaugat")
            return
        }
    }
    var cosRandContinut = `
            <button class="cos-sterge">sterge</button>
            <span class="cos-produs">${listaProdusNume}</span>
            <img src="${listaProdusImagine}" width="50" height="50">
            <span class="cos-pret">${listaProdusPret}</span>
            <input class="cos-cantitate" type="number" value="1"> 
        `
    cosRand.innerHTML = cosRandContinut
    cosProduse.append(cosRand)
    cosRand.getElementsByClassName("cos-sterge")[0].addEventListener("click", stergeRand)
    cosRand.getElementsByClassName("cos-cantitate")[0].addEventListener("change", cantitateSchimbata)
    
}
function cantitateSchimbata(event){
    var cantitateIntrodusa = event.target
    if (isNaN(cantitateIntrodusa.value) || cantitateIntrodusa.value <= 0) {
        cantitateIntrodusa.value = 1
    }
    actualizeazaTotal()
    console.log("faf")
}
function stergeRand(event){
    var butonStergeClicked = event.target
    butonStergeClicked.parentElement.remove()
    actualizeazaTotal()
}
function actualizeazaTotal(){
    var a = document.getElementsByClassName("modal fade")[0]
    var b = a.getElementsByClassName("modal-dialog")[0]
    var c = b.getElementsByClassName("modal-content")[0]
    var d = c.getElementsByClassName("modal-body")[0]
    var x = d.getElementsByClassName("cos-produse")[0]
    var y = x.getElementsByClassName("cos-rand")
    var total = 0
    for (var i = 0; i < y.length; i++) {
        var z = y[i]
        var pret = parseFloat(z.getElementsByClassName("cos-pret")[0].innerText.replace(" lei",""))
        console.log(pret)
        var cantitate = z.getElementsByClassName("cos-cantitate")[0].value
        console.log(cantitate)
        total = total + (pret * cantitate)
    }
    total = Math.round(total * 100) / 100
    d.getElementsByClassName("cos-total-pret")[0].innerText = total + " lei"
}

