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
       ${songs.data.map(song=>`<li><span><strong>${song.artist.name}</strong> - ${song.title}</span><button class="btn">เนื้อเพลง</button></li>`).join("")}
    </ul>
  `

  if(songs.next || songs.prev){
    more.innerHTML=`
    ${songs.prev ? `<button class="btn">ก่อนหน้า</button>` :  ''}
    ${songs.next ? `<button class="btn">ถัดไป</button>` :  ''}
    `
  }else{
    more.innerHTML=''
  }
}