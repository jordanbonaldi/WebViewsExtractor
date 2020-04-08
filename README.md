
# WebView Extractor using synchronous and asynchronous javascript file injection  
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![Maven Central](https://maven-badges.herokuapp.com/maven-central/net.neferett/webviewsextractor/badge.svg?style=plastic)](https://maven-badges.herokuapp.com/maven-central/net.neferett/webviewsextractor)
[![GitHub release](https://img.shields.io/github/release/jordanbonaldi/WebViewsExtractor.svg)](https://GitHub.com/jordanbonaldi/WebViewsExtractor/releases/)

Private Data Extraction using WebViewsInjection for autologin on the below services, and injection of javascript files containing asynchronous or synchronous extractions.

## Current Services

Research Engine:
- Google.com (Maps)

Travelling Websites:
- Hotels.com
- Booking.com
- Expedia.com
- Trainline
- Agoda (Not Implemented Yet)
- AirBNB (Not Implemented Yet)

Online Social Networks:
- Twitter
- Facebook
- Instagram (Not Implemented Yet)
- Pinterest (Not Implemented Yet)

You can also:
- Using accordingly WebViewsInjector and your own new Services, create new injection scripts
  
### Installation

Install the dependency with Gradle (only authorised developers) inside your Main Application
```java
    dependencies {
        implementation 'net.neferett.webviewsextractor:2.0.0'
    }
```
Don't forget to add maven central in your repositories:
```groovy
    buildscript {
      repositories {
          google()
          jcenter()
          mavenCentral()
      }
    }
```
Add INTERNET permission to your android application
```xml
    <uses-permission android:name="android.permission.INTERNET" />
```

### How to use it

Here's what you need to implement, to have an automated LoginService
```java
    // Context should be your Main Activity of your application
    LoginService loginService = new GoogleService(context);
    // Email and Password should be clear string
    loginService.autoLogin(<email>, <password>, new ResponseCallback() {
        @Override
        public void getResponse(ResponseEnum responseEnum, String data) {
            if (responseEnum == ResponseEnum.SUCCESS) {
                DataExtractor dataExtractor = new DataExtractor(loginService);  
  
				dataExtractor.injectAll(<context>, (jsonArray, status) -> {
					    //JSONArray is what you return from your/our scripts
					    //JSONArray will be null if not JSON format
					    //Status allows you to see the processing of all the injection files
						//status.getFailedData();  
						//status.getSucceedData();  
						//status.getRemainingData();
					}
				)
			}
        }
    });
```

### All DataExtractor Injection Methods
Default Method to Inject all scripts matching with the login
```
 injectAll(Context context, ExtractionCallback extractionCallback);
```
Using a list of scripts or name of scripts using string
```
 injectAllScripts(Context context, ExtractionCallback extractionCallback, List<Script> scripts);
 
 injectAllScriptsByListName(Context context, ExtractionCallback extractionCallback, List<String> scriptsNames);
 
 List<Script> getScripts(); // Getting the full scripts list
 List<String> getStringScripts(); //Getting the full scripts names 
```
You can directly put them using va args (infinite args)
```
  injectAllScripts(Context context, ExtractionCallback extractionCallback, Script ... scripts);
  
  injectAllScriptsByListName(Context context, ExtractionCallback extractionCallback, List<String> scriptsNames);
```
Lastly simple script name injection:
```
  injectScriptByName(String name, ExtractionCallback extractionCallback);
```
### Create a synchronous injection file

First you must create a javascript file into res/raw folder of your application.

At the top of the file you need to include the url to inject the file in using the following format:
```
//url:https://twitter.com/settings/profile
```
You can add an __optional__ parameter to create latency before injection (the latency is in seconds):
```
//latency:5
```
Lastly, you must return your values using the custom javascript function:
```
Injector.promiseReceive(...);
```

Example of a full injection file:
```
	//url:https://twitter.com/settings/profile  
	//latency:5  
	
	Injector.promiseReceive(JSON.stringify([  
	 {  
		 title: 'First Name',  
		 type: 'profile',  
		 value: document.getElementById('firstName').value,  
		 data: []  
	 }, {  
		 title: 'Last name',  
		 type: 'profile',  
		 value: document.getElementById('lastName').value,  
		 data: []  
	 }, {  
		 title: 'Email address',  
		 type: 'profile',  
		 value: document.getElementById('email').value,  
		 data: []  
	 }]
	));
```
### Create an asynchronous injection file

The creation procedure is exactly the same, because we call our callback once
```
Injector.promiseReceive(...);
```
is called. Here's an example of an asynchronours injection file:
```
	//url:https://twitter.com/settings/profile  
	
	new Promise(res => {  
	  setTimeout(res, 5000)  
	}).then(() => {  
	  Injector.promiseReceive(JSON.stringify([  
		 {  
			 title: 'First Name',  
			 type: 'profile',  
			 value: document.getElementById('firstName').value,  
			 data: []  
		 }, {  
			 title: 'Last name',  
			 type: 'profile',  
			 value: document.getElementById('lastName').value,  
			 data: []  
		 }, {  
			 title: 'Email address',  
			 type: 'profile',  
			 value: document.getElementById('email').value,  
			 data: []  
		 }]
	  ));
	});

```
PriVELT
----

Android application to centralise known data from different services.
The project is funded by PriVELT (https://privelt.ac.uk/).

License
----

Mozilla Public License 2.0