$(() => {
    // $(".search-bar").click(function(e){
    //     e.preventDefault();
    //     //let searchString = $(".search-bar").val();
    //     //let urlEncodedSearchString = encodeURIComponent(searchString);
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(response => response.json())
    //         .then(response => {
    //             //renderMemes(response.Search);
    //             console.log(response);
    //         })
    // });
    fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                //renderMemes(response.Search);
                console.log(response);
            });
});