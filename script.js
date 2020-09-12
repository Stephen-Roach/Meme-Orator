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
        if(memeItem.name.toLowerCase().includes(searchString)) {
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
                    <div class="outside-wrapper">
                        <div id="capture" class="inside-wrapper">
                            <img id="selected-meme" src="${itemURL}" crossorigin="anonymous">
                            <canvas id="canvas"></canvas>
                        </div>
                    </div>
                </div>
                    <div class="text-inputs">
                    <form class="form-inputs">
                    <input id="top-text" type="text" placeholder="Top Text" />
                    <input id="bottom-text" type="text" placeholder="Bottom Text" />
                    <button class="text-submit" onclick="applyText()">Apply</button>
                    <button id="download" class="download-btn" onclick="downloadMeme()">Download Meme</button>
                    </form>
                    </div>
            </div>
        `);
    }

    function applyText(){
        let topText = $("#top-text").val();
        let bottomText = $("#bottom-text").val();
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.font = '30px Impact';
        ctx.fillText(topText, 25, 30);
        ctx.fillText(bottomText, 25, 145);
    }

    function downloadMeme(){
      domtoimage.toPng(document.getElementById("capture"))
      .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          console.log(img);
          let win = window.open();
          win.document.write("<img target='_blank' src='"+img.src+"'>");
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
    }
