let form=document.querySelector("#form");
let input=document.querySelector("input");
let searchButton=document.querySelector("#search");
let cleanButton=document.querySelector("#clean");
let cardDiv=document.querySelector(".card");
runEventListeners()
function runEventListeners(){
    form.addEventListener("submit",search);
    cleanButton.addEventListener("click",clear);
}
function clear(){
    input.value="";
    cardDiv.innerHTML="";
}
function search(e){
    const soz=input.value.trim();
    fetch(`https://api.unsplash.com/search/photos?query=${soz}`,{
        method:"GET",
        headers:{
            Authorization:"Client-ID mLlUQ_phqN4Ga9AdLukxPwkfuyfPz0WLYwP6y4NiYx0"
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        Array.from(data.results).forEach(image=>{
            addImage(image.urls.small);

        })
    })
    .catch((err)=>console.log(err))
    e.preventDefault()
}
function addImage(url){
   
   const div=document.createElement("div");
   div.className="card-wrapper";
   const img=document.createElement("img");
   img.className="list";
   img.setAttribute("src",url);
   
   div.appendChild(img);
   cardDiv.appendChild(div)

}