//CAT FACT

async function getCatFact(){
    const res = await fetch("https://catfact.ninja/fact")
    const data = await res.json()
    return data.fact
}

async function insertFactCat(el){
    let fakcik = await getCatFact()
    el.innerText = fakcik + " "
    
    //zastepuje spacje znakiem %20 ktory oznacza spacje we linku w tlumaczu
    while(fakcik.indexOf(" ")>0){
        fakcik=fakcik.replace(" ","%20")
    }

    el.innerHTML += "<a id='factTranslate' target='_blank' href='https://translate.google.pl/?hl=pl&sl=en&tl=pl&text="+fakcik+"'>Przetłumacz</a>"

}




//CAT PICS

var catPicInt = 0
var data


async function newCatPic(){
    if(catPicInt==0){
        let res = await fetch("https://api.thecatapi.com/v1/images/search?limit=3")
        data = await res.json()
        console.log("asd")
    }
    console.log(data)
    
    document.getElementById("catPic").src = data[catPicInt].url

    catPicInt++
    if(catPicInt>=10){
        catPicInt=0
    }
}


document.getElementById("catPic").addEventListener("click", ()=>{
    newCatPic()
})



//CAT GENERATOR

async function generateCat(){
    var tag = document.getElementById("catGenTagSelect").value
    var tekst = document.getElementById("catGenTxtInput").value

    const res = await fetch("https://cataas.com/cat/"+tag+"/says/"+tekst)

    document.getElementById("catGenImg").src = String(res.url)
}

async function getCatTags(){
    var res = await fetch("https://cataas.com/api/tags")
    var data = await res.json()
    console.log(data)

    for(let i=1; i<data.length; i++){
        let input = document.getElementById("catGenTagSelect")
        let option = document.createElement("option")
        option.value = data[i]
        option.textContent = data[i]
        input.appendChild(option)
    }
}

async function returnTag(){
    var res = await fetch("https://cataas.com/api/tags")
    var data = await res.json()
    for(let i=1; i<data.length; i++){
        console.log(data[i])
        let karp = await fetch("https://cataas.com/cat/"+data[i])
        if(karp == null){
            console.log("delete:  "+data[i])
        }
    }
        
}

function catGenHelp(){
    let box = document.getElementById("catGenHelpBox")
    let icon = document.getElementById("catGenTagSelectQuestion")
    box.style.display = "block"
    box.style.left = window.scrollX+icon.getBoundingClientRect().right - box.clientWidth - icon.clientWidth*2 +"px"
    box.style.top = window.scrollY + icon.getBoundingClientRect().top +"px"

}


document.getElementById("catGenButton").addEventListener("click", async()=>{
    generateCat()
})

document.getElementById("catGenTagSelectQuestion").addEventListener("mouseover", catGenHelp)

document.getElementById("catGenTagSelectQuestion").addEventListener("mouseout",()=>{
    document.getElementById("catGenHelpBox").style.display = "none"
    console.log("asdasd")
} )





//funkcja do dopasowywania szerokosci elementu gdy jeden jest staly a drugi moze byc zmienny

function resize(staly, zmienny, minwidth, marginspace){

    //minwidth: opcjonalny, minimalma szerokosc
    //marginspace: opcjonalny, chodzi o ten margin z prawej miedzy tekstem a inputem UWAGFA: PODAJ LICZBE W PROCENTACH
    if(typeof minwidth === "undefined"){
        minwidth = 0    }
    if(typeof marginspace === "undefined"){
        marginspace = 0
    }

    let stalyParent = document.getElementById(staly.parentElement.id)
    var margincalc

    //obliczanie ile trzeba odjac przy liczeniu width zmiennego zeby wliczyc margin
    if(marginspace!=0){
        margincalc = ((marginspace+3)/100)*stalyParent.clientWidth
        console.log(margincalc)
    }
    
    if((stalyParent.clientWidth - staly.clientWidth-margincalc)<minwidth){
        return
    }
    zmienny.style.width = (stalyParent.clientWidth - staly.clientWidth-margincalc)+"px"
}





window.addEventListener("resize",()=>{
    resize(document.getElementById("catGenTxt2"),document.getElementById("catGenTxtInput"), 60, 3)
})

window.addEventListener("load",()=>{

    resize(document.getElementById("catGenTxt2"),document.getElementById("catGenTxtInput"))

    getCatTags()
    

    //wpisanie fakciku o kotkach
    insertFactCat(document.getElementById("catFactText"))
    setInterval(async()=>{
        insertFactCat(document.getElementById("catFactText"))
    },60000)
})