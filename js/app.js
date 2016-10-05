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
        query: "https://content.guardianapis.com/us?show-most-viewed=true&show-fields=all&api-key=249f8a9f-740e-45d6-be1e-fb3baef3dfd1",
        fetch: function(r) {
            console.log(r);
            var arr = r.response.mostViewed;
            for (var i = 0, len = arr.length; i < len; i++) {
                let item = {
                    source: arr[i].fields.publication,
                    id: i,
                    articleid: `a${i}`,
                    previewid: `p${i}`,
                    featuredImage : arr[i].fields.thumbnail,
                    title : arr[i].webTitle,
                    category : arr[i].sectionName,
                    impressions : arr[i].fields.wordcount,
                    url: arr[i].fields.shortUrl,
                    ptext: arr[i].fields.trailText.replace(/\<br\>/g,".")
                };
                App.data.articles.push(item);
            }
        }
    },
    {
        query: "https://newsapi.org/v1/articles?source=hacker-news&sortBy=latest&apiKey=1bc3969ac33a44e1be2cb27c03dc315f",
        fetch: function(r) {
            console.log(r);
            var arr = r.articles;
            for (var i = 0, len = arr.length; i < len; i++) {
                let item = {
                    url: arr[i].url,
                    source: (function(url) {
                        let a = document.createElement('a');
                        a.setAttribute('href', url);
                        return a.hostname;
                    })(arr[i].url),
                    id: i,
                    articleid: `a${i}`,
                    previewid: `p${i}`,
                    featuredImage : arr[i].urlToImage,
                    title : arr[i].title,
                    category : r.source,
                    impressions : r.status,
                    ptext: arr[i].description,
                    pubdate: arr[i].publishedAt
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

    App.apis.forEach(function(apiObj) {
        $.get(apiObj.query, apiObj.fetch).done(populateAndShowViews);
    });

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
        App.data.articles.forEach(function(item) {
            $popUp.append(populatePreviewTemplate(item));
            $main.append(populateListTemplate(item));
        });
        $popUp.addClass("hidden");
    }
});
