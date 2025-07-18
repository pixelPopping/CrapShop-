
function pickItem ({items}){
    return items[Math.floor(Math.random()*items.length)];
}

export default pickItem;