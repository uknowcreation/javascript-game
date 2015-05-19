function DESC(a, b)
{
    a = a[1];
    b = b[1];
    if (a > b)
        return -1;
    if (a < b)
        return 1;
    return 0;
}

function ASC(a, b) {
    a = a[1];
    b = b[1];
    if (a > b)
        return 1;
    if (a < b)
        return -1;
    return 0;
}



function sortTable(idTable, column, order) {
    mybody = document.getElementById(idTable).getElementsByTagName('tbody')[0];
    lines = mybody.getElementsByTagName('tr');
    var sorter = new Array();
    sorter.length = 0;
    var i = -1;
    while (lines[++i]) {
        sorter.push([lines[i], lines[i].getElementsByTagName('td')[column].innerHTML]);
    }
    sorter.sort(order);
    j = -1;
    while (sorter[++j]) {
        mybody.appendChild(sorter[j][0]);
    }

}
