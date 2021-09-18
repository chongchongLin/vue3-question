//1星卡,39张
//2星卡,26张
//3星卡，18张
//4星卡,13个
//5星卡,10个

//生成卡片总数
import {
    heroList
} from './heroList.js';

function getCardList(list) {
    let result = [];
    list.forEach((item) => {
        switch (item.level) {
            case 1:
                for (let i = 0; i < 39; i++) {
                    result.push(item);
                }
                break;
            case 2:
                for (let i = 0; i < 26; i++) {
                    result.push(item);
                }
                break;
            case 3:
                for (let i = 0; i < 18; i++) {
                    result.push(item);
                }
                break;
            case 4:
                for (let i = 0; i < 13; i++) {
                    result.push(item);
                }
                break;
            case 5:
                for (let i = 0; i < 10; i++) {
                    result.push(item);
                }
                break;
        }
    })
    return result
}
let cardList = getCardList(heroList);

//查找指定星数的英雄
function levelToHero(level) {
    return heroList.filter((item) => item.level == level)
}

//随机数组
function randomList(list) {
    let num = Math.floor(list.length * Math.random());
    return list[num]
}


const oneFreeHeros = levelToHero(1);
const twoFreeHeros = levelToHero(2);
const threeFreeHeros = levelToHero(3);
const fourFreeHeros = levelToHero(4);
const fiveFreeHeros = levelToHero(5);



export {
    cardList,
    oneFreeHeros,
    twoFreeHeros,
    threeFreeHeros,
    fourFreeHeros,
    fiveFreeHeros,
}