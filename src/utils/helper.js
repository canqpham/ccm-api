async function findByKey(model, data) {
  const result = await model.findOne(data);
  return result;
}

export const error400 = () => {
  return this.json(
    new RequestResponse({
      success: false,
      statusCode: 400,
      error: "Bad request"
    })
  );
};
export const error401 = () => {
  return this.json(
    new RequestResponse({
      success: false,
      statusCode: 401,
      error: "Unauthorized"
    })
  );
};
export const error403 = () => {
  return this.json(
    new RequestResponse({
      success: false,
      statusCode: 403,
      error: "Forbidden"
    })
  );
};
export const error404 = () => {
  return this.json(
    new RequestResponse({
      success: false,
      statusCode: 404,
      error: "Not found"
    })
  );
};
export const error408 = () => {
  return this.json(
    new RequestResponse({
      success: false,
      statusCode: 408,
      error: "Request timeout"
    })
  );
};
export const error431 = () => {
  return this.json(
    new RequestResponse({
      success: false,
      statusCode: 431,
      error: "Request Header Fields Too Large"
    })
  );
};
export const error500 = () => {
  return this.json(
    new RequestResponse({
      success: false,
      statusCode: 500,
      error: "Internal server error"
    })
  );
};
export const error501 = () => {
  return this.json(
    new RequestResponse({
      success: false,
      statusCode: 501,
      error: "Not implemented"
    })
  );
};

export default {
  findByKey
};
