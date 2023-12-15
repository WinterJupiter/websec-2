let url = '/rasp?groupId=531030143';
let week;

function changeWeek(flag) {
    let count = url.indexOf("&");
    if (count !== -1) {
        url = url.slice(0, count);
    }
    if (flag) { url += "&selectedWeek="+ (week + 1)}
    else { url += "&selectedWeek="+ (week - 1)}
    updateData(url);
}

function updateData(currentUrl) {
    url = currentUrl;
    fetch(currentUrl)
        .then((data) => data.json()).then((res) => {
            generateSchedule(res);
            console.log(res);
            week = parseInt(res.currentWeek);
        })
}

fetch('/groupsAndTeachers')
    .then((data) => data.json())
    .then((res) => {
        let strings = document.getElementById("searchList");

        for (let group of res.groups) {
            let elementGroup = document.createElement("option");
            elementGroup.setAttribute("value", group.name);
            elementGroup.innerHTML = group.link;
            strings.appendChild(elementGroup);
        }

        for (let teacher of res.teachers) {
            let elementTeacher = document.createElement("option");
            elementTeacher.setAttribute("value", teacher.name);
            elementTeacher.innerHTML = teacher.link;
            strings.appendChild(elementTeacher);
        }
    })

function generateSchedule(data) {
    let table = document.querySelector("#scheduleBody");
    for (let child of table.childNodes) {
        table.removeChild(child);
    }
    let header = table.insertRow();
    header.insertCell().appendChild(document.createTextNode("Время"));
    header.classList.add("tableHead");
    let count = 0;
    for (let headCell of data.date) {
        let cell = header.insertCell();
        cell.classList.add(`column${count}`);
        count++;
        cell.appendChild(document.createTextNode(headCell.replace(/\./g, '').replace(/\d/g, '')));
        cell.appendChild(document.createElement("br"));
        cell.appendChild(document.createTextNode(headCell.replace(/[^.\d]/g, '')));
    }
    for (let i = 0; i < data.time.length; i++) {
        let row = table.insertRow();
        let timeCell = row.insertCell();
        timeCell.appendChild(document.createTextNode(data.time[i].substr(0, 6)));
        timeCell.appendChild(document.createElement("br"));
        timeCell.appendChild(document.createTextNode(data.time[i].substr(6)));
        for (let j = 0; j < 6; j++) {
            let cell = row.insertCell();
            cell.classList.add(`column${j}`);
            if (data.daySchedule[j].subject === null) {
                continue;
            }
            let cellData = data.daySchedule[j];
            cell.appendChild(document.createTextNode(cellData.subject));
            cell.appendChild(document.createElement("br"));
            cell.appendChild(document.createTextNode(cellData.place));
            cell.appendChild(document.createElement("br"));
            let parsedGroupsAndTeachers = cellData.groups;
            parsedGroupsAndTeachers.push(cellData.teacher);
            for (let groupOrTeacher of parsedGroupsAndTeachers) {
                let groupOrTeacherInfo = JSON.parse(groupOrTeacher);
                if (groupOrTeacherInfo.link === null) {
                    continue;
                }
                let linkElem = document.createElement("a");
                linkElem.innerHTML = groupOrTeacherInfo.name;
                linkElem.addEventListener("click", () => updateData(groupOrTeacherInfo.link));
                linkElem.classList.add("groupLink");
                cell.appendChild(linkElem);
                cell.appendChild(document.createElement("br"));
            }
        }
        data.daySchedule = data.daySchedule.slice(data.daySchedule.length >= 6 ? 6 : data.daySchedule.length);
    }
}

updateData(url);
