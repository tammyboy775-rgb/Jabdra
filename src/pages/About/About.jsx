import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./About.css";

const TEAM = [
  { name: "Mara Ellis", role: "Community director", detail: "Builds relationships with growers, makers, and market hosts." },
  { name: "Jon Bell", role: "Product lead", detail: "Turns local knowledge into calm, useful planning tools." },
  { name: "Priya Shah", role: "Market editor", detail: "Keeps schedules, vendor notes, and seasonal tips fresh." },
];

export default function About() {
  return (
    <main className="page-section about-page">
      <Breadcrumb current="About us" />

      <section className="about-intro">
        <div>
          <span className="kicker">A better way to shop local</span>
          <h1>Meet the people behind FreshFind.</h1>
        </div>
        <p>
          FreshFind is a small, fictional town guide with a big belief: finding
          good food nearby should feel easy, human, and worth the walk.
        </p>
      </section>

      <section className="about-story" aria-labelledby="story-title">
        <div className="about-story-mark" aria-hidden="true">FF</div>
        <div>
          <span className="kicker">Our platform</span>
          <h2 id="story-title">Local knowledge, gathered in one place.</h2>
          <p>
            FreshFind brings market schedules, neighborhood context, seasonal
            produce, and practical visit details together. The platform is
            designed for a quick check before breakfast and a more curious
            browse when you have time to wander.
          </p>
          <p>
            Everything here is presented as a friendly starting point. Always
            check with a market directly for last-minute changes.
          </p>
        </div>
      </section>

      <section className="about-team" aria-labelledby="team-title">
        <div className="section-heading">
          <div>
            <span className="kicker">The team</span>
            <h2 id="team-title">People who care about the details.</h2>
          </div>
        </div>
        <div className="team-grid">
          {TEAM.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-avatar" aria-hidden="true">
                {member.name.split(" ").map((part) => part[0]).join("")}
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p>{member.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}