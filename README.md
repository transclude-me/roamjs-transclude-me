# transclude-me
      
Transclude any block or page to the web

## Installation

1. [Install Roam plugin](https://roamstack.com/how-install-roam-plugin/) via the following code-block

```javascript
/** transclude-me - Transclude any block or page to the web
 *  Author: Vlad Sitalo
 *  Docs: https://github.com/Stvad/roamjs-transclude-me
 */


var transcludeMeId = "transclude-script";
var oldTransclusion = document.getElementById(transcludeMeId);
if (oldTransclusion) oldTransclusion.remove();
var transcludeMe = document.createElement('script');
    transcludeMe.type = "text/javascript";
    transcludeMe.id = transcludeMeId;
	transcludeMe.src =  "https://transclude-me-plugin.netlify.app/main.js";
    transcludeMe.async = true;
document.getElementsByTagName('head')[0].appendChild(transcludeMe);
```
