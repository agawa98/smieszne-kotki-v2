//CAT FACT

async function getCatFact(){
    const res = await fetch("https://catfact.ninja/fact")
    const data = await res.json()
    return data.fact
}

async function insertFactCat(el){
    let fakcik = await getCatFact()
    el.innerText = fakcik + " "
    
    //zastepuje spacje znakiem %20 ktory oznacza spacje w linku w tlumaczu
    while(fakcik.indexOf(" ")>0){
        fakcik=fakcik.replace(" ","%20")
    }

    el.innerHTML += '<a id="factTranslate" target="_blank" href="https://translate.google.pl/?hl=pl&sl=en&tl=pl&text='+fakcik+'">Przetłumacz</a>'

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
    let catID = document.getElementById("catCompBreedSelect").value
    console.log(catID)
    
    getBreedPhoto(catID)

    getBreedInfo(catID)
}

async function getBreedPhoto(catID){
    clearTimeout(getPhotoInt)
    var res = await fetch("https://api.thecatapi.com/v1/images/search?breed_ids="+catID)
    var data = await res.json()
    if(data[0].id == currentPhotoID){
        getBreedPhoto(catID)
    }
    document.getElementById("catCompImg").src = data[0].url
    currentPhotoID = data[0].id

    getPhotoInt = setTimeout(()=>{
        console.log("set " + catID)
        getBreedPhoto(catID)
    },5000)
}


// V V tryb wielu zdjec V V

// var currentKitty
// var currentKitty2
// var kittyArray = []
// var kittyInterval

// function kittyRandom(){
//     let r = Math.floor(Math.random()*kittyArray.length)
//     if(r == currentKitty || r == currentKitty2){
//         kittyRandom()
//     }
//     return r
// }

// async function getBreedPhotos(catID){
//     //czyszczenie
//     clearInterval(kittyInterval)
//     document.getElementById("catCompImg2").src = ""

//     var res = await fetch("https://api.thecatapi.com/v1/images/search?breed_ids="+catID+"&limit=6")
//     var data = await res.json()

//     kittyArray = []

//     for(let i=0; i<data.length; i++){
//         let kittyRatio = data[i].width/data[i].height
//         kittyArray[i] = [data[i].url,kittyRatio.toFixed(2)]
//         console.log(kittyArray[i])
//     }

//     currentKitty = kittyRandom()
//     document.getElementById("catCompImg").src = kittyArray[currentKitty][0] 
//     fitAnotherKitty()

//     kittyInterval = setInterval(() => {
//         currentKitty = kittyRandom()
//         document.getElementById("catCompImg").src = kittyArray[currentKitty][0]
//         fitAnotherKitty()
//     }, 5000);

// }

// //obliczanie totalnej wysokosci czyli wysokosc + margin + padding + border
// function totalHeight(el){
//     return el.clientHeight + el.style.marginLeft + el.style.marginRight + el.style.borderRightWidth + el.style.borderLeftWidth
// }

// function totalWidth(el){
//     return el.clientWidth + el.style.marginTop + el.style.marginBottom + el.style.borderTopWidth + el.style.borderBottomWidth
// }

// function fitAnotherKitty(){
//     let heightLeft = totalHeight(document.getElementById("catCompWrapper")) - totalHeight(document.getElementById("catCompImgWrapper"))
//     let widthLeft = totalWidth(document.getElementById("catCompWrapper")) - totalWidth(document.getElementById("catCompInfoWrapper"))
//     let freeSpaceRatio = widthLeft/heightLeft
//     console.log("fSR: "+freeSpaceRatio + " = " + widthLeft + " / " + heightLeft)

//     for(let i = 0; i<kittyArray.length; i++){

//         //nie moze sie wylosowac ten sam kotek
//         if(i==currentKitty || i==currentKitty2){
//             continue
//         }

//         //wieksze ratio -> zdj jest szersze
//         if(kittyArray[i][1]>freeSpaceRatio){
//             console.log("zmiesci sie")
//             currentKitty2 = i
//             document.getElementById("catCompImg2").style.display = "block"
//             document.getElementById("catCompImg2").src = kittyArray[i][0]
//             return
//         }
//     }
//     //wykonuje sie jesli nie znajdzie zadnego pasujacego zdj

//     document.getElementById("catCompImg2").style.display = "none"

// }

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
    var tekst = "/says/" + document.getElementById("catGenTxtInput").value

    //jesli input jest pusty, to usun parametr z fetcha
    if(tekst=="/says/"){
        tekst=""
    }

    document.getElementById("catGenLoading").style.display = "block"

    fetch("https://cataas.com/cat/"+tag+tekst)
    .then(res=>{
        document.getElementById("catGenLoading").style.display = "none"
        document.getElementById("catGenImg").src = String(res.url)
    })

}

//wsadzenie tagow do selecta
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

document.getElementById("catGenButton").addEventListener("click", async()=>{
    generateCat()
})


//  CAT GALLERY - todo

// if(odleglosc miedzy dolem kompenidum i generatorem jest wieksza niz dajmy 300px oraz user jest na monitorze wikersztm niz 1000 px to wyswietl galerie)


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



//CAT RANDOMIZER

var catPicInt = 0
var data


async function newCatPic(){
    //clickme
    if(document.getElementById("randomCatImgWrapper").contains(document.getElementById("randomCatClickMe"))==true){
        document.getElementById("randomCatClickMe").className = "fade"
        setTimeout(()=>{
            document.getElementById("randomCatClickMe").remove()
        },340)
    }
    

    document.getElementById("randomCatGif").removeEventListener("click", newCatPic)

    document.getElementById("randomCatImg").className = "fade"

    //musialem usuwac i tworzyc element na nowo poniewaz inaczej nie dzialala animacja
    document.getElementById("randomCatImg").remove()
    let cat = document.createElement("img")
    cat.id = "randomCatImg"
    document.getElementById("randomCatImgWrapper").appendChild(cat)




    //wstawianie gifa losujacego kota
    document.getElementById("randomCatGif").src = "img/randomCat/los"+Math.floor(Math.random()*2+1)+".gif"
    

    if(catPicInt==0){
        let res = await fetch("https://api.thecatapi.com/v1/images/search?limit=3")
        
        data = await res.json()
        console.log(data)
    }

    

    
    // odrzucanie zdjec ktore sa bardziej wezsze niz wyzsze (pionowe)
    if(data[catPicInt].width<data[catPicInt].height){
        catPicInt++
        if(catPicInt>=10){
            catPicInt=0
        }
        return newCatPic()
    }


    cat.src = data[catPicInt].url

    //dalem troche wczesniej zeby byl fajny efekt
    setTimeout(()=>{
        document.getElementById("randomCatGif").src = "img/randomCat/end.png"
    },2800)

    setTimeout(()=>{

        //ten classname odpowiada za transformowanie kotka        
        cat.className = "wylosowany"
    }, 3000)

    setTimeout(()=>{
        document.getElementById("randomCatGif").src = "img/randomCat/idle.png"

        //wlaczanie z powrotem losowania
        document.getElementById("randomCatGif").addEventListener("click", newCatPic)
    }, 4000)
    


    catPicInt++
    
    if(catPicInt>=10){
        catPicInt=0
    }
}


var randomCatEvent = document.getElementById("randomCatGif").addEventListener("click",newCatPic)



//  CREDITS

document.getElementById("creditsWrapper").addEventListener("mouseover",()=>{
    document.getElementById("creditsWrapper").classList.remove("noTransition")
})





window.addEventListener("resize",()=>{
    resize(document.getElementById("catGenTxt2"),document.getElementById("catGenTxtInput"), 60, 3)

    resize(document.getElementById("catBreedLabel"), document.getElementById("catCompBreedSelect"), 60, 0)
    
    document.getElementById("randomCatImg").style.height = document.getElementById("randomCatGif").clientHeight + "px"

    document.getElementById("randomCatImgWrapper").style.height = document.getElementById("randomCatGifWrapper").clientHeight + "px"
})

window.addEventListener("load",()=>{    

    

    document.getElementById("randomCatImgWrapper").style.height = document.getElementById("randomCatGifWrapper").clientHeight + "px"

    resize(document.getElementById("catGenTxt2"),document.getElementById("catGenTxtInput"))

    resize(document.getElementById("catBreedLabel"), document.getElementById("catCompBreedSelect"), 60, 0)


    getCatTags()
    
    // dodawanie opcji w wybieraniu rasy
    addOptions()

    //wpisanie fakciku o kotkach
    insertFactCat(document.getElementById("catFactText"))
    setInterval(async()=>{
        insertFactCat(document.getElementById("catFactText"))
    },60000)
})