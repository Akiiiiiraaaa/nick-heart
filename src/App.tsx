import { useRef, useState } from "react";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleContinue = async () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.8;

      try {
        await audioRef.current.play();
      } catch (error) {
        console.log("audio waiting for interaction:", error);
      }
    }

    setShowMessage(true);
  };

  const stars = Array.from({ length: 45 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 61) % 100}%`,
    delay: `${(i % 7) * 0.4}s`,
    size: i % 5 === 0 ? 4 : 2,
  }));

  const hearts = Array.from({ length: 12 }, (_, i) => ({
    left: `${(i * 47 + 8) % 94}%`,
    top: `${(i * 71 + 5) % 92}%`,
    delay: `${(i % 6) * 0.7}s`,
    size: 12 + (i % 4) * 5,
  }));

  if (!showMessage) {
    return (
      <main className="opening">
        <h1>maybe soon it will be you.</h1>

        <p>a little something for you</p>

        <button onClick={handleContinue}>continue</button>

        <style>{`
          * {
            box-sizing: border-box;
          }

          html,
          body,
          #root {
            margin: 0;
            padding: 0;
            width: 100%;
            min-height: 100%;
          }

          body {
            background: #07020c;
          }

          .opening {
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background:
              radial-gradient(
                circle at center,
                #291038 0%,
                #12061b 42%,
                #07020c 100%
              );

            color: #f3ddff;
          }

          .opening::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;

            background:
              radial-gradient(
                circle at 20% 20%,
                rgba(191, 91, 255, 0.12),
                transparent 28%
              ),
              radial-gradient(
                circle at 80% 80%,
                rgba(151, 61, 215, 0.1),
                transparent 30%
              );
          }

          .opening h1 {
            position: relative;
            z-index: 2;

            margin: 0;
            padding: 0 24px;

            text-align: center;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: clamp(32px, 6vw, 72px);
            font-weight: 400;
            line-height: 1.2;

            color: #f3ddff;

            text-shadow:
              0 0 20px rgba(218, 142, 255, 0.35),
              0 0 60px rgba(159, 61, 211, 0.25);
          }

          .opening p {
            position: relative;
            z-index: 2;

            margin: 18px 0 0;

            color: rgba(207, 166, 224, 0.65);

            font-family:
              "Courier New",
              monospace;

            font-size: 10px;
            letter-spacing: 4px;
            text-transform: uppercase;
          }

          .opening button {
            position: relative;
            z-index: 2;

            margin-top: 45px;
            padding: 13px 30px;

            border: 1px solid rgba(225, 177, 255, 0.35);
            border-radius: 999px;

            background: rgba(74, 27, 96, 0.35);

            color: #ecd4fa;

            font-family:
              "Courier New",
              monospace;

            font-size: 11px;
            letter-spacing: 2px;

            cursor: pointer;

            transition:
              transform 0.3s ease,
              background 0.3s ease,
              box-shadow 0.3s ease;

            box-shadow:
              0 0 25px rgba(177, 72, 228, 0.12);
          }

          .opening button:hover {
            transform: translateY(-3px);

            background: rgba(105, 42, 132, 0.5);

            box-shadow:
              0 0 35px rgba(190, 88, 240, 0.28);
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="message-screen">
      <audio
        ref={audioRef}
        src="/sweet-boy.mp3"
        loop
        autoPlay
      />

      {stars.map((star, index) => (
        <span
          key={`star-${index}`}
          className="floating-star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
          }}
        />
      ))}

      {hearts.map((heart, index) => (
        <span
          key={`heart-${index}`}
          className="floating-heart"
          style={{
            left: heart.left,
            top: heart.top,
            fontSize: `${heart.size}px`,
            animationDelay: heart.delay,
          }}
        >
          ♡
        </span>
      ))}

      <div className="message-container">
        <header className="message-header">
          <div className="message-label">
            HEART_PROTOCOL
          </div>

          <h1>maybe soon it will be you.</h1>

          <div className="message-label">
            MESSAGE_DECRYPTED ♡
          </div>
        </header>

        <article className="message-body">
          <p className="recipient">
            for nick.
          </p>

          <p>
            hi nickkkkkkk,
          </p>

          <p>
            i wanna tell u something na medyo matagal ko
            nang gustong sabihin, kahit ilang days pa lang
            tayo magkakilala and nag-uusap. honestly, ang
            funny isipin how someone can enter your life so
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

          <p className="special">
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

          <p className="special">
            and speaking of uniquely you...
          </p>

          <p className="special">
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

          <p>
            HAHAHAHA.
          </p>

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

          <p className="final">
            i'm proud of you, nick.
          </p>

          <p className="final">
            and i'm really, really happy i got to know you.
          </p>

          <div className="signature">
            — from someone who's slowly becoming fond of
            you ♡
          </div>
        </article>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          background: #07020c;
        }

        .message-screen {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;

          padding: 70px 18px;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(137, 52, 181, 0.2),
              transparent 34%
            ),
            radial-gradient(
              circle at 0% 100%,
              rgba(94, 35, 126, 0.16),
              transparent 35%
            ),
            radial-gradient(
              circle at 100% 70%,
              rgba(151, 55, 192, 0.12),
              transparent 30%
            ),
            linear-gradient(
              145deg,
              #050108,
              #100519 48%,
              #050108
            );

          color: #f2ddff;
        }

        .message-screen::before {
          content: "";
          position: fixed;
          inset: 0;

          pointer-events: none;

          background-image:
            radial-gradient(
              circle,
              rgba(232, 199, 255, 0.7) 1px,
              transparent 1.5px
            );

          background-size: 90px 90px;
          opacity: 0.18;
        }

        .floating-star {
          position: fixed;
          z-index: 1;

          border-radius: 50%;

          background: rgba(238, 215, 255, 0.85);

          box-shadow:
            0 0 8px rgba(216, 158, 255, 0.9);

          pointer-events: none;

          animation:
            twinkle 3s ease-in-out infinite;
        }

        .floating-heart {
          position: fixed;
          z-index: 1;

          color: rgba(213, 139, 245, 0.5);

          text-shadow:
            0 0 12px rgba(193, 87, 237, 0.5);

          pointer-events: none;

          animation:
            floatHeart 7s ease-in-out infinite;
        }

        .message-container {
          position: relative;
          z-index: 5;

          width: min(780px, 94vw);

          margin: 0 auto;

          padding: 40px clamp(22px, 6vw, 65px);

          border: 1px solid rgba(220, 170, 255, 0.18);
          border-radius: 26px;

          background:
            linear-gradient(
              145deg,
              rgba(32, 10, 43, 0.78),
              rgba(8, 3, 13, 0.9)
            );

          box-shadow:
            0 0 40px rgba(155, 57, 204, 0.1),
            inset 0 0 30px rgba(223, 166, 255, 0.025);

          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);

          opacity: 0;

          animation:
            messageAppear 1.4s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .message-header {
          text-align: center;

          padding-bottom: 30px;

          border-bottom:
            1px solid
            rgba(218, 169, 255, 0.12);
        }

        .message-label {
          color: #a977bc;

          font-family:
            "Courier New",
            monospace;

          font-size: 9px;
          letter-spacing: 4px;
        }

        .message-title {
          margin: 22px 0 0;
        }

        .message-header h1 {
          margin: 22px 0;

          color: #f0d5ff;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(28px, 5vw, 48px);
          font-weight: 400;
          line-height: 1.2;

          text-shadow:
            0 0 22px rgba(208, 119, 255, 0.3);
        }

        .message-body {
          padding-top: 38px;
        }

        .message-body p {
          margin: 0 0 25px;

          color: rgba(244, 227, 253, 0.88);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(15px, 1.8vw, 18px);
          line-height: 1.9;
        }

        .message-body .recipient {
          margin-bottom: 35px;

          color: #efd5ff;

          font-size: clamp(40px, 8vw, 70px);

          line-height: 1;

          text-shadow:
            0 0 25px rgba(210, 125, 255, 0.35);
        }

        .message-body .special {
          color: #dcb0f1;
        }

        .message-body .confession {
          margin: 40px 0;

          text-align: center;

          color: #f0caff;

          font-size: clamp(30px, 5vw, 47px);

          line-height: 1.25;

          text-shadow:
            0 0 20px rgba(214, 125, 255, 0.5),
            0 0 50px rgba(157, 55, 210, 0.25);
        }

        .message-body .final {
          color: #e5c1f4;

          font-size: clamp(18px, 2.5vw, 24px);
        }

        .signature {
          margin-top: 42px;

          padding-top: 25px;

          border-top:
            1px solid
            rgba(218, 169, 255, 0.12);

          color: #b98bc9;

          font-family:
            "Courier New",
            monospace;

          font-size: 10px;

          line-height: 1.8;

          text-align: right;
        }

        @keyframes floatHeart {
          0%,
          100% {
            transform:
              translateY(0)
              rotate(-8deg);

            opacity: 0.2;
          }

          50% {
            transform:
              translateY(-25px)
              rotate(8deg);

            opacity: 0.65;
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(0.7);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.5);
          }
        }

        @keyframes messageAppear {
          from {
            opacity: 0;

            transform:
              translateY(35px)
              scale(0.97);

            filter: blur(10px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);

            filter: blur(0);
          }
        }

        @media (max-width: 600px) {
          .message-screen {
            padding: 45px 12px;
          }

          .message-container {
            width: 100%;

            padding:
              30px 21px;

            border-radius: 21px;
          }

          .message-body p {
            font-size: 15px;
            line-height: 1.85;
          }

          .message-body .confession {
            font-size: 32px;
          }

          .signature {
            text-align: center;
          }
        }
      `}</style>
    </main>
  );
}

export default App;