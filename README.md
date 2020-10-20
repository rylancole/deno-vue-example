# Deno Vue Example

## Set-Up

```
git clone ...
cd deno-vue-example
```

### Requirements

[Install Deno](https://deno.land/).

```
brew install deno
```

[Install Deno File_Server](https://deno.land/manual@v1.4.6/examples/file_server)

```
deno install --allow-net --allow-read https://deno.land/std@0.74.0/http/file_server.ts
```

### Back-End

I have an example back-end set up HERE.

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






