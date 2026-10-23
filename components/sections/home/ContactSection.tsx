import { Acc } from '@/components/ui/Acc';
import { Icon } from '@/components/ui/Icon';
import { contact } from '@/content/contact';
import { externalRel } from '@/modules/site/config';
import { contactEmail, socialLinks } from '@/modules/site/navigation';

const email = contact.email || contactEmail;
const mailtoBase = `mailto:${email}?subject=${encodeURIComponent('New project: a website')}`;

export function ContactSection() {
  return (
    <section className="contact" aria-labelledby="contactTitle">
      <span className="contact-anchor" id="contact"></span>
      <div className="contact-stage">
        <div className="contact-inner">
          <div className="contact-main">
            <div className="contact-intro">
              <span className="eyebrow">{contact.eyebrow}</span>
              <h2 id="contactTitle">
                {contact.titleBefore} <Acc>{contact.titleAccent}</Acc>
              </h2>
              <p className="contact-lede">{contact.lede}</p>
              <div className="contact-channels">
                <a className="contact-mail" href={`mailto:${email}`}>
                  {email}
                  <Icon id="i-arrow" className="ic" />
                </a>
                <p className="contact-meta-line">
                  {contact.channels.map((channel, i) => (
                    <span key={channel.label}>
                      {i > 0 ? <span aria-hidden="true"> · </span> : null}
                      <span className="contact-meta-item">
                        <span className="contact-label">{channel.label}</span>{' '}
                        {channel.href ? (
                          <a href={channel.href}>{channel.value}</a>
                        ) : (
                          channel.value
                        )}
                      </span>
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div
              className="brief"
              id="briefForm"
              role="group"
              aria-describedby="briefSummary"
              data-email={email}
            >
              <p className="brief-kicker">{contact.briefKicker}</p>
              <fieldset>
                <legend>{contact.typeLegend}</legend>
                <div className="chips">
                  {contact.types.map((opt) => (
                    <label className="chip-opt" key={opt.value}>
                      <input
                        type="radio"
                        name="btype"
                        value={opt.value}
                        defaultChecked={opt.defaultChecked}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>{contact.budgetLegend}</legend>
                <div className="chips">
                  {contact.budgets.map((opt) => (
                    <label className="chip-opt" key={opt.value}>
                      <input
                        type="radio"
                        name="bbudget"
                        value={opt.value}
                        defaultChecked={opt.defaultChecked}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <p
                className="brief-summary"
                id="briefSummary"
                aria-live="polite"
              >
                {contact.summaryDefault}
              </p>
              <button
                type="button"
                className="contact-btn"
                id="briefBtn"
                data-mailto={mailtoBase}
              >
                {contact.ctaLabel}
              </button>
              <p className="brief-note">
                {contact.replyNote}{' '}
                <span className="brief-alt">
                  {contact.plainEmailLead}{' '}
                  <a href={`mailto:${email}`}>{email}</a>
                </span>
              </p>
            </div>
          </div>

          <div className="contact-foot">
            <p className="contact-foot-copy">{contact.footCopy}</p>
            <ul className="menu-social contact-foot-social">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel={externalRel}
                    aria-label={s.label}
                  >
                    <Icon id={s.iconId} className="ic" />
                  </a>
                </li>
              ))}
            </ul>
            <a className="contact-top-link" href="#page">
              {contact.topLabel} <Icon id="i-arrow" className="ic" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
