'use strict'
var gImgs = [
    { id: 1, url: 'img/Gallery/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'img/Gallery/2.jpg', keywords: ['cute', 'dogs'] },
    { id: 3, url: 'img/Gallery/3.jpg', keywords: ['cute', 'Dogs', 'Baby and Dog'] },
    { id: 4, url: 'img/Gallery/4.jpg', keywords: ['cute', 'cat'] },
    { id: 5, url: 'img/Gallery/5.jpg', keywords: ['popular', 'Succsess kid'] },
    { id: 6, url: 'img/Gallery/6.jpg', keywords: ['popular', 'physics'] },
    { id: 7, url: 'img/Gallery/7.jpg', keywords: ['popular', 'Surprise'] },
    { id: 8, url: 'img/Gallery/8.jpg', keywords: ['popular', 'willy wokna'] },
    { id: 9, url: 'img/Gallery/9.jpg', keywords: ['evil', 'evil kid'] },
    { id: 10, url: 'img/Gallery/10.jpg', keywords: ['funny', 'Obama'] },
    { id: 11, url: 'img/Gallery/11.jpg', keywords: ['popular', 'gaymoment'] },
    { id: 12, url: 'img/Gallery/12.jpg', keywords: ['popular', 'you'] },
    { id: 13, url: 'img/Gallery/13.jpg', keywords: ['popular', 'cheers'] },
    { id: 14, url: 'img/Gallery/14.jpg', keywords: ['popular', 'matrix'] },
    { id: 15, url: 'img/Gallery/15.jpg', keywords: ['popular', 'i see', 'sarcastic'] },
    { id: 16, url: 'img/Gallery/16.jpg', keywords: ['funny', 'startrek'] },
    { id: 17, url: 'img/Gallery/17.jpg', keywords: ['popular', 'putin'] },
    { id: 18, url: 'img/Gallery/18.jpg', keywords: ['popular', 'toystory'] },
];
// var gImgs;
var gMeme;
var gIdImg;
var gIdLine;
var gKeys;
var gKeysNumOfImg;
var gSizeFont;
var gCircle;
var gIsCircleDrag;

function renderGvarsInService() {
    gIdImg = 0;
    gIdLine = 0;
    gKeys = ['Celeb', 'Trump', 'Funny', 'Celeb', 'Politic', 'Crazy', 'Animal', 'Baby', 'Trans', 'Lovely', 'Sarcastic', 'ToyStory', 'GoodVibes', 'Shocked'];
}

function UpdateMeme(elImg) {
    var elCanvas = getgElCanvas();
    setSizeOfFont(elCanvas.width);
    gMeme = {
        selectedImgId: elImg.dataset.id,
        selectedLineIdx: 0,
        elImg,
        lines: [{
            id: gIdLine++,
            text: 'I Sometimes eat Shakshuka',
            size: gSizeFont,
            align: 'center',
            color: 'white',
            colorStroke: 'black',
            isSticker: false,
            x: elCanvas.width / 2,
            y: 50,
            rectSize: {
                pos: { x: 0, y: 50 - gSizeFont },
                height: 65,
                width: elCanvas.width - 40
            },
            isDrag: false
        }],
    }
}


function addLineTogMeme(isEmptyLines) {
    if (isEmptyLines) gIdLine = 0;
    if (gMeme.lines.length === 1 && gMeme.lines[0].text === '') return;
    var elCanvas = getgElCanvas();
    var yPos = (gMeme.lines.length === 1) ? elCanvas.height - 20 : elCanvas.height / 2;
    if (gMeme.lines.length === 0) yPos = 50;
    gMeme.lines.push({
        id: gIdLine++,
        text: '',
        size: gSizeFont,
        align: 'center',
        color: 'white',
        colorStroke: 'black',
        x: elCanvas.width / 2,
        y: yPos,
        rectSize: {
            pos: { x: 0, y: yPos - gSizeFont },
            height: 65,
            width: elCanvas.width - 40
        },
        isDrag: false,
        isSticker: false
    })
    if (!isEmptyLines) gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function getPosXToWrite(lineIdx) {
    var elCanvas = getgElCanvas();
    var xPos;
    switch (gMeme.lines[lineIdx].align) {
        case 'start':
            {
                xPos = 50;
                break;
            }
        case 'center':
            {
                xPos = elCanvas.width / 2;
                break;
            }
        case 'end':
            {
                xPos = elCanvas.width - 50;
                break;
            }
    }
    gMeme.x = xPos;
    return xPos;
}

function addSticker(elSticker) {
    var elCanvas = getgElCanvas();
    gMeme.lines.push({
        id: gIdLine++,
        text: '',
        isSticker: true,
        img: elSticker,
        x: elCanvas.width / 3,
        y: elCanvas.height / 3,
        sizeW: 100,
        sizeH: 100,
        size: 100,
        rectSize: {
            pos: { x: elCanvas.width / 3, y: elCanvas.height / 3 },
            height: 107,
            width: elSticker.width + 40
        },
    })
    gMeme.selectedLineIdx = gMeme.lines[gMeme.lines.length - 1].id;
}



function changeIdLines(gMeme) {
    gMeme.lines.forEach(function (line, idx) {
        line.id = idx;
    })
    gIdLine = gMeme.lines.length;
}

function setTextIngMeme(text) {
    if (gMeme.lines[gMeme.selectedLineIdx].isSticker) addLine();
    gMeme.lines[gMeme.selectedLineIdx].text = text;
    writeText(gMeme.selectedLineIdx);
}

function changeSizeToLine(deff) {
    if (gMeme.lines.length === 1 && gMeme.lines[0].text === '') return;
    if (gMeme.lines[gMeme.selectedLineIdx].isSticker) {
        gMeme.lines[gMeme.selectedLineIdx].sizeH += deff;
        gMeme.lines[gMeme.selectedLineIdx].sizeW += deff;
        gMeme.lines[gMeme.selectedLineIdx].rectSize.width += deff;
    } else {
        gMeme.lines[gMeme.selectedLineIdx].size += deff;
        gMeme.lines[gMeme.selectedLineIdx].rectSize.pos.y -= deff;
        gMeme.lines[gMeme.selectedLineIdx].rectSize.height += deff;
    }
}

function changeAlign(align) {
    if (gMeme.lines[gMeme.selectedLineIdx].isSticker) return;
    if (gMeme.lines.length === 1 && gMeme.lines[0].text === '') return;
    gMeme.lines[gMeme.selectedLineIdx].align = align;
    if (align === 'end') { }
    var posX = getPosXToWrite(gMeme.selectedLineIdx);
    gMeme.lines[gMeme.selectedLineIdx].x = posX;
    renderCanvas();
    drawRect(gMeme.lines[gMeme.selectedLineIdx]);
}

function clickChangeColor() {
    if (gMeme.lines[gMeme.selectedLineIdx].isSticker) return;
    var elColor = document.querySelector('.color-input');
    elColor.click();
}

function clickChangeColorStroke() {
    if (gMeme.lines[gMeme.selectedLineIdx].isSticker) return;
    var elColor = document.querySelector('.color-input-stroke');
    elColor.click();
}

function saveMeme() {
    var numOfSaveImg = loadFromStorage('numOfSaveImg');
    if (!numOfSaveImg) {
        saveToStorage('numOfSaveImg', 1);
        numOfSaveImg = 1;
    } else {
        numOfSaveImg++;
    }
    renderCanvas();
    var elCanvas = getgElCanvas();
    var imgContent = elCanvas.toDataURL();
    saveToStorage(`meme${numOfSaveImg}`, [gMeme, imgContent]);
    saveToStorage('numOfSaveImg', numOfSaveImg);
    document.location.href = 'memes.html';
}

function downloadMeme(elLink) {
    renderCanvas();
    var elCanvas = getgElCanvas();
    const imgData = elCanvas.toDataURL()
    elLink.href = imgData
    elLink.download = 'meme';
    saveMeme();
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function setSizeOfFont(canvasWidth) {
    if (canvasWidth > 400) gSizeFont = 50;
    if (canvasWidth > 350) gSizeFont = 45;
    else if (canvasWidth > 300) gSizeFont = 40;
    else gSizeFont = 35;
}

function isHaveStickerInCanvas() {
    return gMeme.lines.some(line => line.isSticker);
}

//Circle function 

function createCircle(pos) {
    gCircle = {
        pos,
        size: 15,
        color: 'blue',
    }
}

function isCircleClicked(clickedPos) {
    const { pos } = gCircle;
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gCircle.size
}

function setCircleDrag(isDrag) {
    gIsCircleDrag = isDrag
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}

// Get Globals Variable

function getgMeme() {
    return gMeme;
}

function getgImgs() {
    return gImgs;
}

function getgKeys() {
    return gKeys;
}

function getgSizeFont() {
    return gSizeFont;
}

function getgCircle() {
    return gCircle;
}

function getgIsCircleDrag() {
    return gIsCircleDrag;
}