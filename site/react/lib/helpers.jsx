
export function truncate(str,len,search=null) {
  if (search) {
    let predicates = {};
    Object.assign(predicates, search.prefix, {"crm": search.predicate, "aat": "http://vocab.getty.edu/aat/"});
    Object.keys(predicates).forEach((key) => {
      let val = predicates[key];
      if (str.includes(val)) {
        str = str.replace(val,`${key}:`);    
      }
    });
  }
  if (str.length <=len) { return str;}

  return `${str.substring(0,len-3)}...`
}