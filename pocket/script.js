var table, head, item1, item2;

function init() {
    table = document.getElementById('table');
    head = document.getElementById('tableHead');
    item1 = document.getElementById('item1');
    item2 = document.getElementById('item2');
}

function dude() {
    table.className = 'dudeTable';
    head.className = 'dudeHead';
    item1.className = 'dudeItem';
    item2.className = 'dudeItem';
}

function chick() {
    table.className = 'chickTable';
    head.className = 'chickHead';
    item1.className = 'chickItem';
    item2.className = 'chickItem';
}
