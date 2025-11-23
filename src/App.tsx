import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const confettiPalette = ["#FF006E", "#FB5607", "#FFBE0B", "#8338EC", "#3A86FF", "#FF4365", "#FB85FF", "#00D9FF"];

const heroCandyPalette = ["#FF1493", "#FFB6C1", "#FF69B4", "#00CED1", "#7B68EE", "#FFDF00", "#FF6347", "#20B2AA"];

type ConfettiPiece = {
  id: string;
  offsetX: number;
  offsetY: number;
  rotation: number;
  delay: number;
  color: string;
};

type CandyJar = {
  id: string;
  name: string;
  flavor: string;
  accentClass: string;
  description: string;
  sweets: string[];
};

type Testimonial = {
  name: string;
  title: string;
  quote: string;
  color: string;
};

type QuestOption = {
  id: string;
  label: string;
  description: string;
};

const candyJars: CandyJar[] = [
  {
    id: "nebula-nibbles",
    name: "Nebula Nibbles",
    flavor: "Cosmic Berry Swirl",
    accentClass: "from-[#8338EC] via-[#FB5607] to-[#FF1493]",
    description: "A galaxy of popping candy clusters that shimmer and sparkle with every bite.",
    sweets: ["#8338EC", "#FF1493", "#FB5607", "#FFB6C1"],
  },
  {
    id: "glow-glaze",
    name: "Glow Glaze Gems",
    flavor: "Electric Citrus",
    accentClass: "from-[#FFBE0B] via-[#3A86FF] to-[#00D9FF]",
    description: "Translucent gems that crackle into citrus fizz and rainbow sugar dust.",
    sweets: ["#FFBE0B", "#00D9FF", "#3A86FF", "#7B68EE"],
  },
  {
    id: "bubble-bonanza",
    name: "Bubble Bonanza",
    flavor: "Tropical Bubbleblast",
    accentClass: "from-[#FF69B4] via-[#20B2AA] to-[#FFB6C1]",
    description: "Chewy spheres bursting with tropical mist and a shower of glitter sprinkles.",
    sweets: ["#FF69B4", "#FFB6C1", "#20B2AA", "#7B68EE"],
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Lila Sprinkle",
    title: "Chief Sweet Officer, Sugar Syndicate",
    quote:
      "Candy Heaven's treats are so dazzling our office snack table turned into a full-time celebration. The lollipop lounge is now our official meeting room!",
    color: "#FF1493",
  },
  {
    name: "Nova Crunch",
    title: "Galaxy Entertainer",
    quote:
      "The Glow Glaze Gems light up my backstage rider. Fans chase me down just to trade autographs for their next handful!",
    color: "#00D9FF",
  },
  {
    name: "Benny Bounce",
    title: "Professional Party Curator",
    quote:
      "I've traded confetti cannons for Candy Heaven jars. The spill animation alone gets guests squealing before we even serve dessert!",
    color: "#FFBE0B",
  },
];

const questOptions: QuestOption[] = [
  { id: "option-a", label: "Option A", description: "That other sugary brand" },
  { id: "option-b", label: "Option B", description: "Another meh candy crew" },
  { id: "candy-heaven", label: "Candy Heaven", description: "The legendary sweet studio" },
];

function createConfettiPieces(): ConfettiPiece[] {
  return Array.from({ length: 26 }, (_, index) => ({
    id: `confetti-${index}-${Math.random().toString(36).slice(2, 7)}`,
    offsetX: (Math.random() - 0.5) * 240,
    offsetY: -Math.random() * 220 - 60,
    rotation: Math.random() * 540,
    delay: Math.random() * 0.35,
    color: confettiPalette[Math.floor(Math.random() * confettiPalette.length)],
  }));
}

const CandyExploder = ({ label }: { label: string }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const triggerConfetti = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setConfetti(createConfettiPieces());
    timeoutRef.current = setTimeout(() => {
      setConfetti([]);
    }, 1200);
  };

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        type="button"
        onClick={triggerConfetti}
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.96, rotate: -4 }}
        className="relative rounded-full bg-gradient-to-r from-[#FF1493] via-[#FB5607] to-[#8338EC] px-5 py-3 font-semibold uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,20,147,0.5)]"
      >
        {label}
      </motion.button>
      <AnimatePresence>
        {confetti.length > 0 && (
          <motion.div
            key={`burst-${confetti[0]?.id ?? "none"}`}
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {confetti.map((piece) => (
              <motion.span
                key={piece.id}
                className="absolute top-1/2 left-1/2 h-2 w-3 rounded-sm"
                style={{ backgroundColor: piece.color }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: piece.offsetX,
                  y: piece.offsetY,
                  rotate: piece.rotation,
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{ duration: 1.1, ease: "easeOut", delay: piece.delay }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CandyCornAvatar = ({ color }: { color: string }) => (
  <motion.div
    className="relative h-20 w-16"
    animate={{ y: [0, -8, 0] }}
    transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
  >
    <div
      className="absolute bottom-0 left-1/2 h-20 w-16 -translate-x-1/2"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F6E9C9 45%, #E3C89D 75%, #CF9D70 100%)",
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        boxShadow: `0 12px 24px ${color}33`,
      }}
    />
    <div className="absolute top-8 left-1/2 flex -translate-x-1/2 gap-3">
      <span className="h-2 w-2 rounded-full bg-black/65" />
      <span className="h-2 w-2 rounded-full bg-black/65" />
    </div>
    <div className="absolute top-12 left-1/2 h-1.5 w-6 -translate-x-1/2 rounded-full bg-black/35" />
  </motion.div>
);

const ContactButton = () => (
  <motion.button
    type="submit"
    whileHover={{
      rotate: [0, 2, -2, 1.5, 0],
      backgroundColor: ["#FF1493", "#A08B72", "#B69C7A", "#CBB59A", "#A08B72", "#FF1493"],
      scale: 1.04,
    }}
    transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
    className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF1493] via-[#A08B72] to-[#CBB59A] px-8 py-3 text-lg font-semibold uppercase tracking-widest text-white shadow-[0_12px_24px_rgba(86,74,60,0.35)]"
  >
    Send Sugargram
  </motion.button>
);

function App() {
  const [activeJar, setActiveJar] = useState<string | null>(null);
  const [questChoice, setQuestChoice] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const heroCandy = useMemo(
    () =>
      heroCandyPalette.map((tone, index) => ({
        tone,
        delay: index * 0.14,
      })),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4800);
    return () => clearInterval(interval);
  }, []);

  const selectedQuestMessage = useMemo(() => {
    if (!questChoice) return null;
    if (questChoice === "candy-heaven") {
      return {
        title: "Ah, a discerning sweet soul!",
        body: "We knew we liked you. Quick, holler at us before our latest specials swirl away!",
        menu: ["Galactic Swizzle Sticks", "Unicorn Fudge Clouds", "Aurora Pop Rocks", "Mystic Marshmallow Meteors"],
      };
    }
    return {
      title: "Clearly, your taste buds need rescuing!",
      body: "You haven't tasted our candy cosmos yet. Get in contact so we can fix that. Here's a teaser menu while you wait:",
      menu: ["Confetti Cascade Caramels", "Rainbow Ripple Taffy", "Fizzing Stardust Chews", "Prismatic Lollipop Flights"],
    };
  }, [questChoice]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFE5F1] via-[#E0F7FF] to-[#F0E5FF] text-[#1a0033]">
      <motion.div
        className="pointer-events-none absolute -left-48 -top-40 h-80 w-80 rounded-full bg-[#FF1493]/40 blur-3xl"
        animate={{ scale: [1, 1.08, 0.94, 1], rotate: [0, 12, -8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-56 top-1/3 h-96 w-96 rounded-full bg-[#00D9FF]/40 blur-3xl"
        animate={{ scale: [1, 0.95, 1.1, 1], rotate: [0, -10, 16, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-20 lg:px-10">
        <section className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            <motion.span
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#FFB6C1]/80 to-[#E0D5FF]/80 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#8338EC]"
            >
              Welcome to Candy Heaven
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="text-4xl font-black leading-tight bg-gradient-to-r from-[#FF1493] via-[#8338EC] to-[#00D9FF] bg-clip-text text-transparent drop-shadow-sm md:text-6xl"
            >
              The most outrageous sweets universe you can taste without a spacesuit.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18 }}
              className="max-w-xl text-lg text-[#555]"
            >
              Our sugar scientists engineer kaleidoscopic confections, hovering lollipops, and confetti-powered candy that makes every celebration explode with flavor.
            </motion.p>
            <div className="flex flex-wrap items-center gap-6">
              <CandyExploder label="Tap for Confetti Candy" />
              <motion.div
                className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#FFB6C1]/70 to-[#E0D5FF]/70 px-5 py-3 text-sm font-semibold text-[#8338EC]"
                animate={{ y: [0, -4, 0], rotate: [0, 1.5, -1.5, 0] }}
                transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
              >
                <span className="inline-block h-3 w-3 rounded-full bg-[#FF1493]" />
                Mega mix drops nightly
              </motion.div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <motion.div
              className="relative flex h-80 w-80 items-center justify-center rounded-full bg-white/80 backdrop-blur"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            >
              <motion.div
                className="absolute h-64 w-64 rounded-full border-[18px] border-transparent"
                style={{
                  background:
                    "conic-gradient(from 90deg, #FF1493, #8338EC, #3A86FF, #00D9FF, #FFBE0B, #FF1493)",
                }}
                animate={{ rotate: [0, -360] }}
                transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
              />
              <motion.div
                className="absolute h-24 w-24 rounded-full bg-white/90"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              />
              <div className="relative flex h-72 w-72 flex-wrap items-center justify-center gap-4">
                {heroCandy.map((candy, index) => (
                  <motion.div
                    key={candy.tone + index}
                    className="h-14 w-14 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
                    style={{ background: `radial-gradient(circle at 30% 30%, #FFFFFFC5 0%, ${candy.tone} 70%, ${candy.tone})` }}
                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: candy.delay + 0.4, duration: 0.6, type: "spring" }}
                    whileHover={{ y: -8, rotate: 6, scale: 1.06 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-white/90 to-[#FFE5F1]/80 p-10 shadow-[0_20px_45px_rgba(255,20,147,0.15)] backdrop-blur">
          <header className="flex flex-col gap-4 pb-8 text-center">
            <h2 className="text-3xl font-black uppercase tracking-[0.2em] bg-gradient-to-r from-[#FF1493] to-[#8338EC] bg-clip-text text-transparent md:text-4xl">
              Candy Constellation Tasting Flight
            </h2>
            <p className="mx-auto max-w-2xl text-[#555]">
              Drag the jars to awaken the sugar sprites. Each spill unleashes a cascade of virtual sweets so vibrant your screen might need a nap.
            </p>
          </header>
          <div className="grid gap-8 md:grid-cols-3">
            {candyJars.map((jar) => {
              const isActive = activeJar === jar.id;
              return (
                <motion.article
                  key={jar.id}
                  drag
                  dragConstraints={{ left: -80, right: 80, top: -50, bottom: 50 }}
                  dragElastic={0.35}
                  onDragStart={() => setActiveJar(jar.id)}
                  onDragEnd={() => setActiveJar(null)}
                  className="relative flex h-full flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-white to-[#F1ECE4] p-6 shadow-[0_16px_40px_rgba(63,55,39,0.18)]"
                >
                  <motion.div
                    className="relative flex h-48 w-40 items-center justify-end overflow-hidden rounded-[60px] border-[6px] border-white bg-gradient-to-br from-white to-[#FFE5F1]/30"
                    animate={{ rotate: isActive ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 110, damping: 13 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(150deg, rgba(255,255,255,0.92), rgba(255,255,255,0.35))" }}
                    />
                    <div className="relative z-10 flex h-full w-full flex-wrap items-end justify-center gap-3 pb-10">
                      {jar.sweets.map((tone, sweetIndex) => (
                        <motion.span
                          key={`${jar.id}-sweet-${tone}-${sweetIndex}`}
                          className="h-6 w-6 rounded-full"
                          style={{ background: `radial-gradient(circle at 30% 30%, #FFFFFFd0 0%, ${tone} 80%)` }}
                          animate={{ y: isActive ? [0, -10, 0] : 0 }}
                          transition={{ repeat: isActive ? Infinity : 0, duration: 1.5 + sweetIndex * 0.12, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                    <div className={`absolute -bottom-6 w-[140%] rounded-full bg-gradient-to-r ${jar.accentClass} blur-xl opacity-70`} />
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-16 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 18 }}
                        >
                          {jar.sweets.map((tone, spillIndex) => (
                            <motion.span
                              key={`${jar.id}-spill-${tone}-${spillIndex}`}
                              className="h-5 w-5 rounded-full shadow-[0_8px_12px_rgba(50,40,30,0.12)]"
                              style={{ background: `radial-gradient(circle, ${tone} 0%, #FFFA ${spillIndex * 12}%)` }}
                              animate={{ y: [0, 12, 0], x: [0, (spillIndex - 1) * 10, 0] }}
                              transition={{ repeat: Infinity, duration: 1.7 + spillIndex * 0.15, ease: "easeInOut" }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <div className="space-y-3 text-center">
                    <h3 className="text-2xl font-extrabold text-[#333]">{jar.name}</h3>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#8338EC]/80">{jar.flavor}</p>
                    <p className="text-sm text-[#555]/75">{jar.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="relative rounded-3xl bg-gradient-to-br from-white/90 to-[#E0D5FF]/80 p-8 shadow-[0_18px_42px_rgba(131,56,236,0.15)] backdrop-blur"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-black uppercase tracking-[0.25em] bg-gradient-to-r from-[#FF1493] to-[#8338EC] bg-clip-text text-transparent">
              Raving Tastebuds
            </h2>
            <p className="mt-4 text-[#555]">
              Our fans bounce higher than the candy corn avatars they send us. Slide through the testimonials and feel the sugar rush!
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#8338EC]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#FF1493]" />
              Autoplay carousel • Touch to pause
            </div>
          </motion.div>
          <div className="relative rounded-3xl bg-gradient-to-br from-white/90 to-[#FFE5F1]/80 p-8 shadow-[0_18px_42px_rgba(255,20,147,0.15)] backdrop-blur">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) =>
                index === testimonialIndex ? (
                  <motion.div
                    key={testimonial.name}
                    className="grid gap-6 lg:grid-cols-[auto,1fr]"
                    initial={{ opacity: 0, x: 70 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -70 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className="flex items-start justify-center">
                      <CandyCornAvatar color={testimonial.color} />
                    </div>
                    <div className="space-y-4 text-[#333]">
                      <p className="text-xl font-semibold leading-relaxed">
                        “{testimonial.quote}”
                      </p>
                      <div>
                        <p className="text-base font-bold">{testimonial.name}</p>
                        <p className="text-sm uppercase tracking-[0.25em] text-[#8338EC]/70">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
            <div className="mt-6 flex justify-center gap-3">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setTestimonialIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    testimonialIndex === index ? "w-10 bg-[#FF1493]" : "w-4 bg-[#FFB6C1]"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white/75 p-10 shadow-[0_18px_45px_rgba(63,55,39,0.18)] backdrop-blur">
          <header className="grid gap-4 text-center">
            <h2 className="text-3xl font-black uppercase tracking-[0.22em] text-[#333]">
              Candy Quest Challenge
            </h2>
            <p className="mx-auto max-w-3xl text-[#555]/85">
              Who crafts the most delicious treats for sweet tooths everywhere? Take the quest and unlock your sugar destiny.
            </p>
          </header>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {questOptions.map((option) => (
              <motion.button
                key={option.id}
                type="button"
                onClick={() => setQuestChoice(option.id)}
                whileHover={{ scale: 1.03, rotate: [0, 1.4, -1.4, 0] }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex flex-col gap-3 rounded-2xl border-2 border-transparent bg-gradient-to-br from-white to-[#F0E8DC] p-6 text-left shadow-[0_14px_34px_rgba(63,55,39,0.16)] transition-colors ${
                  questChoice === option.id ? "border-[#FF1493]" : "border-white/0"
                }`}
              >
                <span className="text-xs uppercase tracking-[0.4em] text-[#8338EC]/70">{option.label}</span>
                <span className="text-lg font-semibold text-[#333]">{option.description}</span>
                <motion.div
                  className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#D9CBB6] text-lg font-black text-[#333]"
                  animate={{ rotate: questChoice === option.id ? [0, -10, 10, 0] : 0 }}
                  transition={{ repeat: questChoice === option.id ? Infinity : 0, duration: 2.1, ease: "easeInOut" }}
                >
                  ?
                </motion.div>
              </motion.button>
            ))}
          </div>
          <AnimatePresence>
            {selectedQuestMessage && (
              <motion.div
                key={selectedQuestMessage.title}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 26 }}
                className="mt-10 rounded-2xl bg-white/80 p-8 text-center text-[#333]"
              >
                <h3 className="text-2xl font-black uppercase tracking-[0.25em]">
                  {selectedQuestMessage.title}
                </h3>
                <p className="mt-4 text-lg">{selectedQuestMessage.body}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#8338EC]/80">
                  {selectedQuestMessage.menu.map((item) => (
                    <span key={item} className="rounded-full bg-white/60 px-4 py-2">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="relative overflow-hidden rounded-3xl bg-white/75 p-10 shadow-[0_18px_45px_rgba(63,55,39,0.18)] backdrop-blur">
          <motion.div
            className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#CAB89E]/40 blur-3xl"
            animate={{ scale: [1, 1.15, 0.92, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full bg-[#B7C4BE]/35 blur-3xl"
            animate={{ scale: [1, 0.88, 1.12, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div className="space-y-6 text-[#333]">
              <h2 className="text-3xl font-black uppercase tracking-[0.25em]">
                Holler at the Candy Alchemists
              </h2>
              <p className="text-lg text-[#555]/85">
                Drop us a line and we’ll assemble a rainbow-tinted tasting flight faster than you can say "sherbet supernova".
              </p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#8338EC]/70">
                <span className="rounded-full bg-white/55 px-4 py-2">Parties</span>
                <span className="rounded-full bg-white/55 px-4 py-2">Corporate Mischief</span>
                <span className="rounded-full bg-white/55 px-4 py-2">Event Kits</span>
              </div>
            </div>
            <form className="relative flex flex-col gap-4 text-[#333]">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.25em] text-[#8338EC]">
                  Name
                  <input
                    className="rounded-full border-none bg-white px-5 py-3 text-base font-medium text-[#333] outline-none focus:ring-4 focus:ring-[#B69C7A]/35"
                    placeholder="Your sweet alias"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.25em] text-[#8338EC]">
                  Email
                  <input
                    type="email"
                    className="rounded-full border-none bg-white px-5 py-3 text-base font-medium text-[#333] outline-none focus:ring-4 focus:ring-[#A7B3C2]/35"
                    placeholder="you@candyfans.com"
                    required
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.25em] text-[#8338EC]">
                Message
                <textarea
                  rows={4}
                  className="rounded-3xl border-none bg-white px-5 py-4 text-base font-medium text-[#333] outline-none focus:ring-4 focus:ring-[#C3D0CA]/35"
                  placeholder="Tell us how wild you want your candy storm"
                />
              </label>
              <ContactButton />
            </form>
          </div>
        </section>

        <footer className="flex flex-col items-center gap-3 pb-8 text-xs uppercase tracking-[0.3em] text-[#8338EC]/80">
          <span>© {new Date().getFullYear()} Candy Heaven • Where outrageous sugar dreams spin to life</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#B69C7A]" />
            Lollipop lounge open 24/7
          </span>
        </footer>
      </div>
    </main>
  );
}

export default App;
