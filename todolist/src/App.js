import React, { useState } from 'react'
import { GiHornedHelm } from 'react-icons/gi'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'

function App() {
  const [yapılacaklar, setYapılacaklar] = useState([]) // yapılacaklar listem
  const [input, setInput] = useState('') //formun inputu 


  const handleSubmit = (e) => { //enter tuşuna basınca
    e.preventDefault()
    const yeniyapılacak = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      tamamlandı: false
    }
    setYapılacaklar([...yapılacaklar, yeniyapılacak])
    setInput('')
  }


  const yapılacaklarısil = (id) => { {/*tüm yapılacakları ayrı bir listeye koy => bastığın eleman hariç*/}
    let filteredyapılacaklar = [...yapılacaklar].filter((yapılacaklar) => yapılacaklar.id !== id)
    setYapılacaklar(filteredyapılacaklar)
  }

  
  const yapılmıs = (id) => { {/*tüm yapılacakların üzerinden geç => id bastığın elemanla uyuşuyorsa => elemanın tamamlandısının değerini değiştir*/}
    setYapılacaklar(
      yapılacaklar.map(yapılacak => (
        yapılacak.id === id ? { ...yapılacak, tamamlandı: !yapılacak.tamamlandı } : yapılacak
      ))
    )
  }

  const tarih = new Date() //gün objesi oluştur 
  
  const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"] //günler listesi
  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"] //aylar listesi


  return (
    <div className='app'>
      <div className="container">
        <h1><GiHornedHelm /> Yapılacaklar Listem</h1> 

        <div className="tarih">{/*gün objesini kullan*/}
          <p>{days[tarih.getDay()]}</p> 
          <p>{tarih.getDate()},</p>
          <p>{months[tarih.getMonth()]}</p>
          <p>{tarih.getFullYear()}</p>
        </div>
        
        <form onSubmit={handleSubmit}> {/*forma fonksiyonu ata*/}
          <div className="form-input">
            <AiOutlinePlus className='icon' />
            <input
              value={input}
              onChange={e => setInput(e.target.value)} 
              placeholder='Yapılacakları girin'
              type="text" />
          </div>
          {/*input değişkenini formun inputuna eşitle*/}
        </form>

        <div>
          {yapılacaklar.map(yapılacak => (
            <div className={`yapılacak-row ${yapılacak.tamamlandı ? 'tamamlandı' : ''}`} key={yapılacak.id} onDoubleClick={() => yapılmıs(yapılacak.id)} >
              <p>{yapılacak.text} </p>
              <AiOutlineClose onClick={() => yapılacaklarısil(yapılacak.id)} className='icon' />
            </div>
          ))}
        </div>

          <p className='length'>{(yapılacaklar < 1) ? 'Yapılacak bir işin yok 🎉' : `Yapılacaklar: ${yapılacaklar.length}`}</p>
      </div>
    </div>
  );
}

export default App;
