
const p = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('aaa')
  }, 3000)
})
let loading = true
p.then(res => {
  loading = false
  console.log('resolve')
})
p.then(res => {
  console.log('resolve')
  // return res
}).then((res)=>{
  console.log('resolve',res)
}).catch(e=>console.log(e))


// instance.ready().then(res=>{
//   axios.get('http://www.baidu.com').then(rep=>{

//   }).catch(e=>console.log(e))
// })
