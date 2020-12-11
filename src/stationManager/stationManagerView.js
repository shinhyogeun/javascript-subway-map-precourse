import { Data } from "../data.js";

export const removeStationManagerHTML = () => {
    const stationHTML = document.querySelector("#station-manager-div")
    if (stationHTML) {
        document.querySelector("body").removeChild(stationHTML);
    }
}

export const addResultToBody = (HTML) => {
    document.querySelector("body").appendChild(HTML)
    addEventToDeleteButton();
}

export const makeStationHTML = (stationRepository) => {
    let stationHTML = document.createElement("div")
    stationHTML.setAttribute("id", "station-manager-div");
    stationHTML.innerHTML = getHTMLAboutStationAdd();
    stationHTML.innerHTML += getHTMLAboutStationTable(stationRepository);
    return stationHTML;
}

const getHTMLAboutStationAdd = () => {
    return `<div>
                <div>역 이름</div>
                <input id = "station-name-input" placeholder="역 이름을 입력해주세요."> 
                <button id = "station-add-button">역 추가</button>
            </div>`;
}

const getHTMLAboutStationTable = (stationRepository) => {
    let HTMLAboutStations = "<div> <h2>🚉 지하철 역 목록</h2>";

    HTMLAboutStations += "<table border=1px id=station-name-table> <th>역 이름</th><th>설정</th>";
    Object.keys(stationRepository).forEach(stationName => {
        HTMLAboutStations += `<tr data-station-name = ${stationName}>
                                    <td>${stationName}</td>
                                    <td><button class="station-delete-button" >삭제</button></td>
                                  </tr>`
    });

    return HTMLAboutStations += "</table> </div>"
}

const addEventToDeleteButton = () => {
    let deleteButtons = document.querySelectorAll(".station-delete-button")

    Array.prototype.forEach.call(deleteButtons, function (button) {
        button.addEventListener("click", function (button) {
            if (confirm("정말로 삭제하시겠습니까?")) {
                Data.removeStation(button.target.parentNode.parentNode.dataset.stationName);
                document.querySelector("#station-name-table tbody").removeChild(this.parentElement.parentElement);
            }
        })
    })
}

export const addStationNameToTable = (stationName) => {
    let addHTML = `<tr data-station-name = ${stationName}>
                        <td>${stationName}</td>
                        <td><button class="station-delete-button">삭제</button></td>
                        </tr>`
    document.querySelector("#station-name-table tbody").innerHTML += addHTML
    addEventToDeleteButton();
}

export const stationNameInputClear = () => {
    document.querySelector("#station-name-input").value = ""
}