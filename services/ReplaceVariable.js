

module.exports = function(strings, options){
    // console.log(4,strings,);
    // console.log(5,options);
    return strings.map(string=>{
        return Object.keys(options).reduce((accu,key)=>{
            let value = options[key];
            key = `$${key}`;
            accu.includes(key) && (accu = accu.replace(key,value || "_"));
            return accu;
        },string);
    });
};

