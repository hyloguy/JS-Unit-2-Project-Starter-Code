/*
  Please add all Javascript code to this file.
  Michael N. Rubinstein
  GA SF JS3
*/

var App = new Object();

App.data = {
    articles : []
};

App.apis = [
    {
        apisource: "The Guardian",
        query: "https://content.guardianapis.com/us?show-most-viewed=true&show-fields=all&api-key=249f8a9f-740e-45d6-be1e-fb3baef3dfd1",
        fetch: function(apiIndex, r) {
            console.log(r);
            var arr = r.response.mostViewed;
            for (var i = 0, len = arr.length; i < len; i++) {
                let dateObj = new Date(arr[i].webPublicationDate);
                let item = {
                    source: arr[i].fields.publication,
                    id: i,
                    articleid: `a_${apiIndex}_${i}`,
                    previewid: `p_${apiIndex}_${i}`,
                    featuredImage : arr[i].fields.thumbnail,
                    title : arr[i].webTitle,
                    category : `from ${arr[i].fields.publication} in ${arr[i].sectionName} on ${dateObj.toDateString()}`,
                    impressions : arr[i].fields.wordcount,
                    url: arr[i].fields.shortUrl,
                    ptext: arr[i].fields.trailText.replace(/\<br\>/g,"."),
                    pubdate: dateObj
                };
                App.data.articles.push(item);
            }
        }
    },
    {
        apisource: "Hacker News",
        query: "https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=1bc3969ac33a44e1be2cb27c03dc315f",
        fetch: function(apiIndex, r) {
            console.log(r);
            var arr = r.articles;
            for (var i = 0, len = arr.length; i < len; i++) {
                let dateObj = (arr[i].publishedAt) ? new Date(arr[i].publishedAt) : new Date();
                let item = {
                    url: arr[i].url,
                    source: (function(url) {
                        let a = document.createElement('a');
                        a.setAttribute('href', url);
                        return a.hostname;
                    })(arr[i].url),
                    id: i,
                    articleid: `a_${apiIndex}_${i}`,
                    previewid: `p_${apiIndex}_${i}`,
                    featuredImage : arr[i].urlToImage,
                    title : arr[i].title,
                    category : `from Hacker News on ${dateObj.toDateString()}`,
                    impressions : Math.floor(Math.random() * 100),
                    ptext: arr[i].description,
                    pubdate: dateObj
                };
                App.data.articles.push(item);
            }
        }
    },
    {
        apisource: "The Daily WTF",
        query: "https://accesscontrolalloworiginall.herokuapp.com/http://thedailywtf.com/api/articles/recent/15",
        fetch: function(apiIndex, r) {
            console.log(r);
            var arr = r;
            for (var i = 0, len = arr.length; i < len; i++) {
                let category = (function(str) {
                    let a = str.split(':');
                    return ((a.length > 1) ? a[0] : "Feature Articles");
                })(arr[i].RssTitle);
                let dateObj = new Date(arr[i].ISODate);
                let item = {
                    source: "The Daily WTF",
                    id: i,
                    articleid: `a_${apiIndex}_${i}`,
                    previewid: `p_${apiIndex}_${i}`,
                    featuredImage : arr[i].Author.ImageUrl,
                    title : arr[i].Title,
                    category : `from The Daily WTF in ${category} on ${dateObj.toDateString()}`,
                    impressions : arr[i].CachedCommentCount,
                    url: arr[i].Url,
                    ptext: jQuery('<div></div>').html(arr[i].SummaryHtml).text(),
                    pubdate: dateObj
                };
                App.data.articles.push(item);
            }
        }
    }
];


$(document).ready(function() {
    var $popUp = $("#popUp");
    var $main = $("#main");
    var populateListTemplate = Handlebars.templates['articlesList'];
    var populatePreviewTemplate = Handlebars.templates['preview'];

    // We are going to send a GET request to each web API in the App.apis array.
    // Each $.get is asynchronous, returning a jQuery "deferred object".
    // But we don't want to populate our views with the results until ALL those requests complete,
    // because we want to SORT the complete list of articles by date before we show it!
    // So we use $.when to return a Promise from a combined "master" Deferred object for all of them.
    // (cribbed from http://stackoverflow.com/questions/18424712/how-to-loop-through-ajax-requests-inside-a-jquery-when-then-statment)
    var deferreds = [];
    $.each(App.apis, function(index, apiObj) {
        $("nav > ul > li > ul").append(`<li><a href="#">${apiObj.apisource}</a></li>`);
        deferreds.push(
            $.get(apiObj.query, function(response) {
                apiObj.fetch(index, response);
            })
        );
    });
    $.when.apply($, deferreds).then(populateAndShowViews);

    // Use event delegation to handle clicks on items!
    $main.on('click', 'article', function(event) {
        $("#popUp > div").addClass('hidden');
        var $previewDiv = $('#p' + $(this).attr('id').slice(1));
        $previewDiv.removeClass('hidden');
        $popUp.removeClass("loader hidden");
    });

    $(".closePopUp").on('click', function(event) {
        $popUp.addClass("hidden");
    });

    function populateAndShowViews() {
        App.data.articles.sort(function(a,b) {
            return (b.pubdate - a.pubdate);
        });
        for (var i = 0; i < App.data.articles.length; i++) {
            $popUp.append(populatePreviewTemplate(App.data.articles[i]));
            $main.append(populateListTemplate(App.data.articles[i]));
        };
        $popUp.addClass("hidden");
    }
});
