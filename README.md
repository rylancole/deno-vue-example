# Deno Vue Example

## Set-Up

```
git clone https://github.com/rylancole/deno-vue-example
cd deno-vue-example
```

### Requirements

[Install Deno](https://deno.land/). This can be done with any of the following commands (depending on OS):

```
curl -fsSL https://deno.land/x/install/install.sh | sh  
iwr https://deno.land/x/install/install.ps1 -useb | iex  
brew install deno  
choco install deno  
scoop install deno  
cargo install deno
```

[Install Deno File_Server](https://deno.land/manual@v1.4.6/examples/file_server) using Deno.

```
deno install --allow-net --allow-read https://deno.land/std@0.74.0/http/file_server.ts
```

### Back-End

I have an example back-end set up here: [deno-oak-rest-api](https://github.com/rylancole/deno-oak-rest-api)

## Run

Compile
```
deno fmt & deno bundle ./src/main.ts ./src/index.js 
```

Serve  
_make sure the back-end is running first_
```
file_server src --host "127.0.0.1" --port 3000 
```

Now you should be running on http://localhost:3000






