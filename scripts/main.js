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

    el.innerHTML += '<a id="factTranslate" target="_blank" href="https://translate.google.pl/?hl=pl&sl=en&tl=pl&text='+fakcik+'">Przetłumacz</a>'

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



//CAT COMPENDIUM

var breeds = [['abys','Abysiński'],['acur','American Curl'],['abob','Amerykański Bobtail'],['asho','Amerykański krótkowłosy'],['awir','Amerykański szorstkowłosy'],['tang','Angora Turecka'],['amau','Arabski Mau'],['amis','Australian Mist'],['bali','Balijski'],['bamb','Bambino'],['beng','Bengalski'],['birm','Birmański'],['bomb','Bombajski'],['bslo','Brytyjski długowłosy'],['bsho','Brytyjski krótkowłosy'],['bure','Burmski'],['buri','Burmilla'],['cspa','California Spangled'],['ctif','Chantilly-Tiffany'],['chau','Chausie'],['chee','Cheetoh'],['csho','Colorpoint krótkowłosy'],['crex','Cornish Rex'],['cymr','Cymric'],['cypr','Cypryjski'],['drex','Devon Rex'],['dons','Doński sfinks'],['lihu','Dragon Li'],['emau','Egipski Mau'],['aege','Egejski'],['esho','Egzotyczny'],['hbro','Hawański'],['hima','Himalajski'],['jbob','Japoński Bobtail'],['java','Jawajski'],['char','Kartuski'],['khao','Khao Manee'],['kora','Korat'],['kuri','Kurylski Bobtail'],['lape','LaPerm'],['mcoo','Maine Coon'],['manx','Manx'],['munc','Munchkin'],['nebe','Nebelung'],['norw','Norweski leśny'],['ocic','Ocicat'],['orie','Orientalny'],['pers','Perski'],['pixi','Pixie-bob'],['raga','Ragamuffin'],['ragd','Ragdoll'],['rblu','Rosyjski niebieski'],['sava','Savannah'],['sfol','Szkocki zwisłouchy'],['srex','Selkirk Rex'],['siam','Syjamski'],['sibe','Syberyski'],['sing','Singapurski'],['snow','Snowshoe'],['soma','Somalijski'],['sphy','Sfinks'],['tonk','Tonkijski'],['toyg','Toyger'],['tvan','Turecki van'],['ycho','York Chocolate']]

var currentPhotoID = "asdasda"
var getPhotoInt

function addOptions(){
    for(let i = 0; i<breeds.length; i++){
        let select = document.getElementById("catCompBreedSelect")
        let option = document.createElement("option")
        option.className = "breed"
        option.value = breeds[i][0]
        option.innerText = breeds[i][1]
        
        select.appendChild(option)
    }
}

async function showInfo(){
    clearInterval(getPhotoInt)
    let catID = document.getElementById("catCompBreedSelect").value
    console.log(catID)
    
    getBreedPhoto(catID)
    getPhotoInt = setInterval(async ()=>{
        getBreedPhoto(catID)
    }, 3000)

    getBreedInfo(catID)
}

async function getBreedPhoto(catID){
    var res = await fetch("https://api.thecatapi.com/v1/images/search?breed_ids="+catID)
    var data = await res.json()
    if(data[0].id == currentPhotoID){
       //  console.log(document.getElementById("catCompWrapper").clientHeight + " < "+data[0].height)                                   TODO
        getBreedPhoto(catID)
    }
    document.getElementById("catCompImg").src = data[0].url
    currentPhotoID = data[0].id
}

async function getBreedInfo(catID){
    var res = await fetch("https://api.thecatapi.com/v1/breeds/"+catID)
    var data = await res.json()
    
    document.getElementById("catCompOrigin").innerText = data.origin
    document.getElementById("catCompDesc").innerText = data.description
}


document.getElementById("catCompBreedSelect").addEventListener("change",showInfo)


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

    for(let i=3; i<data.length-1; i++){
        let input = document.getElementById("catGenTagSelect")
        if(data[i].includes(" ")==false){
            let option = document.createElement("option")
            option.value = data[i]
            option.textContent = data[i]
            input.appendChild(option)
        }
        
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



// przycisk pokazujacy ze nie ma danego tagu dla kota

// function catGenHelp(){
//     let box = document.getElementById("catGenHelpBox")
//     let icon = document.getElementById("catGenTagSelectQuestion")
//     box.style.display = "block";
    
//     box.style.left = window.scrollX+icon.getBoundingClientRect().right - box.clientWidth - icon.clientWidth*2 +"px"
//     box.style.top = window.scrollY + icon.getBoundingClientRect().top +"px"

// }


// document.getElementById("catGenButton").addEventListener("click", async()=>{
//     generateCat()
// })

// document.getElementById("catGenTagSelectQuestion").addEventListener("mouseover", catGenHelp)

// document.getElementById("catGenTagSelectQuestion").addEventListener("mouseout",()=>{
//     document.getElementById("catGenHelpBox").style.display = "none";
// } )





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
    
    // dodawanie opcji w wybieraniu rasy
    addOptions()

    //wpisanie fakciku o kotkach
    insertFactCat(document.getElementById("catFactText"))
    setInterval(async()=>{
        insertFactCat(document.getElementById("catFactText"))
    },60000)
})