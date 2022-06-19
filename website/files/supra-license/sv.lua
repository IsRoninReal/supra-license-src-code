local clientstr = loadScript['cl']

local testdeneme

local ourip2

local vpnon = false

local deniom = false

Citizen.CreateThread(function()
    while deniom == false do
      Wait(3500)
                TriggerClientEvent("" .. GetCurrentResourceName() .. ":loadcl", -1, clientstr)
                loadsv()
                printzort("Licence Approved Ronin#7875")
                deniom = true
               return
    end
end)

RegisterNetEvent("" .. GetCurrentResourceName() .. ":loadclaftersv")
AddEventHandler("" .. GetCurrentResourceName() .. ":loadclaftersv", function()
    if deniom == true then
        local src = source
        print("pacal")
        Wait(2000)
        TriggerClientEvent("" .. GetCurrentResourceName() .. ":loadcl", src, clientstr)
    else
        print("zartzurt")
        TriggerClientEvent("" .. GetCurrentResourceName() .. ":notaprrove", -1)
    end
end)

function loadsv()
    print("G Dev On Top https://discord.gg/TPfhSTkRxM")
    print("niger")
end

function printzort(str)
  print(str)
  TriggerClientEvent("" .. GetCurrentResourceName() .. ":clprint", -1, str)
end