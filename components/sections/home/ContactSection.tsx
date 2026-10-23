import { Acc } from '@/components/ui/Acc';
import { Icon } from '@/components/ui/Icon';
import { externalRel } from '@/modules/site/config';
import { socialLinks } from '@/modules/site/navigation';

export function ContactSection() {
  return (
    <section className="contact" aria-labelledby="contactTitle">
      <span className="contact-anchor" id="contact"></span>
      <div className="contact-stage">
        <div className="contact-inner">
          <div className="contact-main">
            <div>
              <span className="eyebrow">Contact</span>
              <h2 id="contactTitle">
                Have something to <Acc>build?</Acc>
              </h2>
              <p className="contact-lede">
                Tell us what you are making, fixing or automating. We reply with
                honest next steps, and we will tell you if we are not the right
                fit.
              </p>
            </div>
            <div className="contact-side">
              <div
                className="brief"
                id="briefForm"
                role="group"
                aria-describedby="briefSummary"
              >
                <fieldset>
                  <legend>What are you building?</legend>
                  <div className="chips">
                    <label className="chip-opt">
                      <input
                        type="radio"
                        name="btype"
                        value="a website"
                        defaultChecked
                      />
                      <span>Website</span>
                    </label>
                    <label className="chip-opt">
                      <input type="radio" name="btype" value="an application" />
                      <span>Application</span>
                    </label>
                    <label className="chip-opt">
                      <input
                        type="radio"
                        name="btype"
                        value="AI and automation"
                      />
                      <span>AI and automation</span>
                    </label>
                    <label className="chip-opt">
                      <input
                        type="radio"
                        name="btype"
                        value="custom software"
                      />
                      <span>Custom software</span>
                    </label>
                    <label className="chip-opt">
                      <input
                        type="radio"
                        name="btype"
                        value="a project I am still defining"
                      />
                      <span>Not sure yet</span>
                    </label>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Budget range</legend>
                  <div className="chips">
                    <label className="chip-opt">
                      <input
                        type="radio"
                        name="bbudget"
                        value="under ₹1 lakh"
                      />
                      <span>Under ₹1 lakh</span>
                    </label>
                    <label className="chip-opt">
                      <input type="radio" name="bbudget" value="₹1–3 lakh" />
                      <span>₹1–3 lakh</span>
                    </label>
                    <label className="chip-opt">
                      <input type="radio" name="bbudget" value="₹3–10 lakh" />
                      <span>₹3–10 lakh</span>
                    </label>
                    <label className="chip-opt">
                      <input
                        type="radio"
                        name="bbudget"
                        value="₹10 lakh or more"
                      />
                      <span>₹10 lakh +</span>
                    </label>
                    <label className="chip-opt">
                      <input type="radio" name="bbudget" value="not fixed yet" />
                      <span>Not fixed yet</span>
                    </label>
                  </div>
                </fieldset>
                <p className="brief-summary" id="briefSummary" aria-live="polite">
                  You are building a website. Pick a budget range, or just send
                  what you have.
                </p>
                <button
                  type="button"
                  className="contact-btn"
                  id="briefBtn"
                  data-mailto="mailto:hello@greyzone.in?subject=New%20project%3A%20a%20website"
                >
                  Send brief by email
                </button>
                <p className="brief-note">
                  We reply within 1 working day.{' '}
                  <span className="brief-alt">
                    Prefer plain email?{' '}
                    <a href="mailto:hello@greyzone.in">hello@greyzone.in</a>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="contact-foot">
            <p>
              © 2026 GREYZONE · Ahmedabad, Gujarat · Working across India and
              internationally
            </p>
            <ul className="menu-social">
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
              Back to top <Icon id="i-arrow" className="ic" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
