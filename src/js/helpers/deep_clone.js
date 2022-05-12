function deepClone(objDst, obj)
{
  Object.keys(obj).forEach((key) => {
    if (
      typeof obj[key] === 'string' || typeof obj[key] === 'number' ||
      typeof obj[key] === 'null' || typeof obj[key] === 'undefined'
    ) {
      objDst[key] = obj[key];
      return;
    }

    if (typeof obj[key] === 'object' || obj[key] instanceof Array)
    {
      objDst[key] = [...obj[key]];
      return;
    }
    
    objDst[key] = {};
    deepClone(objDst[key], obj[key]);
  });  
}

export function clone(obj)
{
  let objClone = {};
  deepClone(objClone, obj);
  return objClone;
}