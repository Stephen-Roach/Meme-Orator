$(() => {

    document.cookie = "SameSite=None; Secure"

    $("#search-size").click(function(e){
        e.preventDefault();
        let searchString = $("#search-size").val();
        fetch(`http://api.giphy.com/v1/gifs/search?q=${searchString}&api_key=RJpUMPEri2bZmuX4lkjaIX9NeuYWQjfA&`)
            .then(response => response.json())
            .then(response => {
                renderGifs(response.data);
                console.log(response.data);
            });
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                renderMemes(response.data.memes);
                console.log(response.data.memes);
            });
    });
            
    function renderMemes(memeArray){
        let searchString = $("#search-size").val();
        searchString.toLowerCase();
        memeArray.map((memeItem) => {
            if(memeItem.name.toLowerCase().includes(searchString) ){
                $(".meme-container").append(`
                    <div class="meme">
                    <div class="card" style="width: 18rem;">
                    <a href="#" onclick="selectMeme('${memeItem.url}')"><img id="meme-image" class="card-img-top" src="${memeItem.url}" alt="Card image cap"></a>
                    </div>
                    </div>
                `);
            }
        });
    }
    function renderGifs(gifArray){
        gifArray.map((gifItem) => {
            $(".meme-container").append(`
                <div class="meme">
                <div class="card" style="width: 18rem;">
                <a href="#" onclick="selectMeme('${gifItem.embed_url}')"<img id="meme-image" class="card-img-top" src="${gifItem.embed_url}" alt="Card image cap"></a>
                </div>
                </div>
            `);
        })
    }
});

function selectMeme(itemURL){
    $(".meme-container").replaceWith(`
        <div class="box">
        <img src="${itemURL}">
        <input id="top-text" type="text" placeholder="Top Text" />
        <input id="bottom-text" type="text" placeholder="Bottom Text" />
        <button class="text-submit">Apply</button>
        </div>
    `);
}