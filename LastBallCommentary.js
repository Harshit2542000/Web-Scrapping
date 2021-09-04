const request=require('request');
const cheerio=require('cheerio');
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
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
     let commentaryArr=selectorTool('.match-comment-wrapper .match-comment-long-text'); //or .match-comment-long-text[itemprop="articleBody"]>p
     let lbc=selectorTool(commentaryArr[0]).text()  // selectorTool(commentaryArr[0]).html() //gives html element searched here
     console.log("Last Ball Commentary:  "+lbc);
}