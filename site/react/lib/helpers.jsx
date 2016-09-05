
export function truncate(str,len,url_predicates={}) {
  console.log(url_predicates)

  Object.keys(url_predicates).forEach((key) => {
    let val = url_predicates[key];
    if (str.includes(val)) {
      str = str.replace(val,`${key}:`);    
    }
  });
  if (str.length <=len) { return str;}

  return `${str.substring(0,len-3)}...`
}