# MapleStory-AppScript-Library
You can get information about MapleStory(KMS) characters on Google Sheets using AppScript.

- Script ID: `AKfycbxIygG4WczPUKaPaEuSoaJ88RwyFUCjasjIo_Yiy69yHsyMfd8ivr4vmE5J69ZL-tFa`
- Library URL: https://script.google.com/macros/library/d/1Ky8cCVVSEQzVCos6vGkuG77eHqGO9E90IgjhSYjPepKF7pdiV2r6I353/2

# Adding the library to your project
MapleStory-AppScript-Library is available as a script library. This is how you add it to your project:

1. Select "Resources" > "Libraries..." in the Google Apps Script editor. 
1. Enter the project key (`AKfycbxIygG4WczPUKaPaEuSoaJ88RwyFUCjasjIo_Yiy69yHsyMfd8ivr4vmE5J69ZL-tFa`) in the "Find a Library" field, and choose "Select".
1. Select the highest version number, and choose MapleStory as the identifier.
1. Press Save. You can now use the MapleStory library in your code.

# Usage
```javascript
let characterName = "타락파워전사"
let characterRankingURL = MapleStory.getRankingUrl(characterName);
Logger.log(characterRankingURL);
// https://maplestory.nexon.com/Common/Character/Detail/타락파워전사?p=xxxxxxxxxxxxxxxxxxxxxxxxx
```


## 구글 시트에서 농장 정보 업데이트

```javascript
function updateFarmInfos() {
  let cols = {
    타락파워전사: 'A',
    번개의신vv:	'B',
  }

  let rows = {
    농장레벨: '2',
    와르: '3',
  }
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  for (const [characterName, col] of Object.entries(cols)) {
    let charInfo = null;
    try {
      charInfo = getBasicCharacterInfo(characterName);
    } catch (error) {
      Logger.log(error, characterName);
      continue;
    }

    Logger.log(characterName);
    Logger.log(charInfo);
    
    for (const [key, row] of Object.entries(rows)) {
      let value = charInfo.농장[key];
      let cell = col + row;
      
      var range = spreadsheet.getRange(`농장!${cell}:${cell}`);
      let before = range.getValues();
      range.setValue(value);
      let after = range.getValues();
      Logger.log(`${cell} : ${before} -> ${after}`);
    }
  }
  
  // 업데이트 일시 기록
  let timeCell = spreadsheet.getRange('농장!C1');   // <- "농장" 시트의 C1 셀에 현재 날짜/시간 기록
  let now = new Date();
  timeCell.setValue(now.toLocaleString());
};
```

## 심볼 정보 업데이트
```javascript
function updateArcaneSymbols() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  let firstCharacterNameCell = spreadsheet.getRange('심볼!B3');
  let firstRegionCell = spreadsheet.getRange('심볼!C3');
  let firstLevelCell = spreadsheet.getRange('심볼!D3');
  let firstExpCell = spreadsheet.getRange('심볼!E3');

  let characterNameCell = firstCharacterNameCell;
  let regionCell = firstRegionCell;
  let levelCell = firstLevelCell;
  let expCell = firstExpCell;

  // 캐릭터명이 빈 칸이 나올 때까지 아래로 계속
  let arcaneInfos = null;
  while (regionCell.getValue()) {
    Logger.log(`--------------------------------------------------------------------------------`);
    Logger.log(`characterNameCell: row=${characterNameCell.getRow()}, value=${characterNameCell.getValue()}`);
    Logger.log(`regionCell: row=${regionCell.getRow()}, value=${regionCell.getValue()}`);
    
    let characterName = characterNameCell.getValue();
    if (characterName) {
      try {
        arcaneInfos = getArcaneSymbolByName(characterName);
      } catch (error) {
        // 랭킹 정보가 없습니다.
        Logger.log(error, characterName);
        arcaneInfos = null;
      }
      Logger.log(`arcaneInfos = ${JSON.stringify(arcaneInfos)}`);
    }

    let region = regionCell.getValue();
    try {
      let arcane = getDictFromDictListByIncludingKeyValue(arcaneInfos, '지역', region);
      levelCell.setValue(arcane.성장레벨);
      expCell.setValue(arcane.성장경험치);
      Logger.log(`${region} : 레벨->${arcane.성장레벨}, 경험치->${arcane.성장경험치}`);
    } catch (error) {
      Logger.log(error, characterName, region);
      levelCell.setValue('-');
      expCell.setValue('-');
    }
  
    // 한 칸 아래 (다음 Row)
    characterNameCell = characterNameCell.offset(1, 0);
    regionCell = regionCell.offset(1, 0);
    levelCell = levelCell.offset(1, 0);
    expCell = expCell.offset(1, 0);
  }

  let timeCell = spreadsheet.getRange('심볼!D2:F2');
  let now = new Date();
  timeCell.setValue(now.toLocaleString());
};
```

## 메소 정보 업데이트
```javascript
function updateMeso() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  var firstCharacterLevelCell = spreadsheet.getRange(`메소!B3`);
  var firstCharacterNameCell = spreadsheet.getRange(`메소!C3`);
  var firstCharacterMesoCell = spreadsheet.getRange(`메소!D3`);
  var firstCharacterStorageMesoCell = spreadsheet.getRange(`메소!E3`);

  var characterNameCell = firstCharacterNameCell;
  var characterMesoCell = firstCharacterMesoCell;
  var characterStorageMesoCell = firstCharacterStorageMesoCell;
  var characterLevelCell = firstCharacterLevelCell;

  // 캐릭터명이 빈 칸이 나올 때까지 아래로 계속
  while (characterNameCell.getValue()) {
    var characterName = characterNameCell.getValue();
    Logger.log(`characterName : ${characterName}`);

    try {
      let charInfo = getBasicCharacterInfo(characterName);
      characterMesoCell.setValue(charInfo.스탯.메소);
      characterLevelCell.setValue(charInfo.상단.레벨);

      let storageMeso = getStorageMeso(characterName);
      characterStorageMesoCell.setValue(storageMeso);
      Logger.log(`${characterName} -> 메소: ${charInfo.스탯.메소} / 창고메소: ${storageMeso}`);
    } catch (error) {
      Logger.log(error); // '랭킹정보가 없습니다.'
    }
    
    // 한 칸 아래 (다음 Row)
    characterNameCell = characterNameCell.offset(1, 0);
    characterMesoCell = characterMesoCell.offset(1, 0);
    characterStorageMesoCell = characterStorageMesoCell.offset(1, 0);
    characterLevelCell = characterLevelCell.offset(1, 0);
  }

  let timeCell = spreadsheet.getRange('메소!D2:E2');
  let now = new Date();
  timeCell.setValue(now.toLocaleString());
};
```

## 유니온 정보 업데이트
```javascript
function updateUnionInfos() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  let cols = {
    캐릭터명: 'B',
    유니온레벨: 'C',
    공격대전투력: 'D'
  };
  let rows = {
    header: 3,
    first: 4
  }

  let i = 0;
  
  function getNameCell(i) {
    return spreadsheet.getRange(`유니온!${cols.캐릭터명}${rows.first + i}`);
  }
  function getLevelCell(i) {
    return spreadsheet.getRange(`유니온!${cols.유니온레벨}${rows.first + i}`);
  }
  function getPowerCell(i) {
    return spreadsheet.getRange(`유니온!${cols.공격대전투력}${rows.first + i}`);
  }
  function getNameCellValue(i) {
    return getNameCell(i).getValue();
  }
  
  while (getNameCellValue(i)) {
    let charName = getNameCellValue(i);
    Logger.log(`캐릭터명: "${charName}"`);

    try {
      let union = getUnionInfo(charName);
      Logger.log(JSON.stringify(union));

      getLevelCell(i).setValue(union.유니온레벨);
      getPowerCell(i).setValue(union.공격대전투력);
    } catch (error) {
      Logger.log(`charName: ${charName} -> ${error}`);
      getLevelCell(i).setValue("-");
      getPowerCell(i).setValue("-");
    }      

    i += 1;
  }

  let timeCell = spreadsheet.getRange('유니온!D2');
  let now = new Date();
  timeCell.setValue(now.toLocaleString());
};
```
