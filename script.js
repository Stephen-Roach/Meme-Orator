$(() => {

    $(".blah").click(function(e){
        e.preventDefault();
        let searchString = $(".blah").val();
        // let urlEncodedSearchString = encodeURIComponent(searchString);
        fetch(`http://api.giphy.com/v1/gifs/search?q=${searchString}&api_key=RJpUMPEri2bZmuX4lkjaIX9NeuYWQjfA&`)
            .then(response => response.json())
            .then(response => {
                //renderMemes(response.data.embed_url);
                console.log(response.data);
            });
    });

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