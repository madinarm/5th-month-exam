
const imageWrapper = document.querySelector("#image-wrapper");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-section");
const selectSection = document.querySelector("#select-section");

fetch("https://api.pexels.com/v1/search?query=library&per_page=15", {
    headers: {
        Authorization: "QCfUHjheuMJbUM8mjadF6J8hIIV3yklEMEIxzyEIvi0hbzSaGbxhQrAq"
    }
})
    .then(response => response.json())
    .then(info => renderImages(info.photos))

function renderImages(info) {
    imageWrapper.innerHTML = "";
    info.forEach(data => {
        const img = document.createElement("img");
        img.style.objectFit = "cover";
        img.style.width = "auto";
        img.style.height = "100%";
        img.style.padding = "20px"
        img.src = data.src.original + "?auto=compress&cs=tinysrgb&w=400";
        img.onclick = () => {
            const modal = document.querySelector("#modal");
            modal.style.display = "block";
            const times = document.querySelector(".fa-times");
            times.onclick = () => {
                modal.style = "none";
                img0.innerHTML = "";
                video0.innerHTML = "";
                caption.innerHTML = "";

            }
            const img0 = document.getElementById("img0");
            img0.src = data.src.original;
            img0.style.marginTop = "100px";
            img0.style.width = "auto";
            img0.style.height = "800px";
            img0.style.objectFit = "cover"
            const caption = document.getElementById("caption");
            caption.innerHTML = data.photographer;
        }
        imageWrapper.appendChild(img)
    })
}
function renderVideos(videoInfo) {
    imageWrapper.innerHTML = "";
    videoInfo.forEach(informa => {
        const video = document.createElement("video")
        video.src = informa.video_files[0].link;
        video.muted = true;
        video.controls = true;
        video.autoplay = false;
        video.style.width = "300px";
        video.style.height = "230px";
        video.style.padding = "20px";
        video.onclick = () => {
            const modal = document.querySelector("#modal");
            modal.style.display = "block";
            const img0 = document.getElementById("img0");
            img0.src = "";
            const times = document.querySelector(".fa-times");
            times.onclick = () => {
                modal.style = "none";
                img0.innerHTML = "";
                video0.innerHTML = "";
                caption.innerHTML = "";
            }
            const video0 = document.getElementById("video0");
            video0.src = informa.video_files[0].link;
            video0.muted = true;
            video0.controls = true;
            video0.autoplay = false;
            video0.style.width = "1200px";
            video0.style.height = "650px";
            video0.style.marginTop = "50px";
            const caption = document.getElementById("caption");
            caption.innerHTML = informa.photographer;
        }
        console.log(video)
        imageWrapper.prepend(video);
    })
}

searchForm.addEventListener("submit", searchArea);

function searchArea(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=15`, {
        method: "GET",
        headers: {
            Authorization: "QCfUHjheuMJbUM8mjadF6J8hIIV3yklEMEIxzyEIvi0hbzSaGbxhQrAq"
        }

    })
        .then(response => response.json())
        .then(info => {
            renderImages(info.photos)
        })
        .catch(error => {
            console.error(error);
        });
}

selectSection.addEventListener("change", () => {
    const searchTerm = searchInput.value.trim();
    const selectOption = selectSection.value
    if (selectOption === "v1") {
        fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=15`, {
            headers: {
                Authorization: "QCfUHjheuMJbUM8mjadF6J8hIIV3yklEMEIxzyEIvi0hbzSaGbxhQrAq"
            }
        })
            .then(response => response.json())
            .then(info => {
                renderImages(info.photos)
            })
    }
    if (selectOption === "videos") {
        fetch(`https://api.pexels.com/videos/search?query=${searchTerm}&per_page=15`, {
            headers: {
                Authorization: "QCfUHjheuMJbUM8mjadF6J8hIIV3yklEMEIxzyEIvi0hbzSaGbxhQrAq"
            }
        })
            .then(response => response.json())
            .then(videoInfo => {
                renderVideos(videoInfo.videos)
            })
    }
});