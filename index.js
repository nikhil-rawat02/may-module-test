// addSearchToHistory(): This function should add the date to the search history list in the Ui. You need to get the searches array from localstorage and display it as an unordered list in the ui.

// https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}
const apiKey = "bXyKkWLxhMUpfaaGVxWvnOyQCaXi3zj2xAdphL42";
const inputDate = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const list = document.getElementById("search-history");

function updateSearchHistory(localData){
        localData.map((item) => {
            const listItem = document.createElement("li");
            const anchorTag = document.createElement("a");
            anchorTag.innerText = item.date;
            anchorTag.href = "#";

            anchorTag.addEventListener("click", (e)=>{
                e.preventDefault();
                
                const data = JSON.parse(localStorage.getItem("searches"));
        
                data.map((item) => {
                    if(item.date == e.target.innerText){
                        appendOnUI(item);
                    }
                })
            })
            listItem.appendChild(anchorTag);
            list.appendChild(listItem);
        })
    
}

// update UI
function appendOnUI(data) {
    
    const mainTitle = document.querySelector("#current-image-container > h1");
    mainTitle.innerText = "NASA Picture of the Day";

    const image = document.querySelector("#current-image-container > img");
    image.src = data.url;

    const imageTitle = document.querySelector("#current-image-container > h2");
    imageTitle.innerText = "Title : " + data.title;

    const description = document.querySelector("#current-image-container > p");
    description.innerHTML = "Description : <br>" + data.explanation;

}

// get current image of the day
async function getCurrentImageOfTheDay(){
    let  date = new Date().toISOString().split("T")[0];
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
    const data = await response.json();

    appendOnUI(data);
    const localData =JSON.parse(localStorage.getItem("searches"))
    
    if(localData !== null){
        updateSearchHistory(localData);
    }
}
getCurrentImageOfTheDay()

function saveSearch(data){
    const localData =JSON.parse(localStorage.getItem("searches"))

    if(localData == null){
        const arr = [];
        arr.push(data);
        localStorage.setItem("searches", JSON.stringify(arr));
        addSearchToHistory(data.date);
    }else{
        let insert = true;
         localData.forEach((item) => {
            if(item.date == data.date){
                insert = false;
            }
        })
        if(insert){
            localData.push(data);
            localStorage.setItem("searches", JSON.stringify(localData));
            addSearchToHistory(data.date);
        }
    }
}

function addSearchToHistory(date) {
    const listItem = document.createElement("li");
    const anchorTag = document.createElement("a");
    anchorTag.innerText = date;
    anchorTag.href = "#";

    anchorTag.addEventListener("click", (e)=>{
        e.preventDefault();
        
        const data = JSON.parse(localStorage.getItem("searches"));

        data.map((item) => {
            if(item.date == e.target.innerText){
                appendOnUI(item);
            }
        })
    })
    listItem.appendChild(anchorTag);
    list.appendChild(listItem);
}
async function getImageOfTheDay(event){
    event.preventDefault();
    const date  = inputDate.value;
    const dateCheck = new Date().toISOString().split("T")[0];
    if(date === "" || date > dateCheck){
        alert("Enter a valid date")
    }else{
        const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
        const data = await response.json();
        saveSearch(data);
        appendOnUI(data);
    }
    
}