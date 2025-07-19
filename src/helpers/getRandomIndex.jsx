
function wheelRotation ({middleOfSegment, extraRotation, newRotation, rotation, i}) {
    let anglePerItem = 360 / i.length;
    middleOfSegment = i * anglePerItem + anglePerItem / 2;
    extraRotation = 360 * 5 + middleOfSegment;
    newRotation = rotation + extraRotation;
    return newRotation;
}

wheelRotation()


export default wheelRotation;