import cookie from 'cookie'

export const getCookie = (name) => {
  const cookies = cookie.parse(document.cookie)
  const value = cookies && cookies[name]
  if(value === undefined) return undefined;
  const hasToParse = Boolean((value && value[0] === '{') || value[0] === '[' || value[0] === '"')

  return hasToParse ? JSON.parse(value) : value
}

export const getAllCookies = () => {
    const cookies = cookie.parse(document.cookie)
    return cookies
  }

// export const CookieOptions = {
//     expire: 100,     //number | Date
//     maxAge: 10,     //number
//     domain: "",     //string
//     path: "",       //string
//     secure: false,  //boolean
//     httpOnly: false //boolean
//   }
  
export const setCookie = (name, value, options) => {
    const rawCookie = {}
    rawCookie[name] = value
    rawCookie[name] = JSON.stringify(value)
    document.cookie = cookie.serialize(name, rawCookie[name], options)
  
    return document.cookie
  }

export const removeCookie = (name) => {
    const options = { expires: new Date(1970, 1, 1, 0, 0, 1), maxAge: 0 }
  
    document.cookie = cookie.serialize(name, '', options)
  
    return document.cookie
  }