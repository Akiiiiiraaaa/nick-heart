
import { useRef, useState } from "react";
import TextHeart from "./components/TextHeart";


function App() {
  const [showLetter, setShowLetter] = useState(false);
  const [fading, setFading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleContinue = async () => {
    setFading(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.8;

      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("music error:", error);
      }
    }

    window.setTimeout(() => {
      setShowLetter(true);
    }, 900);
  };

  if (showLetter) {
    return (
      <main className="letter-screen">
        <audio
          ref={audioRef}
          src="/sweet-boy.mp3"
          loop
          preload="auto"
        />

        <div className="letter-glow" />

        <article className="letter">
          <div className="letter-top">
            <span>HEART_PROTOCOL</span>
            <span>MESSAGE_DECRYPTED ♡</span>
          </div>

          <div className="letter-content">
            <p className="recipient">for nick.</p>

            <p>hi nickkkkkkk,</p>

            <p>
              i wanna tell u something na medyo matagal ko nang
              gustong sabihin, kahit ilang days pa lang tayo
              magkakilala and nag-uusap. honestly, ang funny
              isipin how someone can enter your life so
              unexpectedly and somehow, in such a short amount
              of time, already make a small space for themselves
              in your thoughts.
            </p>

            <p>
              i’m genuinely so proud of you, nick. maybe i don’t
              know every chapter of your life yet, and maybe
              there are still so many things about you that i
              have yet to discover, but from what i’ve seen so
              far, i really admire the person you are.
            </p>

            <p>
              i hope you never lose that spark in you—the way
              you talk, the way you laugh, the way you carry
              yourself, and even the little things you probably
              don’t realize make you lovable.
            </p>

            <p>
              i really love how you make me smile without even
              trying too hard. there’s something about talking
              to you that makes ordinary moments feel a little
              lighter. and your voice? ewan ko ba sayo HAHAHAHA,
              but somehow, it softens me.
            </p>

            <p>
              parang kahit ang ingay ng thoughts ko, nagiging
              tahimik sila for a while whenever i hear you.
              i think that’s one of the things i appreciate
              about you most—you make me feel something without
              having to force anything.
            </p>

            <p>
              and maybe this is a little embarrassing to admit,
              pero i like the way you make me feel safe enough
              to be soft. i like that i can be silly around you,
              dramatic, clingy, or just completely random, and
              somehow it still feels natural.
            </p>

            <p>
              i don't think connection is always measured by how
              long you've known someone. sometimes, it's about
              how easily two people can make each other feel
              understood, appreciated, and comfortable enough to
              be themselves.
            </p>

            <p>
              i hope you never lose your spark, baby. please
              don't let the difficult days convince you that you
              have to become less of yourself just to survive
              them.
            </p>

            <p>
              i hope you continue becoming the person you want
              to be, even when life gets confusing or heavy.
              you deserve to grow without having to dim the
              parts of you that make you uniquely you.
            </p>

            <p className="funny">
              and speaking of uniquely you...
            </p>

            <p className="funny">
              tangkad-tangkad mo tapos gusto magpa-baby
              HAHAHAHAHAHA. tapos nanghihina sa kiss???
              sir, ano ba talaga? ang tapang ng height pero
              ang lambot ng system HAHAHAHAHA.
            </p>

            <p>
              pero seriously, bawasan mo rin pagiging
              matampuhin mo, plez. naiiyak ako e. hindi ko
              alam kung matatawa ako, maiinis, or kukulitin
              ka na lang hanggang mawala tampo mo.
            </p>

            <p>
              you’re so cute when you’re like that, pero
              minsan gusto kitang kalabitin and sabihin na
              “okay na, baby, halika na dito” HAHAHAHA.
            </p>

            <p>
              i know we’re still getting to know each other,
              so i don't wanna rush anything or put unnecessary
              meaning into something that's still beginning.
              i just want to appreciate whatever this is for
              what it is right now.
            </p>

            <p>
              i like getting to know you slowly. i like
              discovering the little things about you, the
              stories behind your personality, the things that
              make you happy, the things that make you quiet,
              and even the parts of you that you don't
              immediately show everyone.
            </p>

            <p>
              and if this is me confessing something, then i
              guess i'll just say it honestly:
            </p>

            <p className="confession">
              i like you, nick.
            </p>

            <p>
              more than i initially expected to. i like your
              presence, your voice, your humor, your softness,
              your little tampo moments, and even your
              ridiculously cute way of wanting to be babied
              despite being so tall.
            </p>

            <p>HAHAHAHA.</p>

            <p>
              i don't know exactly where this will lead, and i
              don't think i need to know yet. for now, i'm just
              genuinely happy that i met you.
            </p>

            <p>
              i'm happy that somehow, in the middle of
              everything happening in our lives, our paths
              crossed.
            </p>

            <p>
              so please keep being you, okay? keep your spark.
              keep laughing. keep being soft. keep being
              annoyingly matampuhin sometimes—pero please,
              moderation lang HAHAHAHA.
            </p>

            <p>
              and whenever you start doubting yourself, i hope
              you remember that there is someone who genuinely
              sees something beautiful in the person you are
              becoming.
            </p>

            <p className="final-message">
              i'm proud of you, nick.
            </p>

            <p className="final-message">
              and i'm really, really happy i got to know you.
            </p>

            <div className="signature">
              — from someone who's slowly becoming fond of you ♡
            </div>
          </div>

          <div className="letter-bottom">
            <span>END_OF_MESSAGE</span>
            <span>♡</span>
          </div>
        </article>
      </main>
    );
  }

  return (
    <div
      className={
        fading
          ? "heart-wrapper fade-out"
          : "heart-wrapper"
      }
    >
      <TextHeart onFinished={handleContinue} />
    </div>
  );
}

export default App;
