app.post("/addip/:scriptname", function(req,res) {

    con.query("SELECT api FROM api", function (err, result, fields) {

        var api = false;



        var apikey = req.get('authorization');

        

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

            var ipalah = req.body.ip;

        

            var sql = "INSERT INTO license (scriptname, ip) VALUES ('"+ scriptname + "', '" + ipalah + "')";

            con.query(sql, function (err, result) {

              if (err) throw err;

            });



            res.status(202).send("Added IP to database");



            

        } else {

            res.status(405).send("API Key is not valid!");

        }

    });

});



app.post("/check", function (req, res) {

    const fs = require('fs')

    var name = req.body.name;

    var check = false

    if (req.headers["user-agent"] == "FXServer/PerformHttpRequest") {

        con.query("SELECT scriptname, ip FROM license", function (err, result, fields) {

            if (err) throw err;

    

            for (var i in result) {

                if (check == false) {

                    console.log(result[i].ip, req.ip);

                    if (result[i].scriptname == name && result[i].ip == req.ip) {

                        check = true;

                    } else {

                        check = false;

                    }

                }

            }

    

            if (check == true) {

                fs.readFile('files/' + name + '/cl.lua', 'utf8', function (err,cl) {

                    fs.readFile('files/' + name + '/sv.lua', 'utf8', function (err,sv) {

                        var params = {

                            username: "supra-license",

                            avatar_url: "",

                            content: "License Approved",

                            embeds: [

                                {

                                    "title": "Infos",

                                    "color": 15258703,

                                    "thumbnail": {

                                        "url": "",

                                    },

                                    "fields": [

                                        {

                                            "name": "ip:",

                                            "value": req.ip,

                                            "inline": true

                                        },

                                        {

                                            "name": "script name:",

                                            "value": name,

                                            "inline": true

                                        }

                                    ]

                                }

                            ]

                        }



                        fetch('discord webhook', {

                            method: "POST",

                            headers: {

                                'Content-type': 'application/json'

                            },

                            body: JSON.stringify(params)

                        }).then(res => {

                            console.log(res);

                        }) 





                        var allahyok = { cl: cl, sv: sv}

                        var alahyok = JSON.stringify(allahyok)

                        var string = Base64.encode(alahyok)

                        res.status(305);

                        res.send(string)

                    });

                });

            } else {

                var params = {

                    username: "supra-license",

                    avatar_url: "",

                    content: "License Not Approved",

                    embeds: [

                        {

                            "title": "Infos",

                            "color": 15258703,

                            "thumbnail": {

                                "url": "",

                            },

                            "fields": [

                                {

                                    "name": "ip:",

                                    "value": req.ip,

                                    "inline": true

                                },

                                {

                                    "name": "script name:",

                                    "value": name,

                                    "inline": true

                                }

                            ]

                        }

                    ]

                }



                fetch('discord webhok', {

                    method: "POST",

                    headers: {

                        'Content-type': 'application/json'

                    },

                    body: JSON.stringify(params)

                }).then(res => {

                    console.log(res);

                }) 





                res.status(402).send('Sorry!')

            }

    

        });

    } else {

        res.send('<h1>fuck u nigger pac > all! <h1> <h2>fiveguard rip bozo GRRRR<h2> <img class="main-status-image" src="https://c.tenor.com/kg--P3zmvkIAAAAd/fortnite-dance.gif">');

    }

});



app.post("/checkip", function (req, res) {

    const fs = require('fs')

    var name = req.body.name;

    var check = false

    if (req.headers["user-agent"] == "FXServer/PerformHttpRequest") {

        console.log("fivemden geldi")



        con.query("SELECT scriptname, ip FROM license", function (err, result, fields) {

            if (err) throw err;

    

            for (var i in result) {

                if (check == false) {

                    if (result[i].scriptname == name && result[i].ip == req.ip) {

                        check = true;

                    } else {

                        check = false;

                    }

                }

            }

    

            if (check == true) {

                res.send('license approved and running').status(305);

            } else {

                res.send('license not approved :/').status(405);

            }

    

        });

    } else {

        res.send('<h1>fuck u nigger pac > all! <h1> <h2>fiveguard rip bozo GRRRR<h2> <img class="main-status-image" src="https://c.tenor.com/kg--P3zmvkIAAAAd/fortnite-dance.gif">');

    }

});



app.post("/addresource/:api", function(req,res) {

    var api = false;



    con.query("SELECT api FROM api", function (err, result, fields) {

        if (err) throw err;



        var apikey = req.params.api;



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



            con.query("SELECT * FROM api WHERE api = '" +  apikey + "'", function (err, result) {

                if (err) throw err;

                var limit = result[0].limit;

                if (limit > 0 ) {

                    limit = limit - 1;



                    var sql = "DELETE FROM api WHERE api = '" + apikey + "'";

                    con.query(sql, function (err, result) {

                      if (err) throw err;

                    });



                    var sql = "INSERT INTO `api` (`api`,`limit`)   VALUES ('"+apikey+"', '"+limit+"')";



                    con.query(sql, function (err, result) {

                        if (err) throw err;

                    });



                    var sql2 = "INSERT INTO `resource` (`name`,`api`)   VALUES ('"+req.body.name+"', '"+apikey+"')";



                    con.query(sql2, function (err, result) {

                        if (err) throw err;

                    });



        

                    var dir2 = './files/' + req.body.name;

        

                    if (!fs.existsSync(dir2)){

                        fs.mkdirSync(dir2);

                    }

                    

                    fs.appendFile(dir2 + '/sv.lua', "", function (err) {

                        if (err) throw err;

                    });

        

                    fs.appendFile(dir2 + '/cl.lua', "", function (err) {

                        if (err) throw err;

                    });

        

                    if (req.body.method == "cl") {

                        fs.writeFile(dir2 + '/cl.lua', req.body.code, function (err) {

                            if (err) throw err;

                            console.log('Replaced!');

                            res.status(200).send("Done!");

                        });

                    } else if (req.body.method == "sv") {

                        var code = `local a=loadScript['cl']local b;local c;local d=false;local e=false;Citizen.CreateThread(function()while e==false do Wait(3500)TriggerClientEvent(""..GetCurrentResourceName()..":loadcl",-1,a)loadsv()printzort("Licence Approved Ronin#7875")e=true;return end end)RegisterNetEvent(""..GetCurrentResourceName()..":loadclaftersv")AddEventHandler(""..GetCurrentResourceName()..":loadclaftersv",function()if e==true then local f=source;print("pacal")Wait(2000)TriggerClientEvent(""..GetCurrentResourceName()..":loadcl",f,a)else print("zartzurt")TriggerClientEvent(""..GetCurrentResourceName()..":notaprrove",-1)end end)function loadsv() print("G Dev On Top https://discord.gg/TPfhSTkRxM")`+ req.body.code +`end;function printzort(g)print(g)TriggerClientEvent(""..GetCurrentResourceName()..":clprint",-1,g)end`;

        

                        fs.writeFile(dir2 + '/sv.lua', code, function (err) {

                            if (err) throw err;

                            console.log('Replaced!');

                            res.status(200).send("Done!");

                        });

                    }

                }

            });

        } else {

            res.status(305).send("API Key is not valid!");

        }

    });

});


app.post("/api", function(req,res) {

    var api = false;



    con.query("SELECT api FROM api", function (err, result, fields) {

        if (err) throw err;



        var apikey = req.get('authorization');



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

            res.status(202).send("API Key is valid");

        } else {

            res.status(305).send("API Key is not valid!");

        }

    });

});



app.post("/deleteresource/:apikey", function(req,res) {



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

            var dir = './files/' + req.body.name;



            if (fs.existsSync(dir)) {

                fs.rm(dir, { recursive:true }, (err) => {

                    if(err){

                        // File deletion failed

                        console.error(err.message);

                        return;

                    }

                    res.status(200).send("Done!");

                })

                

            } else {

                res.status(305).send("Resource not found!");

            }

        } else {

            res.status(305).send("API Key is not valid!");

        }

    });

});



app.post("/deleteip", function(req,res) {

    con.query("SELECT api FROM api", function (err, result, fields) {

        var api = false;



        var apikey = req.get('authorization')



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

            var sql = "DELETE FROM license WHERE ip = '" + req.body.ip + "'";

            con.query(sql, function (err, result) {

              if (err) throw err;

            });

            res.send("Deleted Ip").status(200);

        } else {

            res.status(305).send("API Key is not valid!");

        }

    });



});



app.post("/status", function(req,res) {

    res.status(200)

    res.send('<h1 class="main-status-text">Working!</h1>');

    console.log(req.ip);

});