const {assoc, map, prop, dissoc, filter, sum, equals, defaultTo, head, intersperse, merge,
  append, uniq, pipe, propOr, isEmpty, isNil, pathSatisfies, dropLast, concat, path, assocPath, dissocPath, split, __,
  join, type, omit, clone, inc, pick, sortWith, descend, ascend} = require('ramda')
import _ from 'lodash'

async function findByKey(model, data) {
  const result = await model.findOne(data);
  return result;
}

const getPopulate = params => {
  try {
    const populate = params.populate ? JSON.parse(params.populate) : {}
    return populate
  } catch (error) {
    return params.populate || ''
  }
}

const getListItem = (model, params) => {
  // console.log(params)
  let pageSize = params.pageSize || ''
  let pageNumber = params.pageNumber || 1
  let skip = pageSize * (pageNumber - 1)
  let query = params.query ? JSON.parse(params.query) : {}
  // console.log(query)
  let sort = params.sort ? JSON.parse(params.sort) : {}
  let populate = getPopulate(params)
  let projection = params.projection ? params.projection : {}
  let promiseList = model.find(query).sort(sort).skip(skip).limit(pageSize * 1).select(projection);

  // console.log({populate, params})
  if(type(populate) === 'String') {
    (params.populate || '').split(',').reduce((acc, val) => acc.populate(convertDeepPopulates(val) || ''), promiseList)
  } else if(!_.isEmpty(populate)) {
    promiseList.populate(populate)
  }
  return Promise.all([promiseList, model.count(query)]);
}

const convertDeepPopulates = (populates) => {
  function getPath (obj, path = 'path') {
    if (isEmpty(obj)) return 'path'
    return !pathSatisfies(y => !!y, path.split('.'), obj) ? path : getPath(obj, pipe(split('.'), dropLast(1), concat(__, ['populate', 'path']), join('.'))(path))
  }

  let arrs = (populates || '').split('|')
  if (arrs.length <= 1) return populates

  let convert = arrs.reduce((acc, val) => {
    let path = getPath(acc)

    const rs = assocPath(path.split('.'), val)(acc)
    // console.log("$$$$$$$$$$$$$$$$$", {path, rs})
    return rs
  }, {})
  // console.log({convert, populate: convert.populate.populate})
  return convert
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
  findByKey,
  getListItem
};
