function finished(){return page.evaluate(function(){return!!window.qunitDone})}function onfinishedTests(){var e=page.evaluate(function(){return JSON.stringify(window.qunitDone)});phantom.exit(JSON.parse(e).failed>0?1:0)}function addLogging(){window.document.addEventListener("DOMContentLoaded",function(){var e=[];QUnit.testDone(function(t){var n,r=t.module+": "+t.name;if(t.failed){console.log("Assertion Failed: "+r);for(n=0;n<e.length;n++)console.log("    "+e[n])}e=[]}),QUnit.log(function(t){var n;if(t.result)return;n=t.message||"",typeof t.expected!="undefined"&&(n&&(n+=", "),n+="expected: "+t.expected+", but was: "+t.actual),e.push("Failed assertion: "+n)}),QUnit.done(function(e){console.log("Took "+e.runtime+"ms to run "+e.total+" tests. "+e.passed+" passed, "+e.failed+" failed."),window.qunitDone=e})},!1)}var url=phantom.args[0],page=require("webpage").create();page.onConsoleMessage=function(e){console.log(e)},page.onInitialized=function(){page.evaluate(addLogging)},page.open(url,function(e){if(e!=="success")console.log("Unable to access network: "+e),phantom.exit(1);else var t=setInterval(function(){finished()&&(clearInterval(t),onfinishedTests())},500)});