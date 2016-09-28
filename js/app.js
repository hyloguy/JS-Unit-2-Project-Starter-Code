/*
  Please add all Javascript code to this file.
  Michael N. Rubinstein
  GA SF JS3
*/

var App = {};

App.data = {
    articles : []
};

$(document).ready(function() {
    var $popUp = $("#popUp");
    var $main = $("#main");
    var populateListTemplate = Handlebars.templates['articlesList'];
    var populatePreviewTemplate = Handlebars.templates['preview'];

    // let practiceQuery = "https://content.guardianapis.com/search?api-key=249f8a9f-740e-45d6-be1e-fb3baef3dfd1";
    var practiceQuery = "https://content.guardianapis.com/us?show-most-viewed=true&show-fields=all&api-key=249f8a9f-740e-45d6-be1e-fb3baef3dfd1";
    $.get(practiceQuery, function(r) {
        console.log(r);
        App.data.articles = [];
        var sourceArray = r.response.mostViewed;
        for (var i = 0, len = sourceArray.length; i < len; i++) {
            let item = {
                source: "The Guardian",
                id: i,
                articleid: `a${i}`,
                previewid: `p${i}`,
                featuredImage : sourceArray[i].fields.thumbnail,
                title : sourceArray[i].webTitle,
                category : sourceArray[i].sectionName,
                impressions : sourceArray[i].fields.wordcount,
                url: sourceArray[i].fields.shortUrl,
                ptext: sourceArray[i].fields.trailText.replace(/\<br\>/g,".")
            };
            $popUp.append(populatePreviewTemplate(item));
            $main.append(populateListTemplate(item));
            App.data.articles.push(item);
        }
        $popUp.addClass("hidden");
    });
    
    // Use event delegation to handle clicks on items!
    $main.on('click', 'article', function(event) {
        console.log(`item ${$(this).attr('id')} clicked on`);
        var previd = '#p' + $(this).attr('id').slice(1);
        console.log(`Displaying preview ${previd}`)
        var $preview = $(previd);
        $("#popUp > div").addClass('hidden');
        $preview.removeClass('hidden');
        $popUp.removeClass("loader hidden");
    });

    $(".closePopUp").on('click', function(event) {
        $popUp.addClass("hidden");
    });
});
