function validateRequest(obj) {
  const VALID_METHODS = ['GET', 'POST', 'DELETE', 'CONNECT'];
  if (!obj.hasOwnProperty('method') || !VALID_METHODS.includes(obj.method)) {
    throw new Error('Invalid request header: Invalid Method');
  }

  let uriRegex = /^([a-z.0-9]+|[*])$/;
  if (!obj.hasOwnProperty('uri') || !uriRegex.test(obj.uri)) {
    throw new Error('Invalid request header: Invalid URI');
  }

  let validVersions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
  if (!obj.hasOwnProperty('version') || !validVersions.includes(obj.version)) {
    throw new Error('Invalid request header: Invalid Version');
  }

  let messageRegex = /[<>\\&'"]/g;
  if (!obj.hasOwnProperty('message') || messageRegex.test(obj.message)) {
    throw new Error('Invalid request header: Invalid Message');
  }

  return obj;
}

console.log(
  validateRequest({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: '',
  })
);
