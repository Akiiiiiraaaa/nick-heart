import { useEffect, useRef } from "react";

type TextHeartProps = {
  onFinished: () => void;
};

const PHRASE = "maybe soon it will be you";

function TextHeart({ onFinished }: TextHeartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rotation = useRef({
    x: -0.15,
    y: 0,
  });

  const zoom = useRef(1);

  const dragging = useRef(false);

  const lastPointer = useRef({
    x: 0,
    y: 0,
  });

  const pinchDistance = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = 0;

    const resize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width =
        window.innerWidth * dpr;

      canvas.height =
        window.innerHeight * dpr;

      canvas.style.width =
        `${window.innerWidth}px`;

      canvas.style.height =
        `${window.innerHeight}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    const heartEquation = (
      x: number,
      y: number
    ) => {
      return (
        Math.pow(
          x * x + y * y - 1,
          3
        ) -
        x *
          x *
          Math.pow(y, 3)
      );
    };

    const insideHeart = (
      x: number,
      y: number
    ) => {
      return (
        heartEquation(x, y) <= 0
      );
    };

    /*
     * each particle contains the
     * WHOLE phrase, never individual letters
     */

    const basePoints: {
      x: number;
      y: number;
      z: number;
    }[] = [];

    for (
      let y = -1.18;
      y <= 1.12;
      y += 0.15
    ) {
      for (
        let x = -1.4;
        x <= 1.4;
        x += 0.34
      ) {
        if (insideHeart(x, y)) {
          basePoints.push({
            x,
            y,
            z:
              Math.sin(x * 4) *
              0.18 +
              Math.cos(y * 3) *
              0.12,
          });
        }
      }
    }

    /*
     * depth creates the 3D body
     */

    const points: {
      x: number;
      y: number;
      z: number;
    }[] = [];

    for (
      let layer = -4;
      layer <= 4;
      layer++
    ) {
      for (const point of basePoints) {
        points.push({
          x: point.x,
          y: point.y,
          z:
            point.z +
            layer * 0.48,
        });
      }
    }

    const rotate = (
      x: number,
      y: number,
      z: number
    ) => {
      const cosX = Math.cos(
        rotation.current.x
      );

      const sinX = Math.sin(
        rotation.current.x
      );

      const y1 =
        y * cosX -
        z * sinX;

      const z1 =
        y * sinX +
        z * cosX;

      const cosY = Math.cos(
        rotation.current.y
      );

      const sinY = Math.sin(
        rotation.current.y
      );

      const x2 =
        x * cosY +
        z1 * sinY;

      const z2 =
        -x * sinY +
        z1 * cosY;

      return {
        x: x2,
        y: y1,
        z: z2,
      };
    };

    const drawHeartOutline = (
      centerX: number,
      centerY: number,
      scale: number
    ) => {
      ctx.save();

      ctx.beginPath();

      const steps = 400;

      for (
        let i = 0;
        i <= steps;
        i++
      ) {
        const t =
          (i / steps) *
          Math.PI *
          2;

        const x =
          16 *
          Math.pow(
            Math.sin(t),
            3
          );

        const y =
          -(
            13 *
              Math.cos(t) -
            5 *
              Math.cos(2 * t) -
            2 *
              Math.cos(3 * t) -
            Math.cos(4 * t)
          );

        const rotated =
          rotate(
            x *
              scale *
              0.065,
            y *
              scale *
              0.065,
            3
          );

        const perspective =
          700 /
          (700 -
            rotated.z *
              0.45);

        const screenX =
          centerX +
          rotated.x *
            perspective;

        const screenY =
          centerY +
          rotated.y *
            perspective;

        if (i === 0) {
          ctx.moveTo(
            screenX,
            screenY
          );
        } else {
          ctx.lineTo(
            screenX,
            screenY
          );
        }
      }

      ctx.closePath();

      ctx.strokeStyle =
        "rgba(225,170,255,0.72)";

      ctx.lineWidth = 2;

      ctx.shadowBlur = 28;

      ctx.shadowColor =
        "rgba(195,70,255,0.95)";

      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      const width =
        window.innerWidth;

      const height =
        window.innerHeight;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /*
       * dark purple background
       */

      const background =
        ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          Math.max(
            width,
            height
          ) * 0.7
        );

      background.addColorStop(
        0,
        "#3b1252"
      );

      background.addColorStop(
        0.35,
        "#190a24"
      );

      background.addColorStop(
        0.75,
        "#08030d"
      );

      background.addColorStop(
        1,
        "#020107"
      );

      ctx.fillStyle =
        background;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * gentle automatic rotation
       */

      if (!dragging.current) {
        rotation.current.y +=
          0.0018;
      }

      const centerX =
        width / 2;

      const centerY =
        height / 2 + 5;

      const scale =
        Math.min(
          width,
          height
        ) *
        0.21 *
        zoom.current;

      /*
       * project 3D points
       */

      const projected =
        points
          .map((point) => {
            const rotated =
              rotate(
                point.x * scale,
                point.y * scale,
                point.z * scale
              );

            const perspective =
              700 /
              (700 -
                rotated.z *
                  0.45);

            return {
              x:
                centerX +
                rotated.x *
                  perspective,

              y:
                centerY +
                rotated.y *
                  perspective,

              z: rotated.z,

              perspective,
            };
          })
          .sort(
            (a, b) =>
              a.z - b.z
          );

      /*
       * whole phrase repeated
       * inside the heart
       */

      for (const point of projected) {
        const fontSize =
          Math.max(
            7,
            11 *
              point.perspective *
              zoom.current
          );

        ctx.save();

        ctx.font =
          `600 ${fontSize}px "Courier New", monospace`;

        ctx.textAlign =
          "center";

        ctx.textBaseline =
          "middle";

        if (point.z < 0) {
          ctx.fillStyle =
            "rgba(110,55,145,0.3)";

          ctx.shadowBlur = 5;

          ctx.shadowColor =
            "rgba(150,60,200,0.4)";
        } else {
          ctx.fillStyle =
            "rgba(246,220,255,0.97)";

          ctx.shadowBlur = 16;

          ctx.shadowColor =
            "rgba(195,70,255,0.95)";
        }

        ctx.fillText(
          PHRASE,
          point.x,
          point.y
        );

        ctx.restore();
      }

      /*
       * glowing heart outline
       */

      drawHeartOutline(
        centerX,
        centerY,
        scale
      );

      /*
       * floating sparkles
       */

      const time =
        Date.now() *
        0.00015;

      for (
        let i = 0;
        i < 35;
        i++
      ) {
        const angle =
          time +
          i * 1.75;

        const radius =
          Math.min(
            width,
            height
          ) *
          (0.31 +
            (i % 6) *
              0.028);

        const x =
          centerX +
          Math.cos(angle) *
            radius;

        const y =
          centerY +
          Math.sin(angle) *
            radius;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          1.1,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(225,175,255,0.6)";

        ctx.shadowBlur = 10;

        ctx.shadowColor =
          "#c66cff";

        ctx.fill();
      }

      ctx.shadowBlur = 0;

      animationFrame =
        requestAnimationFrame(
          draw
        );
    };

    draw();

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  const startDrag = (
    x: number,
    y: number
  ) => {
    dragging.current = true;

    lastPointer.current = {
      x,
      y,
    };
  };

  const moveDrag = (
    x: number,
    y: number
  ) => {
    if (!dragging.current) {
      return;
    }

    const dx =
      x -
      lastPointer.current.x;

    const dy =
      y -
      lastPointer.current.y;

    rotation.current.y +=
      dx * 0.008;

    rotation.current.x +=
      dy * 0.008;

    rotation.current.x =
      Math.max(
        -1.3,
        Math.min(
          1.3,
          rotation.current.x
        )
      );

    lastPointer.current = {
      x,
      y,
    };
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  const zoomIn = () => {
    zoom.current =
      Math.min(
        3,
        zoom.current + 0.2
      );
  };

  const zoomOut = () => {
    zoom.current =
      Math.max(
        0.5,
        zoom.current - 0.2
      );
  };

  const reset = () => {
    zoom.current = 1;

    rotation.current = {
      x: -0.15,
      y: 0,
    };
  };

  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    if (
      event.touches.length === 1
    ) {
      const touch =
        event.touches[0];

      startDrag(
        touch.clientX,
        touch.clientY
      );
    }

    if (
      event.touches.length === 2
    ) {
      dragging.current = false;

      const first =
        event.touches[0];

      const second =
        event.touches[1];

      pinchDistance.current =
        Math.hypot(
          first.clientX -
            second.clientX,
          first.clientY -
            second.clientY
        );
    }
  };

  const handleTouchMove = (
    event: React.TouchEvent
  ) => {
    if (
      event.touches.length === 1
    ) {
      const touch =
        event.touches[0];

      moveDrag(
        touch.clientX,
        touch.clientY
      );
    }

    if (
      event.touches.length === 2
    ) {
      const first =
        event.touches[0];

      const second =
        event.touches[1];

      const distance =
        Math.hypot(
          first.clientX -
            second.clientX,
          first.clientY -
            second.clientY
        );

      if (
        pinchDistance.current !==
        null
      ) {
        const difference =
          distance -
          pinchDistance.current;

        zoom.current =
          Math.max(
            0.5,
            Math.min(
              3,
              zoom.current +
                difference *
                  0.004
            )
          );
      }

      pinchDistance.current =
        distance;
    }
  };

  const handleTouchEnd = () => {
    dragging.current = false;
    pinchDistance.current =
      null;
  };

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#020107",
        touchAction: "none",
        userSelect: "none",
      }}
      onMouseDown={(event) => {
        startDrag(
          event.clientX,
          event.clientY
        );
      }}
      onMouseMove={(event) => {
        moveDrag(
          event.clientX,
          event.clientY
        );
      }}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={(event) => {
        zoom.current =
          Math.max(
            0.5,
            Math.min(
              3,
              zoom.current +
                (event.deltaY < 0
                  ? 0.12
                  : -0.12)
            )
          );
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 28,
          left: 0,
          width: "100%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            color: "#dfb1f8",
            fontFamily:
              '"Courier New", monospace',
            fontSize: 10,
            letterSpacing: 4,
            textShadow:
              "0 0 18px rgba(199,95,255,0.9)",
          }}
        >
          HEART_PROTOCOL
        </div>

        <div
          style={{
            marginTop: 9,
            color: "#9b78a7",
            fontFamily:
              '"Courier New", monospace',
            fontSize: 11,
          }}
        >
          maybe soon it will be you
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 18,
          bottom: 22,
          color: "#765b82",
          fontFamily:
            '"Courier New", monospace',
          fontSize: 9,
          letterSpacing: 1,
          pointerEvents: "none",
        }}
      >
        drag to rotate • pinch / scroll
        to zoom
      </div>

      <div
        style={{
          position: "absolute",
          right: 18,
          bottom: 18,
          display: "flex",
          gap: 6,
          zIndex: 20,
        }}
      >
        <button
          type="button"
          style={buttonStyle}
          onClick={(event) => {
            event.stopPropagation();
            zoomOut();
          }}
        >
          −
        </button>

        <button
          type="button"
          style={buttonStyle}
          onClick={(event) => {
            event.stopPropagation();
            zoomIn();
          }}
        >
          +
        </button>

        <button
          type="button"
          style={buttonStyle}
          onClick={(event) => {
            event.stopPropagation();
            reset();
          }}
        >
          reset
        </button>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onFinished();
        }}
        style={{
          position: "absolute",
          bottom: 67,
          left: "50%",
          transform:
            "translateX(-50%)",
          padding: "12px 28px",
          border:
            "1px solid rgba(220,170,255,0.5)",
          borderRadius: 999,
          background:
            "rgba(83,28,112,0.45)",
          color: "#efd8ff",
          fontFamily:
            '"Courier New", monospace',
          fontSize: 11,
          cursor: "pointer",
          boxShadow:
            "0 0 30px rgba(170,80,230,0.25)",
          zIndex: 20,
        }}
      >
        continue ♡
      </button>
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  border:
    "1px solid rgba(210,160,255,0.35)",
  background:
    "rgba(65,25,90,0.55)",
  color: "#e2c3ef",
  borderRadius: 8,
  padding: "7px 10px",
  fontFamily:
    '"Courier New", monospace',
  cursor: "pointer",
};

export default TextHeart;