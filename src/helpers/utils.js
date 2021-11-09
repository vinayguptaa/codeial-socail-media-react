export function getFormBody(params) {
    let formBody = []; // example: ['username=vinay', 'password:123']
    for(let property in params) {
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]) // 'vinay gupta' => 'vinay%20gupta'
        formBody.push(encodedKey + '=' + encodedValue);
    }
    
    return formBody.join('&') // 'user%20name=vinay%20gupta&password=123'
}