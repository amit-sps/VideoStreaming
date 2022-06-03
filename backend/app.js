const http=require("http");
const fs=require("fs");
const path = require("path");
const server=http.createServer((req,res)=>{
    if(req.url==="/"){
        console.log("requested");
        res.write("Home Page!")
        res.end();
    }
    else if(req.url==="/data"){
        let i=0
        const {range}=req.headers
        const videopath=path.join(__dirname,"../videos/video.mp4")
        const videoSize=fs.statSync(videopath).size
       const chinkSize=1+1e+6;
       console.log(`The range : ${range}`)
    // The uppercase counterpart \D (non-digit) matches any single character that is not a digit (same as [^0-9] ).
       const start=Number(range.replace(/\D/g,""))
       const end=Math.min(start+chinkSize,videoSize-1)
       console.log(`Val1 : ${start+chinkSize}   val2 : ${videoSize-1}`)
       console.log(`End : ${end}`)
       const contentLength=end-start+1;
       console.log(`Content Length : ${contentLength}`)
       const headers={
           "Content-Range":`bytes ${start}-${end}/${videoSize}`,
           "Accept-Ranges":`bytes`,
           "Content-Length":contentLength,
           "Content-Type":"video/mp4"

       }
       res.writeHead(206,headers)
       const videoStream=fs.createReadStream(videopath,{start,end})
       videoStream.on("data",()=>{
           i++;
           console.log("data"+i)
       })
       videoStream.pipe(res)
    }
    else{
        res.write("invalid Route !");
        res.end();
    }
});
server.listen(5000,()=>{
    console.log(`server is running on http://localhost:5000`)
})
