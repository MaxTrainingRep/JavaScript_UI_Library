import $ from "../core";

$.prototype.html = function (content) {
    for (let i = 0; i < this.length; i++){
        if (content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }  

    return this;
};

$.prototype.eq = function (i) {
    const swap = this[i];
    const objLength = Object.keys(this).length;

    for (let i = 0; i < objLength; i++){
        delete this[i];
    }

    this[0] = swap;
    this.length = 1;
    return this;
};

$.prototype.index = function () {
    const parent = this[0].parentNode;
    const childs = [...parent.children];

    const findMyIndex = (item) => {
        return item == this[0];
    };

    return childs.findIndex(findMyIndex);
};

$.prototype.find = function (selector) {
    let numberOfItems = 0;
    let counter = 0;

    const copyObj = Object.assign({}, this);

    for (let i = 0; i < copyObj.length; i++){
        const arr = copyObj[i].querySelectorAll(selector);
        if (arr.length == 0) {
            continue;
        }

        for (let j = 0; j < arr.length; j++){
            this[counter] = arr[j];
            counter++;
        }

        numberOfItems += arr.length;
    }

    this.length = numberOfItems;

    const objLength = Object.keys(this).length;
    for (; numberOfItems < objLength; numberOfItems++){
        delete this[numberOfItems];
    }

    return this;
};

//Поправить функционал closest чтоб при выпадении  null писало что то адекватное//
$.prototype.closest = function (selector) {
    let counter = 0;
    let length = this.length;

    for (let i = 0; i < this.length; i++){
        if (this[i].closest(selector)) {
            this[i] = this[i].closest(selector);
            counter++;
        } else {
            console.error(`This parent Class ${selector} is not found for child Class`);
            length--;
            continue;
        }
    }
    this.length = length;

    const objLength = Object.keys(this).length;
    for (; counter < objLength; counter++){
        delete this[counter];
    }

    return this;
};

$.prototype.siblings = function () {
    let numberOfItems = 0;
    let counter = 0;

    const copyObj = Object.assign({}, this);

    for (let i = 0; i < copyObj.length; i++){
        const arr = copyObj[i].parentNode.children;
     
        for (let j = 0; j < arr.length; j++){
            if (copyObj[i] === arr[j]) {
                continue;
            }

            this[counter] = arr[j];
            counter++;
        }

        numberOfItems += arr.length-1;
    }

    this.length = numberOfItems;

    const objLength = Object.keys(this).length;
    for (; numberOfItems < objLength; numberOfItems++){
        delete this[numberOfItems];
    }

    return this;
};