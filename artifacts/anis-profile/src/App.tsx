import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Code2,
  Film,
  Gamepad2,
  Headphones,
  Laptop,
  MapPin,
  Menu,
  Music2,
  Pause,
  Play,
  Plane,
  Radio,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import caseImage from '@assets/image_1790468943672.png';

const queryClient = new QueryClient();

type ChapterId = 'home' | 'music' | 'screens' | 'travel' | 'tech' | 'life';

const chapters: { id: ChapterId; label: string; accent: string }[] = [
  { id: 'home', label: 'home', accent: 'cyan' },
  { id: 'music', label: 'music', accent: 'pink' },
  { id: 'screens', label: 'screens', accent: 'yellow' },
  { id: 'travel', label: 'travel', accent: 'lime' },
  { id: 'tech', label: 'tech', accent: 'blue' },
  { id: 'life', label: 'the rest', accent: 'purple' },
];

const tracks = [
  { title: 'Lose Yourself', mood: 'the switch flips', text: 'The song for when the excuses have used up their time. It is less about winning and more about finally moving.' },
  { title: 'Till I Collapse', mood: 'heavy rotation', text: 'The gym, the late code session, the stubborn part of the day. This is the one that makes quitting feel embarrassing.' },
  { title: 'Stan', mood: 'the dark one', text: 'A story that proves a song can be a short film. Dramatic, uncomfortable, and impossible to half-listen to.' },
  { title: 'Mockingbird', mood: 'quiet hours', text: 'The softer side of the catalog. Family, regret, and the kind of honesty that does not need a big chorus.' },
];

const shows = [
  { title: 'Breaking Bad', type: 'show', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=85', hook: 'pressure makes people strange', text: 'The slow transformation is the point. Every choice feels understandable until it does not. The tension lives in the tiny decisions.' },
  { title: 'Better Call Saul', type: 'show', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85', hook: 'the character work', text: 'A patient show about people who keep explaining away the thing they already know about themselves. The details do the damage.' },
  { title: 'Friends', type: 'show', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85', hook: 'the comfort rewatch', text: 'No apocalyptic stakes. Just a group of people making a tiny apartment feel like the safest place in the city.' },
  { title: 'The Sopranos', type: 'show', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85', hook: 'the atmosphere', text: 'Funny, cold, ridiculous, and terrifying in the same scene. It makes silence feel like a plot point.' },
  { title: 'Shutter Island', type: 'film', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85', hook: 'the rewatch', text: 'A film that changes shape when you know where it is going. Fog, doubt, and one very unreliable point of view.' },
];

const destinations = [
  { name: 'Jijel', meta: 'starting point', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85', text: 'The coast, the hills, the familiar routes. Home is not a small thing just because the map makes it look small.' },
  { name: 'Alger', meta: 'next stop', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=85', text: 'A louder city, more movement, more chances to disappear into a crowd and come back with a new idea.' },
  { name: 'The world', meta: 'open tab', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85', text: 'Not a checklist. A long list of places, people, food, airports, wrong turns, and stories worth bringing home.' },
];

const techStack = [
  { name: 'C / C++', copy: 'The low-level rabbit hole. Memory, logic, and the satisfying feeling of knowing what the machine is doing.', icon: Terminal },
  { name: 'Python', copy: 'The fast idea machine. Scripts, bots, experiments, and all the small tools that save future time.', icon: Code2 },
  { name: 'Web development', copy: 'The part where code becomes a thing people can touch. Layout, interaction, motion, and fixing the weird pixel.', icon: Laptop },
  { name: 'AI / bots', copy: 'Still curious, still suspicious, still building little experiments to see what is actually useful.', icon: Radio },
];

const lifeBits = [
  { label: 'gaming', icon: Gamepad2, detail: 'PlayStation, PC, one more round that becomes three.' },
  { label: 'gym', icon: Sparkles, detail: 'A place to turn the noise down and leave tired on purpose.' },
  { label: 'music', icon: Headphones, detail: 'Mostly hip-hop. Sometimes whatever matches the weather.' },
  { label: 'family', icon: MapPin, detail: 'The people who make all the plans mean something.' },
];

function DetailModal({ item, onClose }: { item: { title: string; text: string; image?: string; mood?: string }; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="detail-backdrop" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <article className="detail-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close detail"><X size={18} /></button>
        {item.image && <img src={item.image} alt="" />}
        <div className="detail-body">
          <span className="eyebrow">{item.mood ?? 'open detail'}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <button className="modal-link" onClick={onClose}>close this rabbit hole <ChevronRight size={15} /></button>
        </div>
      </article>
    </div>
  );
}

function HomeChapter({ goTo }: { goTo: (id: ChapterId) => void }) {
  return (
    <div className="chapter-scroll home-scroll">
      <div className="home-hero">
        <div className="home-copy">
          <span className="eyebrow"><Sparkles size={13} /> a personal website with no résumé energy</span>
          <h1>ANIS<span>.</span></h1>
          <p className="hero-quote">i don&apos;t give a f***.<br /><em>fre sent me to piss the world off.</em></p>
          <p className="hero-intro">Computer science, hip-hop, questionable sleep schedules, places I want to see, and whatever else refuses to stay in one category.</p>
          <button className="big-action" onClick={() => goTo('music')}>start somewhere <ArrowDownRight size={17} /></button>
        </div>
        <div className="home-collage">
          <div className="home-image"><img src={caseImage} alt="A suitcase packed with notes, music, games, and everyday objects" /></div>
          <span className="collage-word collage-dz">DZ</span>
          <span className="collage-word collage-noise">NO<br />FILTER</span>
          <span className="collage-arrow">↗</span>
        </div>
      </div>
      <div className="home-teaser">
        {chapters.slice(1, 5).map((chapter) => (
          <button key={chapter.id} onClick={() => goTo(chapter.id)} className={`teaser-card teaser-${chapter.accent}`}>
            <span>{chapter.label}</span><ChevronRight size={15} />
          </button>
        ))}
      </div>
      <p className="home-note">scroll inside each chapter / click things / leave before it gets boring</p>
    </div>
  );
}

function MusicChapter({ onOpen }: { onOpen: (item: typeof tracks[number]) => void }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="chapter-scroll music-scroll">
      <div className="chapter-hero">
        <div>
          <span className="eyebrow"><Music2 size={13} /> music / the loud part</span>
          <h2>EMINEM<br /><em>in rotation.</em></h2>
          <p>Not a biography page. Just the records, stories, and specific moods that made the music stick.</p>
        </div>
        <div className="music-image-wrap">
          <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1100&q=85" alt="A performer on stage under blue light" />
          <span className="image-caption">real lyrics / real weight</span>
        </div>
      </div>
      <div className="player-strip">
        <button className="play-button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause music' : 'Play music'}>
          {playing ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
        </button>
        <div className="fake-wave">{Array.from({ length: 22 }).map((_, index) => <i key={index} style={{ height: `${16 + ((index * 17) % 33)}px` }} />)}</div>
        <div className="player-copy"><strong>{playing ? 'PLAYING IN MY HEAD' : 'PRESS PLAY IN YOUR HEAD'}</strong><span>the personal rotation / no streaming API required</span></div>
      </div>
      <div className="section-divider"><span>tracks that stayed</span><i>click one</i></div>
      <div className="track-grid">
        {tracks.map((track) => (
          <button className="track-card" key={track.title} onClick={() => onOpen(track)}>
            <Music2 size={19} /><span className="track-mood">{track.mood}</span><strong>{track.title}</strong><small>{track.text.slice(0, 62)}…</small><ChevronRight size={15} />
          </button>
        ))}
      </div>
      <div className="long-copy two-columns">
        <div><span className="eyebrow">why this music</span><p>Because it does not pretend every day is a clean montage. Some days are dramatic, some are funny, some are just a beat and a blank screen. The point is having something honest in the room.</p></div>
        <div><span className="eyebrow">the life part</span><p>The music came with the stories: ambition, anger, family, bad decisions, trying again. That is the part that made it feel bigger than background noise.</p></div>
      </div>
    </div>
  );
}

function ScreensChapter({ onOpen }: { onOpen: (item: typeof shows[number]) => void }) {
  return (
    <div className="chapter-scroll screens-scroll">
      <div className="chapter-hero screens-hero">
        <div>
          <span className="eyebrow"><Film size={13} /> screens / stories that got in</span>
          <h2>SHOWS,<br /><em>films & chaos.</em></h2>
          <p>Some are comfort. Some are obsession. Some are here because the ending still annoys me.</p>
        </div>
        <div className="screen-poster"><img src={shows[0].image} alt="Moody cinema seats" /><span>press any title</span></div>
      </div>
      <div className="show-list">
        {shows.map((show) => (
          <button className="show-row" key={show.title} onClick={() => onOpen(show)}>
            <img src={show.image} alt="" />
            <span className="show-type">{show.type}</span>
            <strong>{show.title}</strong>
            <em>{show.hook}</em>
            <ChevronRight size={17} />
          </button>
        ))}
      </div>
      <div className="long-copy screen-copy">
        <span className="eyebrow">the ranking changes / the favorites do not</span>
        <p>Breaking Bad for the pressure. Better Call Saul for the patience. Friends for when the brain needs to sit down. The Sopranos for the strange mix of comedy and dread. Shutter Island for the kind of movie that makes a second watch feel like a different film.</p>
      </div>
    </div>
  );
}

function TravelChapter({ onOpen }: { onOpen: (item: typeof destinations[number]) => void }) {
  return (
    <div className="chapter-scroll travel-scroll">
      <div className="travel-map-copy">
        <span className="eyebrow"><Plane size={13} /> travel / places I want to argue with</span>
        <h2>FROM<br /><em>here, outward.</em></h2>
        <p>Jijel is the starting point, not the full story. I want new streets, food I cannot pronounce, and enough wrong turns to have something good to say about them.</p>
      </div>
      <div className="route-line"><span /><i /><b /></div>
      <div className="destination-list">
        {destinations.map((destination) => (
          <button key={destination.name} className="destination-card" onClick={() => onOpen(destination)}>
            <img src={destination.image} alt="" />
            <div><span>{destination.meta}</span><strong>{destination.name}</strong><small>{destination.text}</small></div>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
      <div className="passport-strip"><MapPin size={14} /> Jijel → Alger → somewhere with a boarding pass</div>
      <div className="long-copy two-columns">
        <div><span className="eyebrow">what I am looking for</span><p>Not luxury. Texture. The sound of a morning market, a beach after the crowd leaves, the accidental café that becomes the place you remember.</p></div>
        <div><span className="eyebrow">the rule</span><p>Take the photo, eat the local thing, talk to the person next to you, and do not spend the whole trip trying to make it look like a trip.</p></div>
      </div>
    </div>
  );
}

function TechChapter({ onOpen }: { onOpen: (item: { title: string; text: string; mood: string }) => void }) {
  return (
    <div className="chapter-scroll tech-scroll">
      <div className="tech-intro">
        <div>
          <span className="eyebrow"><Code2 size={13} /> tech / the rabbit holes</span>
          <h2>MAKE<br /><em>something.</em></h2>
          <p>Programming is the closest thing I have to a superpower: an idea, a blank file, and a ridiculous number of tabs.</p>
        </div>
        <div className="terminal-card"><span>anis@jijel:~$</span><p>whoami<br /><b>someone still figuring it out</b><br /><br />cat current_mood.txt<br /><b>build it. break it. ship it.</b></p><i>_</i></div>
      </div>
      <div className="stack-list">
        {techStack.map((item) => {
          const Icon = item.icon;
          return <button key={item.name} className="stack-row" onClick={() => onOpen({ title: item.name, text: item.copy, mood: 'open the rabbit hole' })}><Icon size={21} /><strong>{item.name}</strong><span>{item.copy}</span><ChevronRight size={17} /></button>;
        })}
      </div>
      <div className="code-photo"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85" alt="Laptop with code on a dark desk" /><span>the desk at an unreasonable hour</span></div>
      <div className="long-copy two-columns">
        <div><span className="eyebrow">what I like about it</span><p>There is no committee meeting between wanting a thing and making a small version of it. The feedback is immediate: it works, it breaks, or it teaches you where you were being stupid.</p></div>
        <div><span className="eyebrow">what comes next</span><p>More web projects, better systems, smarter bots, and enough confidence to stop rebuilding the same idea from scratch every six months.</p></div>
      </div>
    </div>
  );
}

function LifeChapter() {
  return (
    <div className="chapter-scroll life-scroll">
      <div className="life-intro">
        <span className="eyebrow"><Sparkles size={13} /> the rest / the bits that do not need a category</span>
        <h2>THE<br /><em>other stuff.</em></h2>
        <p>A person is not a stack, a playlist, or a five-year plan. Here is the less organized part.</p>
      </div>
      <div className="life-grid">
        {lifeBits.map((bit) => {
          const Icon = bit.icon;
          return <article key={bit.label} className="life-card"><Icon size={23} /><strong>{bit.label}</strong><p>{bit.detail}</p></article>;
        })}
      </div>
      <div className="life-image"><img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=85" alt="Game controller in blue light" /><span>after hours / still awake</span></div>
      <div className="long-copy">
        <span className="eyebrow">no neat ending here</span>
        <p>I am from Jijel. I like building things, loud music, good stories, games that steal an evening, and the people who make the whole effort worth it. That is enough of an introduction.</p>
      </div>
    </div>
  );
}

function Home() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('home');
  const [openItem, setOpenItem] = useState<{ title: string; text: string; image?: string; mood?: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'ANIS / no profile energy';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenItem(null);
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const current = chapters.findIndex((chapter) => chapter.id === activeChapter);
        const next = event.key === 'ArrowRight' ? Math.min(current + 1, chapters.length - 1) : Math.max(current - 1, 0);
        setActiveChapter(chapters[next].id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeChapter]);

  const goTo = (id: ChapterId) => {
    setActiveChapter(id);
    setMenuOpen(false);
    document.querySelector('.chapter-scroll.is-current')?.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const currentIndex = chapters.findIndex((chapter) => chapter.id === activeChapter);
  const accent = chapters[currentIndex].accent;

  return (
    <main className={`site-shell accent-${accent}`}>
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <button className="brand-mark" onClick={() => goTo('home')} aria-label="Go home"><span className="brand-icon">A</span><span><b>ANIS</b><small>not a résumé</small></span></button>
        <nav className={`chapter-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Chapters">
          {chapters.map((chapter) => <button key={chapter.id} className={activeChapter === chapter.id ? 'active' : ''} onClick={() => goTo(chapter.id)}>{chapter.label}</button>)}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation"><Menu size={18} /></button>
        <div className="header-location"><MapPin size={13} /> JIJEL, DZ</div>
      </header>

      <div className="chapter-stage">
        {activeChapter === 'home' && <HomeChapter goTo={goTo} />}
        {activeChapter === 'music' && <MusicChapter onOpen={setOpenItem} />}
        {activeChapter === 'screens' && <ScreensChapter onOpen={setOpenItem} />}
        {activeChapter === 'travel' && <TravelChapter onOpen={(destination) => setOpenItem({ title: destination.name, text: destination.text, image: destination.image, mood: destination.meta })} />}
        {activeChapter === 'tech' && <TechChapter onOpen={setOpenItem} />}
        {activeChapter === 'life' && <LifeChapter />}
      </div>

      <footer className="site-footer">
        <button onClick={() => goTo(chapters[Math.max(currentIndex - 1, 0)].id)} disabled={currentIndex === 0} aria-label="Previous chapter"><ArrowLeft size={17} /></button>
        <span>{chapters[currentIndex].label}</span>
        <button onClick={() => goTo(chapters[Math.min(currentIndex + 1, chapters.length - 1)].id)} disabled={currentIndex === chapters.length - 1} aria-label="Next chapter"><ArrowRight size={17} /></button>
      </footer>
      {openItem && <DetailModal item={openItem} onClose={() => setOpenItem(null)} />}
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;