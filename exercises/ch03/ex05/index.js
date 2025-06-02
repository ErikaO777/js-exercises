//正規表現 (LF) \n
//Windowsで使われる改行コード（CR+LF）\r\n

export function convertToCRLF(msg){ 
    return msg.replace(/\n/, '\r\n');
}

export function convertToLF(msg){
    return msg.replace(/\r\n/, '\n');   
}

