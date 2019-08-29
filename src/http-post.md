# HTTP POST
Compare to HTTP GET, there is a few differences in HTTP POST.
1. Declare POST instead of GET in the first line of request content
2. Declare POST content, use a blank line to separate from header part

There are 3 popular content types. To have a high level overview, below content demonstrates what the POST body looks like for 3 different content types.

### application/json
Examples
```javascript
fetch('/api/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
            firstname: 'lawrence',
            lastname: 'ching'
      })
    })
```

Request Content
```
POST /api/user HTTP/1.1
Host: localhost:8080
Connection: keep-alive
Content-Length: 42
Accept: application/json
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36
Sec-Fetch-Mode: cors
Content-Type: application/json
Origin: http://localhost:8080
Sec-Fetch-Site: same-origin
Referer: http://localhost:8080/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: Idea-fe7adc80=f79c6aac-74a3-41fb-81ed-c9ffe183f414

{"firstname":"lawrene","lastname":"ching"}
```

### application/x-www-form-urlencoded
Examples
```javascript
fetch('/api/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-url-encoded', 'Accept': 'application/json'},
      body: 'firstname=lawrence&lastname=ching'
    })
```

Request Content
```
POST /api/user HTTP/1.1
Host: localhost:8080
Connection: keep-alive
Content-Length: 33
Accept: application/json
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36
Sec-Fetch-Mode: cors
Content-Type: application/x-www-form-url-encoded
Origin: http://localhost:8080
Sec-Fetch-Site: same-origin
Referer: http://localhost:8080/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: Idea-fe7adc80=f79c6aac-74a3-41fb-81ed-c9ffe183f414

firstname=lawrence&lastname=ching
```


### form-data
Examples
```javascript
var formData = new FormData();

formData.append('firstname', 'lawrence');
formData.append('lastname', 'ching');

fetch('/api/user', {
  method: 'POST',
  body: formData
})
```

Request Content
```
POST /api/user HTTP/1.1
Host: localhost:8080
Connection: keep-alive
Content-Length: 248
Sec-Fetch-Mode: cors
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryxUeB9pX0Gf0e8WTo
Accept: */*
Origin: http://localhost:8080
Sec-Fetch-Site: same-origin
Referer: http://localhost:8080/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: Idea-fe7adc80=f79c6aac-74a3-41fb-81ed-c9ffe183f414

------WebKitFormBoundaryxUeB9pX0Gf0e8WTo
Content-Disposition: form-data; name="firstname"

lawrence
------WebKitFormBoundaryxUeB9pX0Gf0e8WTo
Content-Disposition: form-data; name="lastname"

ching
------WebKitFormBoundaryxUeB9pX0Gf0e8WTo--

```

## References
[https://tools.ietf.org/html/rfc7231#section-4.3.3](https://tools.ietf.org/html/rfc7231#section-4.3.3)   
[https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)   
[Forms in HTML documents](https://www.w3.org/TR/html401/interact/forms.html)