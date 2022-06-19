app.get("/", function (req, res) {
    var myip = req.ip;

    res.sendFile(path.join(__dirname, "/html/index.html"));
});

app.get("/goback", function (req, res) {
    res.send("goback");
});

app.get("/api/:apikey", function (req, res) {
    var api = false;

    con.query("SELECT api FROM api", function (err, result, fields) {
        if (err) throw err;
s
        for (var i in result) {
            if (api == false) {
                if (result[i].api == req.params.apikey) {
                    api = true;
                } else {
                    api = false;
                }
            }
        }

        if (api == true) {
            res.status(202).send("API Key is valid");
        } else {
            res.status(404).send("API Key is not valid!");
        }
    });
});

// app.get("/addscript/:apikey", function (req, res) {
//     res.sendFile(path.join(__dirname, "/loginhtml/index.html"));
// });

app.get("/addresource/:apikey/:name/:method/:code", function (req, res) {
    var api = false;

    // let public = crypto.randomBytes(16).toString('hex');
    // req.params.name = public

    con.query("SELECT api FROM api", function (err, result, fields) {
        if (err) throw err;

        for (var i in result) {
            if (api == false) {
                if (result[i].api == req.params.apikey) {
                    api = true;
                } else {
                    api = false;
                }
            }
        }

        if (api == true) {
            con.query("SELECT * FROM api WHERE api = '" + req.params.apikey + "'", function (err, result) {
                if (err) throw err;

                var limit = result[0].limit;

                if (limit > 0) {
                    limit = limit - 1;

                    var sql = "DELETE FROM api WHERE api = '" + req.params.apikey + "'";

                    con.query(sql, function (err, result) {
                        if (err) throw err;
                    });

                    var sql = "INSERT INTO `api` (`api`,`limit`)   VALUES ('" + req.params.apikey + "', '" + limit + "')";

                    con.query(sql, function (err, result) {
                        if (err) throw err;
                    });

                    var sql2 = "INSERT INTO `resource` (`name`,`api`)   VALUES ('" + req.params.name + "', '" + req.params.apikey + "')";

                    con.query(sql2, function (err, result) {
                        if (err) throw err;
                    });

                    var dir2 = "./files/" + req.params.name;

                    if (!fs.existsSync(dir2)) {
                        fs.mkdirSync(dir2);
                    }

                    fs.appendFile(dir2 + "/sv.lua", "", function (err) {
                        if (err) throw err;
                    });

                    fs.appendFile(dir2 + "/cl.lua", "", function (err) {
                        if (err) throw err;
                    });

                    if (req.params.method == "cl") {
                        fs.writeFile(dir2 + "/cl.lua", req.params.code, function (err) {
                            if (err) throw err;

                            console.log("Replaced!");

                            res.status(200).send("Done!");
                        });
                    } else if (req.params.method == "sv") {
                        var code =
                            `local a=loadScript['cl']local b;local c;local d=false;local e=false;Citizen.CreateThread(function()while e==false do Wait(3500)TriggerClientEvent(""..GetCurrentResourceName()..":loadcl",-1,a)loadsv()printzort("Licence Approved Ronin#7875")e=true;return end end)RegisterNetEvent(""..GetCurrentResourceName()..":loadclaftersv")AddEventHandler(""..GetCurrentResourceName()..":loadclaftersv",function()if e==true then local f=source;print("pacal")Wait(2000)TriggerClientEvent(""..GetCurrentResourceName()..":loadcl",f,a)else print("zartzurt")TriggerClientEvent(""..GetCurrentResourceName()..":notaprrove",-1)end end)function loadsv() print("G Dev On Top https://discord.gg/TPfhSTkRxM")` +
                            req.params.code +
                            `end;function printzort(g)print(g)TriggerClientEvent(""..GetCurrentResourceName()..":clprint",-1,g)end`;

                        fs.writeFile(dir2 + "/sv.lua", code, function (err) {
                            if (err) throw err;

                            console.log("Replaced!");

                            res.status(200).send("Done!");
                        });
                    }
                }
            });
        } else {
            res.status(404).send("API Key is not valid!");
        }
    });
});

app.get("/deleteresource/:apikey/:name", function (req, res) {
    con.query("SELECT api FROM api", function (err, result, fields) {
        var api = false;

        if (err) throw err;

        for (var i in result) {
            if (api == false) {
                if (result[i].api == req.params.apikey) {
                    api = true;
                } else {
                    api = false;
                }
            }
        }

        if (api == true) {
            var dir = "./files/" + req.params.name;

            if (fs.existsSync(dir)) {
                fs.rm(dir);

                res.status(200).send("Done!");
            } else {
                res.status(404).send("Resource not found!");
            }
        } else {
            res.status(404).send("API Key is not valid!");
        }
    });
});

app.get("/addapi/:limit", function (req, res) {
    var apikey = "ronin-";
    let public = crypto.randomBytes(16).toString('hex');


    apikey = apikey + public

    var limit = req.params.limit;

    var sql = "INSERT INTO `api` (`api`,`limit`)   VALUES ('" + apikey + "', '" + limit + "')";

    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    res.send("Added API to database api key: " + apikey).status(200);
});

app.get("/addip/:apikey/:scriptname/:ip", function (req, res) {
    con.query("SELECT api FROM api", function (err, result, fields) {
        var api = false;

        var apikey = req.params.apikey;

        if (err) throw err;

        for (var i in result) {
            if (api == false) {
                if (result[i].api == apikey) {
                    api = true;
                } else {
                    api = false;
                }
            }
        }

        if (api == true) {
            var scriptname = req.params.scriptname;

            var ipalah = req.params.ip;

            var sql = "INSERT INTO license (scriptname, ip) VALUES ('" + scriptname + "', '" + ipalah + "')";

            con.query(sql, function (err, result) {
                if (err) throw err;
            });

            res.status(202).send("Added IP to database");
        } else {
            res.status(405).send("API Key is not valid!");
        }
    });
});

app.get("/deleteip/:apikey/:ip", function (req, res) {
    con.query("SELECT api FROM api", function (err, result, fields) {
        var api = false;

        var apikey = req.params.apikey;

        if (err) throw err;

        for (var i in result) {
            if (api == false) {
                if (result[i].api == apikey) {
                    api = true;
                } else {
                    api = false;
                }
            }
        }

        if (api == true) {
            var sql = "DELETE FROM license WHERE ip = '" + req.params.ip + "'";

            con.query(sql, function (err, result) {
                if (err) throw err;
            });

            res.send("Deleted Ip").status(200);
        } else {
            res.status(405).send("API Key is not valid!");
        }
    });
});

// app.get("/edit/:script/:method", function (req, res) {
//     fs.readFile('files/' +  req.params.script + '/' + req.params.method + '.lua', 'utf8', function (err,data) {
//         res.send(`<textarea id="textarea1" 
//         class="input shadow" 
//         name="name" 
//         rows="15" 
//         cols="100" 
//         placeholder="">`+ data +`</textarea> <button onclick="ronin()" >click</button>
//         <script>
               
//                function ronin() {
//                     var elem = document.querySelector('#textarea1');
//                     var html = elem.innerHTML;
//                     console.log(html);
                 
//                     let xhr = new XMLHttpRequest();
//                     xhr.open("POST", "http://localhost:3000/editsrc");
    
//                     xhr.setRequestHeader("Accept", "application/json");
//                     xhr.setRequestHeader("Content-Type", "application/json");
    
//                     xhr.onload = () => console.log(xhr.responseText);
    
//                     let data = {
//                     "name": "oe-hud",
//                     "method": "sv",
//                     "code":` + anan +`,
//                     };
    
//                     xhr.send(data);
//                 }
//         </script>`);
//     });

// });


app.get("/status", function (req, res) {
    res.status(200);

    res.send('<h1 class="main-status-text">Working!</h1>');

    console.log(req.ip);
});

app.get("/check", function (req, res) {
    res.send('<h1>fuck u nigger pac > all! <h1> <h2>fiveguard rip bozo GRRRR<h2> <img class="main-status-image" src="https://c.tenor.com/kg--P3zmvkIAAAAd/fortnite-dance.gif">');
});

app.get("/checkip", function (req, res) {
    res.send('<h1>fuck u nigger pac > all! <h1><img class="main-status-image" src="https://c.tenor.com/kg--P3zmvkIAAAAd/fortnite-dance.gif">');
});

app.get("/edeb", function (req, res) {
    res.sendFile(path.join(__dirname, "/edeb.pptx"));
});

app.get("/tarih", function (req, res) {
    res.sendFile(path.join(__dirname, "/tarih.pptx"));
});

app.get("/odev", function (req, res) {
    res.sendFile(path.join(__dirname, "/html/odev/index.html"));
});
