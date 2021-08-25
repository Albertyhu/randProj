import React from 'react';

const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export function genLetter (){
    return alpha[Math.floor(Math.random() * 26)]
}


export function GenerateToken (num = 4){
    var token = '';
    var letter = '';

    for(i = 0; i < num; i++){
        letter = genLetter();
        token = token + letter;
    }

    return token;
}