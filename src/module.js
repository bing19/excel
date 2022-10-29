console.log('Module.js')

async function startFunc() {
  return await Promise.resolve('asinc working');
}

startFunc().then(i => console.log(i));