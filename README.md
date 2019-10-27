# CartUtil

## OverView
Chrome Extension for [akizukidenshi.com](http://akizukidenshi.com) and [switch-science.com](https://www.switch-science.com/) providing wishlist.  

## Development Environment

 * Language: JavaScript/html/css
 * Browser: Google Chrome 77.0.3865.120

## Latest Release - show item place(only akizukidenshi)
![item place](https://user-images.githubusercontent.com/51850597/67628051-bbc2b180-f8a2-11e9-9d31-67fb7aaaa56e.png)  

 * show item place on akizukidenshis cart page
 * some additional in content script

## Contents

 * manifest.json: chrome ext manifest file
 * icon.png: ext icon (using FET as a motif)
 * popup/
	* index.html: popup html (main html)
	* script.js: popup script
	* wishlist.js: wishlist manager(main script)
	* *.css: css
 * cscript/
	* script.js: content script

## Usage

### Installation
 1. clone this repository.
 2. access `chrome://extensions` and enable "Developer mode".
 3. click "Load unpackaged extension" and select repository folder to install extension.

### Product page
Detecting product page(matches `/akizukidenshi.com\/catalog\/g\/g(.*?)\/*$/`), `cscript/script.js` send product information to `popup/script.js`.  
clicking extension icon, this screen is popup.  
![add item screen](https://user-images.githubusercontent.com/51850597/67298010-a3ab0500-f525-11e9-9450-1dce829e3dfe.png)  
confirm count to buy and click "追加", the item is added in selected wishlist.  
  
__NOTE__ On initial state, "デフォルトウィッシュリスト" is selected (and user can't delete this wishlist).  

### Cart page
![export screen](https://user-images.githubusercontent.com/51850597/67628037-861dc880-f8a2-11e9-9bad-4e3da6e5e8e7.png)  

__Export items__  
To export, click "エクスポート" in popup.  
  
__Export item place information__
To see item place, click"店舗情報を展開" in popup.  

### Popup page
In popup, you always can see selected wishlist item list and its name.  
Click the text area where the wish list name is displayed to select the list to display. If you select another list or lose focus, the text area will display the name of the currently selected list again.  
If you write the name of a non-existing wish list in the area and press the Enter key, a new list with that name will be created.  
Click the "Delete" button to delete the selected wish list.  

## LICENCE
All files are distributed under the MIT license.