# Descriptions

datasets-toolbox are some scripts usefull to generate, transfom and valid large dataset files, not openable with editor
because too large. datasets-toolbox provide also a ping script.

## Generate

### generateDatasetFile

Script to generate a dataset file with a configurable number of rows, using data retrieved randomly in the json file
passed as a parameter

#### How to launch

Launch this command, just update the `outputFilePath`, `inputFilePath` and `expectedLines` env var :

```
cross-env outputFilePath= inputFilePath= expectedLines= node scripts/generate/generateDataset.js
```

Without specifying these variables, the scripts will generate a file of 100,000 lines, using the default data sample,
and generate the file in `dataset/generate` folder.

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

#### How to launch

Launch this command, just update the sourcePath env var :

```
cross-env sourcePath=pathToYourFileWithoutExtension node scripts/transform/convertCsvToJson.js
```

Without sourcePath env var, the script choose the file in dataset folder

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

#### How to launch

Launch this command, just update the sourcePath env var :

```
cross-env sourcePath=pathToYourFileWithoutExtension node scripts/transform/convertObjectByLineToObjectsArray.js
```

Without sourcePath env var, the script choose the file in dataset folder

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

#### How to launch

Launch this command, just update the sourcePath env var :

```
cross-env sourcePath=pathToYourFileWithoutExtension node scripts/transform/transformEveryObjectsInObjectByLine.js
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

#### How to launch

Launch this command, just update the sourcePath env var :

```
cross-env sourcePath=pathToYourFileWithoutExtension node scripts/transform/detectErrorInJsonByLine.js
```

Without sourcePath env var, the script choose the file in dataset folder

## Ping

Launch a ping with your nodeJS network configuration. It's helpfull if you want to check the connectivity between your
node env and an ip (to test network configuration)

#### How to launch

Launch this command, just update the ipToPing env var :

```
cross-env ipToPing= node ./scripts/ping.js
```

Without ipToPing env var, the script ping google DNS by default

# How to use

Clone or download the project, in root folder, launch this command to get dependencies

```
npm install
```

You can test all scripts with npm start scripts available in package.json file or with commands in "How to use" sections.

# Others

Don't hesistate to make issue or PR if needed. You can contact me on tweeter : @Franck_Mahieu 
