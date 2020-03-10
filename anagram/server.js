let fs = require("fs");
let text = fs.readFileSync("anagram.txt", "utf-8").split(" ");
let dict = {};
for(let i=0; i<text.length; i++) {
    let key = sort(text[i]);
    if(dict[key]===undefined) {
        dict[key] = [];
    }
    dict[key].push(text[i]);

}
let keys = Object.keys(dict);
for(let i=0; i<keys.length; i++){
    let arr = dict[keys[i]];
    if(arr.length>2){
        var str = "";
        for(let j=0; j<arr.length-1; j++){
            str += arr[j]+" - ";
        }
        str += arr[arr.length-1];
        console.log(str);
    }
}

function sort(str) {
    return str.split('').sort().join('');
}