$(() => {
  $("#search-btn").click(function (e) {
    e.preventDefault();
    let searchString = $("#search-size").val();
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        renderMemes(response.data.memes);
      });
    fetch(
      `http://api.giphy.com/v1/gifs/search?q=${searchString}&api_key=RJpUMPEri2bZmuX4lkjaIX9NeuYWQjfA&`
    )
      .then((response) => response.json())
      .then((response) => {
        renderGifs(response.data);
      });
  });

  function renderMemes(memeArray) {
    let searchString = $("#search-size").val();
    searchString.toLowerCase();
    memeArray.map((memeItem) => {
      if (memeItem.name.toLowerCase().includes(searchString)) {
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

  function renderGifs(gifArray) {
    gifArray.map((gifItem) => {
      $(".meme-container").append(`
                <div class="meme">
                <div class="card" style="width: 18rem;">
                <a href="#" onclick="selectMeme('${gifItem.images.original.url}')"><img id="meme-image" class="card-img-top" src="${gifItem.images.original.url}" alt="Card image cap"></a>
                </div>
                </div>
            `);
    });
  }
});

function selectMeme(itemURL) {
  $(".meme-container").replaceWith(`
      <div class="box">
          <div class="box-imgs">
            <img src="${itemURL}">
          </div>
            <div class="text-inputs">
              <form class="form-inputs">
              <input id="top-text" type="text" placeholder="Top Text" />
              <input id="bottom-text" type="text" placeholder="Bottom Text" />
              <button class="text-submit">Apply</button>
              </form>
            </div>
      </div>
    `);
}
