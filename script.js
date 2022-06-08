const form = document.getElementById('form')
const search  = document.getElementById('search')
const result = document.getElementById('result')
const more = document.getElementById('more')


// https://api.lyrics.ovh/v1/artist/title
const url = 'https://api.lyrics.ovh/';

form.addEventListener('submit',e=>{
  e.preventDefault();
  const songText = search.value.trim();
  console.log(songText);
  if(songText===''){
    alert('ป้อนข้อมูลไม่ถูกต้อง')
  }else{
      searchLyrics(songText);
  }

  resetText();
})

function resetText(){
  search.value =  ''
}

async function searchLyrics(songText){
  const result  = await fetch(`${url}/suggest/${songText}`);
  const allSong =  await result.json()
  console.log(allSong);
  showData(allSong)
}

function showData(songs){
  result.innerHTML = `
    <ul class="songs">
       ${songs.data.map(song=>
          `<li>
          <span>
          <strong>${song.artist.name}</strong> - ${song.title}
          </span>
          <button class="btn"
          
          data-artist="${song.artist.name}"
          data-song="${song.title}"
          
          >เนื้อเพลง</button>
          </li>`
       ).join("")}
    </ul>
  `;

  if(songs.next || songs.prev){
    more.innerHTML = `
    ${songs.prev ? `<button class="btn" onclick="getMoreSongs('${songs.prev}')">ก่อนหน้า</button>`: ''}
    ${songs.next ? `<button class="btn" onclick="getMoreSongs('${songs.next}')">ถัดไป</button>`: ''}
    `
  }else{
    more.innerHTML = ''
  }
}

async function getMoreSongs(songURL){
  console.log(songURL);
  const result  = await fetch(`https://cors-anywhere.herokuapp.com/${songURL}`);
  const allSong =  await result.json()
  showData(allSong);
}

result.addEventListener('click',e=>{
  const clickEl = e.target;

  if(clickEl.tagName == "BUTTON"){
    const artist = clickEl.getAttribute('data-artist');
    const songName = clickEl.getAttribute('data-song');
    getLyrics(artist,songName);
  }
  
});

async function getLyrics(artist,songName) {
  const res = await fetch(`${url}/v1/${artist}/${songName}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,"<br>");
  console.log(lyrics);

  if(lyrics){
    result.innerHTML = `
      <h2>
      <span>
      <strong>${artist}</strong> - ${songName}
      </span>
      </h2>
      <span>${lyrics}</span>
    `
  }else{
    result.innerHTML = `
      <h2>
      <span>
      <strong>${artist}</strong> - ${songName}
      </span>
      </h2>
      <span>ไม่มีข้อมูลเนื้อเพลงนี้</span>
    `
  }

  more.innerHTML = ''
}