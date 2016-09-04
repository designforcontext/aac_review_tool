
export function truncate(str,len) {
  if (str.length <=len) { return str;}
  return `${str.substring(0,len-3)}...`
}