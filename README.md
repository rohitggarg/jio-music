Jio Music
===

Simple music player application which you can use to play music using JioFi device
All you need is an SD Card full of songs, you can insert the same into JioFi device and enable storage option with username and password

After connecting to the Jio Device using your android smartphone, just login using the sdcard credentials and the app should be automatically pulling all those music files from the sdcard. You can follow [these steps](http://www.bgr.in/news/how-to-use-reliance-jio-jiofi-2-portable-wi-fi-hotspot-as-a-wireless-pen-drive/) to configure the device for WiFi Direct

Installation
===
* Install DroidScript app from play store
* Clone this repository and place the 'Jio Music' folder at /sdcard/DroidScript/ (this was folder in my phone, you might have to search for it in your device)

You should automatically see the application in DroidScript app, you can expose the app outside DroidScript for quick access also.

This application is only on android platform because DroidScript is only supported on Android. There is definitely scope for it to be ported to iOS using cordova

Why would you do that?
===
I have a personal collection that I maintain and listen to them when I am home mostly. I bought a phone that doesn't support micro SD card and dual sim together, it doesn't have too much internal memory as well. So I thought about using JioFi device as a drive where I can put all my music files and provide an interface in my phone to play them like I would using a regular music player

Possible Additions
===
* Custom Playlist feature
* Shuffle
* Porting to phonegap/cordova