const request=require('request');
const cheerio=require('cheerio');
const chalk=require('chalk');
const { DH_NOT_SUITABLE_GENERATOR } = require('constants');
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url,cb);
function cb(error,response,html)
{
    if(error)
    {
        console.log('error: '+error);
    }
    else{
        extractHTML(html);
    }
}
function extractHTML(html)
{
    let selectorTool=cheerio.load(html);
    let allTables=selectorTool('.table tbody');
    for(let i=0;i<4;i++)
    {
        let allRowsofTable=selectorTool(allTables[i]).find('tr');
        //console.log(selectorTool(allRowsofTable).html());
        for(let j=0;j<allRowsofTable.length;j++)
        {
             let link=selectorTool(allRowsofTable[j]).find('a').attr('href');
             //console.log(link);
             if(link)
             {
                 let fulllink="https://www.espncricinfo.com"+link;
                 //console.log(fulllink);
                 getBirthday(fulllink);
             }
        }
    }
    function getBirthday(link)
    {
        request(link,cb);
        function cb(error,response,html)
        {
            if(error)
            {
                console.log('error: '+error);
            }
            else{
                extractBirthdays(html);
            }
        }
    }
    function extractBirthdays(html)
    {
        let selectorTool=cheerio.load(html);
        let playerdetailsArr=selectorTool('.player-card-description');
        let playerName=selectorTool(playerdetailsArr[0]).text();
        let dobArr=selectorTool(playerdetailsArr[1]).text().split(",");
        let dob="";
        for(let k=0;k<2;k++)
        {
            dob+=dobArr[k];
        }
        console.log(chalk.green("Name of the Player: "+playerName));
        console.log(chalk.yellow("Date Of Birth: "+dob));
        console.log();
    }
}
