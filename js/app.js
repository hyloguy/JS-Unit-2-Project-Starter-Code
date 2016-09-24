/*
  Please add all Javascript code to this file.
  Michael N. Rubinstein
  GA SF JS3
*/

var App = {};

App.dataMain = {
    articles : [
        {
            featuredImage : "images/article_placeholder_1.jpg",
            title : "Champagne Kisses and Caviar Dreams",
            blurb : "Lifestyle",
            impressions : 99
        },
        {
            featuredImage : "images/article_placeholder_2.jpg",
            title : "Secrets of iOS 10",
            blurb : "Technology",
            impressions : 256
        },
        {
            featuredImage : "images/article_placeholder_1.jpg",
            title : "All Hail Our God-Emperor Trump",
            blurb : "Politics and Religion",
            impressions : 9000
        },
        {
            featuredImage : "images/article_placeholder_2.jpg",
            title : "What Do You Get When You Multiply Six by Nine?",
            blurb : "SpaaaAaace",
            impressions : 42
        }
    ]
};

App.dataPreview = {
    title : "My Crazy Article Title",
    preview : "Some crazy kinda article preview is gonna go here...",
    url : "www.example.com"
}

App.buildMain = function() {
    var articlesListTemplate = Handlebars.templates['articlesList'];
    var output = articlesListTemplate(App.dataMain);
    return output;
}

App.buildPreview = function() {
    var previewTemplate = Handlebars.templates['preview'];
    var output = previewTemplate(App.dataPreview);
    return output;
}

App.fHideEl = function($el) {
    return (function() {
        $el.addClass("hidden");
    });
}

App.showPopUp = function($popUp) {
    $popUp.append(App.buildPreview);
    $popUp.removeClass("loader hidden");
};

$("document").ready(function() {
    let $popUp = $("#popUp");

    $popUp.removeClass("hidden");
    $("body").append(App.buildMain);
    window.setTimeout(App.fHideEl($popUp), 1000);

    $(".article").on('click', function(event) {
        App.showPopUp($popUp);
    })
});
