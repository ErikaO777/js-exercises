export function parseJSON(str){
    try {
        return {success: true, data: JSON.parse(str)};
    }catch (error){
        return {success: false, error: error.message};
    }
}

console.log(parseJSON('{"name": "John", "age": 30}')); 
console.log(parseJSON('{"value": undefined}')); 

// JSON.parse(str)をそのまま文字列と一緒に返すとobject表示になる