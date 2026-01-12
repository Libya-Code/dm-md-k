// fetch('https://api.aladhan.com/v1/asmaAlHusna')
// .then(response => response.json())
// .then(asmaAlHusna => {
//     let asma = asmaAlHusna.data;
//     for (const element of asma) {
//         console.log(element);

//     }
// }
// )
// function getAsmaAlHusna() {
//     let url = "https://api.aladhan.com/v1/asmaAlHusna"
// axios.get(url)
// .then( (response)=>{
//     console.log(response);

// })
// .catch(error =>{
//     alert(error)
// })

// }

// getAsmaAlHusna()


function quran() {
  axios.get('https://api.alquran.cloud/v1/surah')
    .then((response) => {

      let x = response.data
      console.log(x);
      for (let element of x.data) {
        document.getElementById("content").innerHTML += `
      <div id="quran-text" onclick="userIdclick(${element.number})>
      <h2>${element.name}</h2>
     
      <p>عدد الايات ${element.numberOfAyahs} </p>
      </div>
      `
      }

    })
    .catch(error => {
      console.log(error);

    })
}
// جزء خاص ببحث علي ايه
function Search() {
  let name = document.getElementById("Search").value
  document.getElementById("content").innerHTML = ""
  fetch("https://api.qurani.ai/gw/qh/v1/search/الحمد لله?language=ar&editionIdentifier=quran-simple-clean&surahNumber=1&exactSearch=true&limit=10&offset=0", {
  method: "GET"
})
    .then(response => response.json())
    .then(asmaAlHusna => {
      console.log(asmaAlHusna);
      
    //   let asma = asmaAlHusna.data.matches;
    //   for (const element of asma) {
    //     console.log(element);

    //     document.getElementById("result").innerHTML += `
    //     <div id="quran-Search-text">
    //   <h3 id="surah-name">${element.surah.name}</h3>
    //   <div id="quran-Search-ayah">
    //     <span id="ayah-number">${element.text}</span>
      
    //   </div>
    // </div>
        
        
        
    //     `
    //   }
    }
    )
}
//fetch("https://api.qurani.ai/gw/qh/v1/search/الحمد لله?language=string&editionIdentifier=string&surahNumber=1&exactSearch=true&limit=10&offset=0", {
//   method: "GET"
// })
//=========================
// =========================
// دالة تبديل /n ال br
// =========================
function toArabicNumbers(number) {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.toString().replace(/\d/g, d => arabicNumbers[d]);
}


// =========================
// الصفحة الرائسيه :: أسماء السور
// =========================
if (document.getElementById("content")) {

  let url = "https://api.alquran.cloud/v1/surah";

  axios.get(url)
    .then((response) => {
      let x = response.data;

      for (let element of x.data) {
        document.getElementById("content").innerHTML += `
        <div id="quran-text" onclick="userIdclick(${element.number})">
          <h2>${element.name}</h2>
          <p>عدد الآيات: ${element.numberOfAyahs}</p>
        </div>
      `;
      }
    });

  function userIdclick(number) {
    window.location.href = `quran.html?surah=${number}`;
  }
}
// ======================
// صفحه الرائسيه : اية عشوائيه 
//=======================
if (document.getElementById("ayah-text")) {
  fetch("https://api.qurani.ai/gw/qh/v1/ayah/random/quran-uthmani", {
    method: "GET"
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("Content-of-random-Quranic").innerText += `ايه قرانيه عشوائيه`
      document.getElementById("Contains-indirect-information").innerText = `${data.data.text}`

    })
    .catch(error => {
      console.log(error);

    })
}

// =========================
// الصفحة الثانية: عرض السورة
// =========================
function Interpretation_Quranic_verse() {
  if (document.getElementById("surah-content")) {

    const params = new URLSearchParams(window.location.search);
    var surahNumber = params.get("surah");

    if (surahNumber) {
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
        .then(res => res.json())
        .then(data => {
          const surah = data.data;
          document.getElementById("sura-content1").innerHTML = `
      <h1>${surah.name}</h1>
      <h3>﷽</h3>`

          for (const element of surah.ayahs) {

            const text = element.text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "");
            document.getElementById("sura-content1").innerHTML += `<span onclick="numbertext(${surahNumber} ,${element.numberInSurah})" class="sura-conten"  id="sura-conten${element.number}"> ${text}۝${toArabicNumbers(element.numberInSurah)}  </span> 
`
          }
        }
        );
    }
  }

  function numbertext(id1, id2) {
    let url = "https://api.alquran.cloud/v1/ayah/" + id1 + ":" + id2 + "/ar.alafasy"
    fetch(url)
      .then(res => res.json())
      .then(data => {

        let audio = data.data.audio;
        console.log(url);

        document.getElementById("nldjjln").innerHTML = `<audio src="${audio}" id="playBtn"></audio>`
        let playBtn = document.getElementById("playBtn");
        playBtn.play()

      })

  }
  function outlined() {
    let url = "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/" + surahNumber + ".mp3"

    let isActive = false;
    document.getElementById("material-symbols-outlined").onclick = function () {
      if (!isActive) {
        document.getElementById("nldjjln").innerHTML = `<audio src="${url}" id="outlined"></audio>`
        let playBtn = document.getElementById("outlined");
        playBtn.play()
        console.log(url);
      } else {



      }
      isActive = !isActive
    }
  }


}
if (document.getElementById("surah-content")) {

  const params = new URLSearchParams(window.location.search);
  var surahNumber = params.get("surah");

  if (surahNumber) {
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
      .then(res => res.json())
      .then(data => {
        const surah = data.data;
        document.getElementById("sura-content1").innerHTML = `
      <h1>${surah.name}</h1>
      <h3>﷽</h3>`

        for (const element of surah.ayahs) {

          const text = element.text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "");
          document.getElementById("sura-content1").innerHTML += `<span onclick="numbertext(${surahNumber} ,${element.numberInSurah})" class="sura-conten"  id="sura-conten${element.number}"> ${text}۝${toArabicNumbers(element.numberInSurah)}  </span> 
`
        }
      }
      );
  }
}

function numbertext(id1, id2) {
  let url = "https://api.alquran.cloud/v1/ayah/" + id1 + ":" + id2 + "/ar.alafasy"
  fetch(url)
    .then(res => res.json())
    .then(data => {

      let audio = data.data.audio;
      console.log(url);

      document.getElementById("nldjjln").innerHTML = `<audio src="${audio}" id="playBtn"></audio>`
      let playBtn = document.getElementById("playBtn");
      playBtn.play()

    })

}
function outlined() {
  let url = "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/" + surahNumber + ".mp3"

  let isActive = false;
  document.getElementById("material-symbols-outlined").onclick = function () {
    if (!isActive) {
      document.getElementById("nldjjln").innerHTML = `<audio src="${url}" id="outlined"></audio>`
      let playBtn = document.getElementById("outlined");
      playBtn.play()
      document.getElementById("material-symbols-outlined").innerText = "استمع ⏸"
      console.log(url);
    } else {
      let playBtn = document.getElementById("outlined");
      playBtn.pause()
      document.getElementById("material-symbols-outlined").innerText = "استمع ▶"
    }
    isActive = !isActive
  }
}
fetch("https://api.qurani.ai/gw/qh/v1/ayah/2:255/quran-uthmani", {
  method: "GET"
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
document.getElementById("menu").addEventListener("click", function () {
  document.getElementById("header2").style.display = "block"
  document.body.classList.remove("no-scroll");
  document.getElementById("header3").addEventListener("click", function () {
    document.getElementById("header2").style.display = "none"
  })
})