const request=require('request');
const cheerio=require('cheerio');
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
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
     let BowlerTableArr=selectorTool('.card.content-block.match-scorecard-table .Collapsible__contentOuter .table.bowler'); 
     //selecting the whole bowler table here first we have used siblings selector so,dot with no space then we have used collapsible as table collapses(symbol ^) then inside it we only need bowler table and not the batting table
     let now=0;
     let hwtplayer="";
     for(let i=0;i<BowlerTableArr.length;i++)
     {
         let BowlerTable=selectorTool(BowlerTableArr[i]).html(); //looping through the bowler table length=2
         let allBowlersRow=selectorTool(BowlerTable).find('tbody>tr'); // for finding the each column in bowlertable length=9+9=18 array of rows of both tables we get
         for(let j=0;j<allBowlersRow.length;j++) //traversing through each row of bowler table
         {
             //td means column of each row array of columns for each row
             let colOfEachBowler=selectorTool(allBowlersRow[j]).find('td'); // for finding the content in each row that is the playername and his number of wickets length can be 11 or 1 depending on wether the content in the each row of table is of 11 columns or 1 columns that is with empty row(only one td tag in it)
             let playername=selectorTool(colOfEachBowler[0]).text();
             let currnumofwickets=selectorTool(colOfEachBowler[4]).text();
             if(colOfEachBowler.length==1) //some table content is empty and have only one td tag in it so,its array length is 1.so,ignore it,it is an empty row
             {
                 continue;
             }
             if(currnumofwickets>now) //calculating player with highest number of wickets and playername
             {
                 now=currnumofwickets;
                 hwtplayer=playername;
             }
         }
     }
     //printing player with highest number of wickets and playername
     console.log("Highest Wicket Taker Bowler Name: "+hwtplayer); //prints trent boult
     console.log("Highest Number of Wickets: "+now); //prints 3
}