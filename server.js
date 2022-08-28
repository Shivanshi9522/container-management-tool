const express=require("express")
const app=express()
const {exec}=require("child_process");

app.get("/imgcreat",(req,res)=>{
        let inam=req.query.imagename;
        let filetxt=req.query.filcont;
        console.log(inam);
        console.log(filetxt); 
        exec('cd /project/DockerFiles | touch Dockerfile |echo -e '+filetxt+' >> Dockerfile | docker build -t '+inam+':1.0 .',(err,stdout,stderr)=>{
                        res.send(stdout);
                        console.log(err);
                        console.log(stderr);
        })
})

app.get("/createmyimage",(req,res)=>{
        res.sendFile(__dirname+"/myimage.html");
}) 
app.get("/selectimg",(req,res)=>{
        exec('docker images --format "{{.Repository}}"',(err,stdout,stderr)=>{
                let b=stdout.split("\n");
                b.forEach((imname)=>{
                        res.write("<option>"+imname+"</option>")
                })
                res.send();
        })
})

app.get("/stoped",(req,res)=>{
        let cnam=req.query.t;
        
        exec('docker stop '+cnam,(err,stdout,stderr)=>{
                        console.log(stdout);
                        res.send("<b>"+'Container '+stdout+' has been stopped....'+"</b>");
        })
})
app.get("/stop",(req,res)=>{
        res.sendFile(__dirname+"/staup.html");
})

app.get("/starte",(req,res)=>{
        let cnam=req.query.f;
        
        exec('docker start '+cnam,(err,stdout,stderr)=>{
                        console.log(stdout);
                        res.send("<b>"+'Container '+stdout+' has been started....'+"</b>");
        })
})
app.get("/start",(req,res)=>{
        res.sendFile(__dirname+"/staert.html");
})
app.get("/deme",(req,res)=>{
        let cnam=req.query.e;
        
        exec('docker rm -f '+cnam,(err,stdout,stderr)=>{
                        console.log(stdout);
                        res.send("<b>"+'Container with name'+"<pre>"+stdout+"</pre>"+'has been deleted.....!!'+"</b>");
        })
})
app.get("/deletee",(req,res)=>{
        res.sendFile(__dirname+"/namd.html");
})
app.get("/res",(req,res)=>{
        let iname=req.query.l;
        let iver=req.query.p;
        exec('docker pull '+iname+":"+iver,(err,stdout,stderr)=>{
                        console.log(stdout);
                        res.send("<b>"+"<pre>"+stdout+"</pre>"+"</b>");
        })
        console.log(iname);
        console.log(iver);
})
app.get("/pool",(req,res)=>{
        res.sendFile(__dirname+"/image.html");
})
app.get("/img",(req,res)=>{
        res.write("<b>"+"<h1 style='margin-top:0%;'>"+'List Of all images present here'+"</h1>");
        exec("docker images|tail -n+2",(err,stdout,stderr)=>{
                let a=stdout.split("\n");
                res.write("<table border='5' align='center' width='80%'>");
                res.write("<tr><th>Repository</th><th>Tag</th><th>Image ID</th><th>Created</th><th>Size</th></tr>");

                a.forEach((cdetails)=>{
                        cinfo=cdetails.trim().split(/\s+/)
                        res.write("<tr>"+"<td>"+cinfo[0]+"</td>"+"<td>"+cinfo[1]+"</td>"+"<td>"+cinfo[2]+"</td>"+"<td>"+cinfo[3]+"</td>"+"<td>"+cinfo[4]+"</td>")
                })
                res.write("</table>")
                res.send()    
        })
})
app.get("/del",(req,res)=>{
        exec("docker rm -f $(docker ps -a -q)",(err,stdout,stderr)=>{
                        res.send("<b>"+"<h1 style='margin-top:0%;'>"+'All containers are deleted with id '+"</h1>"+"<pre>"+stdout+"</pre>"+"</b>");
        })
})

app.get("/ps",(req,res)=>{
        res.write("<b>"+"<h1 style='margin-top:0%;'>"+'Containers List'+"</h1>"+"<br /><br /><br />")
        exec("docker ps | tail -n+2",(err,stdout,stderr)=>{
                        let a=stdout.split("\n");
                        res.write("<table border='5' align='center' width='80%'>");
                        res.write("<tr><th>Container ID</th><th>Image Name</th><th>Command</th><th>Container Name</th></tr>");

                        a.forEach((cdetails)=>{
                                cinfo=cdetails.trim().split(/\s+/)
                                res.write("<tr>"+"<td>"+cinfo[0]+"</td>"+"<td>"+cinfo[1]+"</td>"+"<td>"+cinfo[2]+"</td>"+"<td>"+cinfo[cinfo.length-1]+"</td>")
                        })
                        res.write("</table>")
                        res.send()
                        //res.send("<b>"+"<h1 style='margin-top:0%;'>"+'Containers List'+"</h1>"+"<br /><br /><br />"+"<pre>"+stdout+"</pre>"+"</b>");
        })
})
app.get("/run",(req,res)=>{
        let cname=req.query.n;
        let cimage=req.query.m;
        exec('docker run -dit --name '+cname+" "+cimage,(err,stdout,stderr)=>{
                        console.log(stdout);
                        res.send("<b>"+'Container successfully launched ID: '+"<pre>"+stdout+"</pre>"+"</b>");
        })
        console.log(cname);
        console.log(cimage);
})
app.get("/runform",(req,res)=>{
        res.sendFile(__dirname+"/rundocker.html");
})
app.get("/",(req,res)=>{
        res.sendFile(__dirname+"/index.html");
})




app.listen(3002)