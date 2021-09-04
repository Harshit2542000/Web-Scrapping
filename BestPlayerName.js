const request=require('request');
const cheerio=require('cheerio');
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/live-cricket-score"
request(url,cb);
function cb(error,response,html)
{
    if(error)
    {
        console.error('error:', error); // Print the error if one occurred
    }
    else{
        extractHTML(html) // Print the HTML for the Google homepage.
    }
}
function extractHTML(html)
{
     let selectorTool=cheerio.load(html);
     let data=selectorTool('.playerofthematch-player-detail>a .playerofthematch-name')//.best-player-name>a
     console.log("Player of the Match Name:  "+selectorTool(data[0]).text());
}