# Toolbox
Toolbox are some scripts usefull to process, transfom and valid large dataset files not openable with editor, because too large.
Toolbox provide also a ping script. 

## Transform
### convertCsvToJson
Convert csv file with ";" delimiters to an array of json in an other file, like this : 
```
description;title
value;title
value2;title2
```
to
```
[
    {"description":"value","title":"title"},
    {"description":"value2","title":"title2"},
]
```

### convertObjectByLineToObjectsArray
Convert an object by line file to an array of json in an other file, like this : 
```
{"key": "value"}
{"key2": "value2"}
```
to  
```
[
    {"key": "value"},
    {"key2": "value2"}
]
```

### transformEveryObjectsInObjectByLine
Transform every objects in object by line file to transformed object by line, in an other file, like this 
(for an add date in each object example) : 
```
{"key": "value"}
{"key2": "value2"}
```
to  
```
{"key":"value","date":"2021-01-25T20:19:31.967Z"}
{"key2":"value2","date":"2021-01-25T20:19:31.968Z"}
```

## Validation
### detectErrorInJsonByLine
Iterate over each objects in object by line file to log every not parsable objects, like
```
{"key": "value"}
{"key2": "value2", "key3":}
{"key4": "value2", "key5":}

```
generate this logs :
```
This line is not parsable : {"key2": "value2", "key3":}
This line is not parsable : {"key4": "value2", "key5":}
```

## Ping
Launch a ping with your nodeJS network configuration.
It's helpfull if you want to check the connectivity between your node env and an ip (to test network configuration)
 
 
# How to use
Clone or download the project, in root folder, launch this command to get dependencies
```
npm install
```

You can test all scripts with npm start scripts available in package.json file

## Transform
### convertCsvToJson
Launch this command, just update the sourcePath env var :  
```
cross-env sourcePath=pathToYourFileWithoutExtension node scripts/transform/convertCsvToJson.js
```
Without sourcePath env var, the script choose the file in dataset folder

### convertObjectByLineToObjectsArray
Launch this command, just update the sourcePath env var :  
```
cross-env sourcePath=pathToYourFileWithoutExtension node scripts/transform/convertObjectByLineToObjectsArray.js
```
Without sourcePath env var, the script choose the file in dataset folder

### transformEveryObjectsInObjectByLine
Launch this command, just update the sourcePath env var :  
```
cross-env sourcePath=pathToYourFileWithoutExtension node scripts/transform/transformEveryObjectsInObjectByLine.js
```
Without sourcePath env var, the script choose the file in dataset folder

## Validation
### detectErrorInJsonByLine
Launch this command, just update the sourcePath env var :  
```
cross-env sourcePath=pathToYourFileWithoutExtension node scripts/transform/detectErrorInJsonByLine.js
```
Without sourcePath env var, the script choose the file in dataset folder

## Ping
Launch this command, just update the ipToPing env var :  
```
cross-env ipToPing= node ./scripts/ping.js
```
Without ipToPing env var, the script ping google DNS by default

# Others
Don't hesistate to make issue or PR if needed.
You can contact me on tweeter : @Franck_Mahieu 
