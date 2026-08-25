import { packageTiers } from "@/lib/catalog";
import { GuestCapacityCalculator } from "./GuestCapacityCalculator";

// Wedding cultural/religious paths, explicitly selected by the host (docs/14_OWNER_VISION_V2.md,
// CLAUDE.md "Product truths"). This is presentational wedding content, not the occasion catalogue —
// the MVP is wedding-only (project/DECISIONS.md DEC-004, reaffirmed DEC-027), so no non-wedding
// occasion is rendered here.
const weddingTraditions = [
  {
    id: "hindu",
    label: "Hindu",
    description:
      "Sacred ceremony details, mandap imagery, and multi-day event structure, shaped around your family's customs.",
    flagship: true,
  },
  {
    id: "muslim",
    label: "Muslim",
    description: "Nikah and reception details presented with care and respect.",
    flagship: false,
  },
  {
    id: "christian",
    label: "Christian",
    description: "Church ceremony and reception details in one elegant flow.",
    flagship: false,
  },
  {
    id: "interfaith",
    label: "Interfaith",
    description:
      "Honour two traditions in one invitation, exactly as you describe them.",
    flagship: false,
  },
  {
    id: "civil",
    label: "Civil",
    description: "A clean, modern invitation for a civil ceremony.",
    flagship: false,
  },
  {
    id: "non-religious",
    label: "Non-religious",
    description: "A celebration on your own terms, free of assumed symbols.",
    flagship: false,
  },
] as const;

const steps = [
  [
    "01",
    "Tell us the feeling",
    "Choose the occasion, mood, culture, colours and little details that make it yours.",
  ],
  [
    "02",
    "Meet your design",
    "Receive a polished concept shaped by your answers, then refine it without design jargon.",
  ],
  [
    "03",
    "Share the moment",
    "Publish a beautiful link, welcome every guest and keep RSVPs together.",
  ],
] as const;

export default function HomePage() {
  return (
    <main>
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Élan home">
          <span>É</span>lan
        </a>
        <nav aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#traditions">Traditions</a>
          <a href="#packages">Packages</a>
        </nav>
        <a className="button buttonSmall" href="#create">
          Create yours
        </a>
      </header>

      <section className="hero shell" id="top">
        <div className="heroCopy">
          <p className="kicker">Digital invitations, thoughtfully made</p>
          <h1>
            Make the first moment <em>unforgettable.</em>
          </h1>
          <p className="lede">
            Turn a few clues about your celebration into a living
            invitation—beautiful to open, effortless to share, and personal to
            every guest.
          </p>
          <div className="actions">
            <a className="button" href="#create">
              Create my invitation
            </a>
            <a className="textLink" href="#preview">
              See an invitation <span>↗</span>
            </a>
          </div>
          <p className="trust">
            Made for Mauritius. Ready for celebrations everywhere.
          </p>
        </div>
        <div
          className="heroArt"
          id="preview"
          aria-label="Preview of an elegant digital wedding invitation"
        >
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />
          <div className="petal petalOne">✦</div>
          <div className="petal petalTwo">❀</div>
          <article className="invite">
            <p className="inviteOverline">Together with their families</p>
            <h2>
              Amara <span>&amp;</span> Dev
            </h2>
            <div className="rule" />
            <p>joyfully invite you to celebrate their wedding</p>
            <strong>18 · 10 · 2027</strong>
            <small>Le Château de Bel Ombre · Mauritius</small>
            <button type="button">Open invitation</button>
          </article>
          <p className="floatingNote">
            Made especially for <strong>Sofia</strong>
          </p>
        </div>
      </section>

      <section className="marquee" aria-label="Invitation qualities">
        <span>Personal</span>
        <i>✦</i>
        <span>Beautiful</span>
        <i>✦</i>
        <span>Effortless</span>
        <i>✦</i>
        <span>Unforgettable</span>
      </section>

      <section className="section shell" id="how">
        <p className="kicker">From idea to invitation</p>
        <h2 className="sectionTitle">
          You bring the story.
          <br />
          We make it <em>feel alive.</em>
        </h2>
        <div className="steps">
          {steps.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="occasions section" id="traditions">
        <div className="shell">
          <p className="kicker">One wedding, every tradition welcome</p>
          <h2 className="sectionTitle">
            Your ceremony,
            <br />
            <em>told your way.</em>
          </h2>
          <div className="occasionGrid">
            {weddingTraditions.map((tradition) => (
              <article
                className={tradition.flagship ? "featured" : ""}
                key={tradition.id}
              >
                <span>
                  {tradition.flagship ? "Our signature" : "Also available"}
                </span>
                <h3>{tradition.label}</h3>
                <p>{tradition.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="packages">
        <p className="kicker">Choose your level of magic</p>
        <h2 className="sectionTitle">
          Four ways to make
          <br />
          an <em>entrance.</em>
        </h2>
        <div className="tiers">
          {packageTiers.map((tier) => (
            <article
              className={tier.id === "platinum" ? "tier platinum" : "tier"}
              key={tier.id}
            >
              <div>
                <p>{tier.eyebrow}</p>
                <h3>{tier.name}</h3>
                <p className="tierPrice">
                  Rs {tier.priceMur.toLocaleString("en-US")}
                </p>
                <p className="tierMeta">
                  {tier.guestCapacity} guests · {tier.hostingDays}-day hosting
                </p>
              </div>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
              <a href="#create">
                Explore {tier.name} <span>→</span>
              </a>
            </article>
          ))}
        </div>
        <p className="tiersFootnote">
          Need more guests?{" "}
          <a href="#guest-capacity">Estimate additional capacity ↓</a>
        </p>
      </section>

      <section className="section shell" id="guest-capacity">
        <p className="kicker">Growing the guest list</p>
        <h2 className="sectionTitle">
          Add guests,
          <br />
          <em>see the price instantly.</em>
        </h2>
        <GuestCapacityCalculator />
      </section>

      <section className="cta" id="create">
        <div className="shell">
          <p className="kicker">Your story deserves a beautiful beginning</p>
          <h2>
            Ready to send a little <em>magic?</em>
          </h2>
          <p>
            Start with a few simple questions. No design skills, no printing, no
            door-to-door delivery.
          </p>
          <a className="button light" href="#top">
            Start creating
          </a>
          <small>
            Preview before you commit · Designed for mobile · Share anywhere
          </small>
        </div>
      </section>

      <footer className="shell">
        <a className="brand" href="#top">
          <span>É</span>lan
        </a>
        <p>Beautiful wedding invitations, thoughtfully made.</p>
        <p>© 2026 Élan. Working product identity.</p>
      </footer>
    </main>
  );
}
