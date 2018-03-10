var ctx = $("#doughnut").get(0).getContext("2d");
var myNewChart = new Chart(ctx).Doughnut([
    {
        value : 19,
        color : "#34a68f",
        text:'19%'
    },
    {
        value : 18.5,
        color : "#3891a7",
        text:'18.5%'
    },
    {
        value : 9,
        color : "#f26f18",
        text:'9%'
    },
    {
        value : 7.5,
        color : "#f5d22f",
        text:'7.5%'
    },
    {
        value : 6,
        color : "#222a3b",
        text:'6%'

    },
    {
        value : 4.5,
        color : "#3d64d4",
        text:'4.5%'
    },
    {
        value : 2,
        color : "#45dc9a",
        text:'2%'
    },
    {
        value : 1,
        color : "#ef278a",
        text:'1%'
    },
    {
        value : 0.5,
        color : "#cc0e0e",
        text:'0.5%'
    },
    {
        value: 32,
        color:"#ee402f",
        text:'32%'
    },
]);