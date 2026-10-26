
'use client';

import { useRef, useState, type FormEvent } from 'react';

const PIN = '271010';

const flowers = [
  ['🌷', 'Tulip', 'Semoga hari-harimu selalu dipenuhi kebahagiaan.'],
  ['🌹', 'Rose', 'Kamu membuat hari biasa terasa istimewa.'],
  ['🌻', 'Sunflower', 'Semoga kamu selalu punya alasan untuk tersenyum.'],
  ['🌸', 'Sakura', 'Semoga hal-hal indah selalu menemukan jalan menuju kamu.'],
  ['🌼', 'Daisy', 'Jangan lupa, kamu punya banyak hal indah untuk dirayakan.'],
  ['💐', 'Bouquet', 'Satu buket bunga untuk seseorang yang spesial. Happy birthday, Acaa!'],
];

const memories = [
  'First Time We Met',
  'Our First Conversation',
  'Our First Outing',
  'Beautiful Silence Together',
  'Your Very Special Birthday',
];

const notes = [
  'Terima kasih sudah menjadi bagian dari cerita indah ini. 🌷',
  'Semoga senyum kamu selalu punya alasan untuk hadir. 💗',
  'Aku berharap banyak hal baik datang ke hidupmu. 🌸',
  'Semoga semua impianmu perlahan menjadi nyata. ✨',
  'Hari ini adalah tentang kamu. Nikmati setiap detiknya! 🎂',
  'Kamu pantas mendapatkan banyak kebahagiaan. 🩷',
  'Semoga tahun ini membawa cerita baru yang indah. 🌹',
  'Terima kasih untuk setiap kenangan yang kita buat. 💌',
];

export default function Home() {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [flowerMessage, setFlowerMessage] = useState('');
  const [letterOpen, setLetterOpen] = useState(false);
  const [note, setNote] = useState('');
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function checkPin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pin === PIN) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  function shakeJar() {
    const choices = notes.filter((item) => item !== note);
    const list = choices.length ? choices : notes;
    setNote(list[Math.floor(Math.random() * list.length)]);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff5f7] text-[#754553]">
      <audio ref={audioRef} src="/pretty.mp3" loop />

      {!unlocked ? (
        <section className="flex min-h-screen items-center justify-center px-5 py-10">
          <div className="w-full max-w-sm rounded-[32px] border border-pink-200 bg-white/90 p-8 text-center shadow-xl shadow-pink-200/40">
            <div className="aca-floating mb-5 text-6xl">💗</div>
            <p className="text-xs uppercase tracking-[0.3em] text-pink-400">
              a little surprise
            </p>
            <h1 className="my-5 font-serif text-3xl italic text-[#b45d7a]">
              for you, my love
            </h1>
            <p className="mb-5 text-sm text-[#a47785]">
              Enter your secret PIN ♡
            </p>
            <form onSubmit={checkPin} className="space-y-4">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                minLength={6}
                autoComplete="off"
                required
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setError(false);
                }}
                placeholder="••••••"
                aria-label="Six digit PIN"
                className="w-full rounded-2xl border border-pink-200 bg-pink-50 px-4 py-4 text-center text-2xl tracking-[0.7em] outline-none focus:border-pink-400"
              />
              {error && (
                <p className="text-sm text-rose-500">
                  PIN-nya belum tepat, coba lagi ya 💌
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-full bg-[#e99bb7] px-6 py-3 text-white transition hover:bg-[#d982a2]"
              >
                Open my surprise ♡
              </button>
            </form>
            <p className="mt-6 text-xs text-pink-300">
              made with love 🌷
            </p>
          </div>
        </section>
      ) : !giftOpened ? (
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-pink-400">
            something special for you
          </p>
          <h1 className="mb-8 font-serif text-3xl italic text-[#b45d7a]">
            A little gift for Acaa
          </h1>
          <button
            onClick={() => setGiftOpened(true)}
            className="aca-floating rounded-3xl p-5 text-8xl transition hover:scale-110"
            aria-label="Open birthday gift"
          >
            🎁
          </button>
          <p className="mt-7 text-sm text-[#a47785]">
            Tap the gift to open your surprise
          </p>
          <p className="mt-5 text-2xl">♡ 🌸 ♡</p>
        </section>
      ) : (
        <>
          <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 py-20 text-center">
            <span className="aca-floating mb-5 text-5xl">🎀</span>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-pink-400">
              a day made just for you
            </p>
            <h1 className="font-serif text-5xl leading-tight text-[#bd6887] sm:text-7xl">
              Happy Birthday
              <br />
              <span className="italic">Acaa ♡</span>
            </h1>
            <p className="mt-6 text-sm tracking-wide text-[#a47785]">
              August 27 · The Most Special Day
            </p>
            <div className="mt-10 text-3xl">🌷 🩷 🌷</div>
            <p className="mt-10 animate-pulse text-xs text-pink-400">
              ↓ scroll to discover your gifts ↓
            </p>
          </section>

          <section className="mx-auto max-w-5xl px-5 py-20 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-pink-400">
              a little something for you
            </p>
            <h2 className="font-serif text-3xl text-[#bd6887] sm:text-4xl">
              My First Gift
            </h2>
            <p className="mt-3 text-sm tracking-[0.25em] text-[#c88a9f]">
              A DIGITAL BOUQUET
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {flowers.map(([emoji, name, message]) => (
                <button
                  key={name}
                  onClick={() => setFlowerMessage(message)}
                  className="rounded-3xl border border-pink-100 bg-white/80 p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <span className="block text-5xl">{emoji}</span>
                  <span className="mt-3 block font-serif text-lg text-[#bd6887]">
                    {name}
                  </span>
                  <span className="mt-1 block text-xs text-pink-300">
                    tap your flower ♡
                  </span>
                </button>
              ))}
            </div>
            {flowerMessage && (
              <div className="mt-6 rounded-3xl border border-pink-200 bg-white p-6">
                <p className="text-sm leading-7">{flowerMessage}</p>
                <button
                  onClick={() => setFlowerMessage('')}
                  className="mt-4 text-sm text-pink-400 underline"
                >
                  Close ♡
                </button>
              </div>
            )}
          </section>

          <section className="bg-[#fce8ee] px-5 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-pink-400">
                written from my heart
              </p>
              <h2 className="font-serif text-3xl text-[#bd6887]">
                A LETTER FOR YOU
              </h2>
              <button
                onClick={() => setLetterOpen(!letterOpen)}
                className="mx-auto mt-10 block w-full max-w-md border border-[#e8c9b7] bg-[#fffaf0] p-7 text-left shadow-lg"
              >
                <div className="mb-5 text-center text-4xl">💌</div>
                <p className="text-center font-serif text-xl italic text-[#a66e7d]">
                  Dear Acaa,
                </p>
                {letterOpen ? (
                  <p className="mt-5 whitespace-pre-line text-sm leading-8 text-[#795c5c]">
                    Selamat ulang tahun, Acaa. 🩷{"\n\n"}
                    Semoga di umur yang baru ini kamu selalu diberi kesehatan,
                    kebahagiaan, dan kemudahan dalam meraih semua impianmu.
                    Terima kasih sudah menjadi bagian dari cerita dan kenangan
                    yang berarti.{"\n\n"}
                    Semoga hari ini dipenuhi senyum, kejutan manis, dan hal-hal
                    baik. Jangan lupa bahagia, ya. 🌷{"\n\n"}
                    With love, ♡
                  </p>
                ) : (
                  <p className="mt-5 text-center text-sm text-[#a47785]">
                    Tap this letter to read your message ♡
                  </p>
                )}
              </button>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-5 py-20 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-pink-400">
              little moments, big feelings
            </p>
            <h2 className="font-serif text-3xl text-[#bd6887]">
              OUR PHOTO MEMORY
            </h2>
            <p className="mt-3 text-sm text-[#a47785]">
              Every picture holds a little piece of our story.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={i}
                  className="rounded-md bg-white p-3 pb-5 shadow-md transition hover:-translate-y-1"
                >
                  <img
                    src={`/${i + 1}.jpeg`}
                    alt={`Memory ${i + 1}`}
                    className="aspect-[4/5] w-full rounded-sm object-cover"
                  />
                  <p className="mt-3 font-serif text-sm italic text-[#a47785]">
                    Memory no. {i + 1} ♡
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#fce8ee] px-5 py-20 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-pink-400">
              every chapter matters
            </p>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-relaxed text-[#bd6887]">
              MEMORIES WE'VE WRITTEN TOGETHER
            </h2>
            <div className="mx-auto mt-10 max-w-lg space-y-5">
              {memories.map((memory, i) => (
                <div
                  key={memory}
                  className="rounded-2xl border border-pink-100 bg-white/80 p-6"
                >
                  <p className="text-xs text-pink-300">
                    CHAPTER {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-[#bd6887]">
                    {memory}
                  </h3>
                  <p className="mt-2 text-xs text-[#a47785]">
                    A little memory to keep forever ♡
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-5 py-20 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-pink-400">
              songs that remind me of you
            </p>
            <h2 className="font-serif text-3xl text-[#bd6887]">
              Special Playlist
            </h2>
            <div className="mx-auto mt-8 max-w-sm rounded-3xl border border-pink-100 bg-white p-7 shadow-lg shadow-pink-100">
              <div className="aca-floating text-6xl">🎧</div>
              <p className="mt-5 font-serif text-xl">A little melody for you</p>
              <p className="mt-2 text-sm text-[#a47785]">
                A song to make your day sweeter ♡
              </p>
              <button
                onClick={toggleMusic}
                className="mt-6 rounded-full bg-[#e99bb7] px-8 py-3 text-white"
              >
                {playing ? '❚❚ Pause music' : '▶ Play music'}
              </button>
              <p className="mt-3 text-xs text-pink-300">
                Music file: public/pretty.mp3
              </p>
            </div>
          </section>

          <section className="bg-[#fce8ee] px-5 py-20 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-pink-400">
              little things worth remembering
            </p>
            <h2 className="mx-auto max-w-xl font-serif text-3xl leading-relaxed text-[#bd6887]">
              REASONS I'M GRATEFUL TO KNOW YOU
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#a47785]">
              A tiny jar filled with little reminders and wishes just for you.
            </p>
            <button
              onClick={shakeJar}
              className="aca-floating mt-8 block w-full text-8xl"
              aria-label="Shake the jar for a message"
            >
              🫙
            </button>
            <p className="mt-5 text-sm text-[#a47785]">
              Tap the jar to discover a little message ♡
            </p>
            {note && (
              <div className="mx-auto mt-6 max-w-md rounded-2xl border border-pink-200 bg-[#fffaf0] p-6">
                <span className="text-3xl">💌</span>
                <p className="mt-3 font-serif text-lg leading-8">{note}</p>
              </div>
            )}
          </section>

          <footer className="px-5 py-14 text-center">
            <div className="text-3xl">🌸 ♡ 🌸</div>
            <p className="mt-5 font-serif text-2xl italic text-[#bd6887]">
              Once again, happy birthday, Acaa.
            </p>
            <p className="mt-3 text-sm text-[#a47785]">
              May your days always be filled with love.
            </p>
            <button
              onClick={toggleMusic}
              className="mt-6 text-sm text-pink-400 underline"
            >
              {playing ? 'Pause our song' : 'Play our song ♡'}
            </button>
            <p className="mt-10 text-xs text-pink-300">
              made with love, just for you ♡
            </p>
          </footer>
        </>
      )}
    </main>
  );
}
