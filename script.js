$(() => {
    // import "external/jquery/jquery.js"
    // import "jquery-ui.js"
    // PLACEHOLDER FOR SEARCH FUNCTIONALITY

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
                renderMemes(response.data.memes);
            });

    function renderMemes(memeArray){
        memeArray.map((memeItem) => {
            $(".meme-container").append(`
                <div class="meme">
                <div class="card" style="width: 18rem;">
                <img id="meme-image" class="card-img-top" src="${memeItem.url}" alt="Card image cap">
                </div>
                </div>
            `);
        });
    }
    $( "#date" ).datepicker();
});