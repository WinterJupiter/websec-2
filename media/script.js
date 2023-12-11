let url = '/rasp?groupId=531030143';
let week;
let day;

function changeWeek(flag) {
    let count = 0;
    while (url[count] !== "&" && count <= 23) count++;
    if (url[count] !== "&") {
        if (flag) { url += `&selectedWeek=${week + 1} + ""` }
        else { url += `&selectedWeek=${week - 1} + ""` }
    } else {
        url = url.slice(0, url.length - (week > 9 ? 2 : 1));
        if (flag) { url += week + 1 + "" }
        else { url += week - 1 + "" }
    }
}
