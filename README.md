# CartUtil

## OverView
Chrome Extension for [akizukidenshi.com](http://akizukidenshi.com) providing wishlist.  

## Description
[akizukidenshi](http://akizukideshi.com)s cart items is cleared every 48 hours(=2 days).  
This extension is provide additional cart(similar to Amazon "wishlist") on your browser.  
Using localStorage to save cart items, so you dont need to think about cart clearing time.  
And you can export items in list to cart anytime.

## Development Enviromnent

 * Language: JavaScript/html/css
 * Browser: Google Chrome 77.0.3865.120

## Contents

 * manifest.json: chrome ext manifest file
 * icon.png: ext icon(now printing)
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

### On product page
Detecting product page(matches `/akizukidenshi.com\/catalog\/g\/g(.*?)\/*$/`), `cscript/script.js` send product information to `popup/script.js`.  
clicking extension icon, this screen is popup.  
![add item screen](https://user-images.githubusercontent.com/51850597/67298010-a3ab0500-f525-11e9-9450-1dce829e3dfe.png)  
confirm count to buy and click "追加", the item is added in selected wishlist.  
  
__NOTE__ On initial state, "デフォルトウィッシュリスト" is selected (and user can't delete this wishlist).  

### On cart page
click extension icon in cart page(matches `/akizukidenshi.com\/catalog\/cart\/*/`), this screen is popup.  
![export screen](https://user-images.githubusercontent.com/51850597/67298204-e4a31980-f525-11e9-88e1-c4f05f310e14.png)  
and click "エクスポート", items in list is exported cart.

### In popup page
In popup, you always can see selected wishlist item list and its name.  
Click the text area where the wish list name is displayed to select the list to display. If you select another list or lose focus, the text area will display the name of the currently selected list again.  
If you write the name of a non-existing wish list in the area and press the Enter key, a new list with that name will be created.  
Click the "Delete" button to delete the selected wish list.  

## LICENCE
All files are distributed under the MIT license.