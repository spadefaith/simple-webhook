

module.exports = function(string, options){

    return Object.keys(options).reduce((accu,key)=>{
        let value = options[key];
        key = `$${key}`;
        accu.includes(key) && (accu = accu.replace(key,value || "_"));
        return accu;
    },string);
};