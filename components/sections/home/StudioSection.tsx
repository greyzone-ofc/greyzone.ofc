import { Acc } from '@/components/ui/Acc';
import { studio } from '@/content/studio';

export function StudioSection() {
  const [firstCopy, secondCopy] = studio.copy;
  const locationBold = 'Based in Ahmedabad, Gujarat,';
  const firstRest = firstCopy.startsWith(locationBold)
    ? firstCopy.slice(locationBold.length)
    : firstCopy;
  const email = studio.contactEmail;
  const [beforeEmail, afterEmail = ''] = secondCopy.split(email);

  return (
    <section className="studio" id="studio" aria-labelledby="studioTitle">
      <div className="studio-in">
        <span className="eyebrow">{studio.eyebrow}</span>
        <h2 id="studioTitle">
          {studio.title} <Acc>{studio.titleAccent}</Acc>
        </h2>
        <p className="studio-lede">{studio.lede}</p>
        <div className="studio-grid" data-rv>
          <div className="studio-media">
            <video
              className="studio-video"
              muted
              loop
              playsInline
              preload="none"
              poster={studio.videoPoster}
              aria-label={studio.videoAriaLabel}
            >
              <source src={studio.videoUrl} type="video/mp4" />
            </video>
          </div>
          <div>
            <ul className="studio-stats">
              {studio.stats.map((stat) => (
                <li key={stat.label}>
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
            <div className="studio-copy mt-[clamp(20px,3vw,32px)]">
              <p>
                <b>{locationBold}</b>
                {firstRest}
              </p>
              <p>
                {beforeEmail}
                <a
                  href={`mailto:${email}`}
                  className="text-signal underline underline-offset-4"
                >
                  {email}
                </a>
                {afterEmail}
              </p>
            </div>
          </div>
        </div>
        <ul className="studio-principles" data-rv>
          {studio.principles.map((principle) => (
            <li key={principle.num}>
              <em>{principle.num}</em>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
