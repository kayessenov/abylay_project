
const isString = (strings, isRequired = true)=> {
    for (let key in strings) {
        if(!strings[key] && isRequired) return {success: false, msg: `Incorrect string "${key}"`};

        if(typeof strings[key] !== 'string') return {success: false, msg: `Incorrect string "${key}"`};
        strings[key] = strings[key].trim();

        if(!strings[key]) return {success: false, msg: `Incorrect string "${key}"`};

        return {success: true, msg: ``};
    }
}
const isInt = () => {
    
}


module.exports = {isString}