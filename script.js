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

  // console.log(songs);

  result.innerHTML = `
    <ul class="song">
       ${songs.data.map(song=>`<li><span><strong>${song.artist.name} - ${song.title}</strong></span></li>`).join("")}
    </ul>
  `
}