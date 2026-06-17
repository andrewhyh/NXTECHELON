import { MotionController } from "../components/MotionController";
import { SignatureCanvas } from "../components/SignatureCanvas";
import styles from "./page.module.css";

const bookingUrl = "https://cal.com/nxtechelon-placeholder/30min";
const fallbackEmail = "hello@example.com";

const services = [
  {
    verb: "Build",
    body: "Custom AI workflows for the parts of the business that are too specific for off-the-shelf software.",
    example: "Example: intake triage, proposal drafting, internal search, or decision-support tools shaped around your actual process.",
  },
  {
    verb: "Integrate",
    body: "Connect AI into the systems your team already uses, with the permissions, logging, and handoff paths the work requires.",
    example: "Example: CRM notes, inbox routing, support queues, document stores, and reporting systems that stop living in separate tabs.",
  },
  {
    verb: "Operate",
    body: "Stabilize what ships: prompts, evals, runbooks, monitoring, and iteration loops so the system stays useful after launch.",
    example: "Example: weekly quality checks, failure review, model-routing updates, and clear ownership for the people using it.",
  },
];

const steps = [
  {
    title: "Intake",
    body: "We find the expensive bottleneck, the owner, and the system boundary before writing a line of code.",
  },
  {
    title: "Scoped sprint",
    body: "A narrow build plan, fixed decision points, and a working definition of shipped.",
  },
  {
    title: "Ship",
    body: "A usable system in the hands of the people doing the work, with the edge cases handled enough to trust it.",
  },
  {
    title: "Handoff with runbooks",
    body: "Documentation, operating rules, and a clear path for iteration instead of a mystery box.",
  },
];

const shippedSystems = [
  "Built a placeholder lead-qualification workflow that routes inbound requests by urgency, fit, and owner.",
  "Integrated a placeholder document-search assistant across policy files, proposals, and operating notes.",
  "Operated a placeholder support triage loop with weekly quality review and handoff notes.",
  "Shipped a placeholder executive briefing generator for recurring customer and pipeline reviews.",
];

export default function Home() {
  return (
    <>
      <MotionController />
      <header className={styles.nav} aria-label="Primary navigation">
        <a className={styles.wordmark} href="#top" aria-label="NXTECHELON home">
          NXTECHELON
        </a>
        <a className={styles.navCta} href={bookingUrl} data-cal-trigger>
          Book a call
        </a>
      </header>

      <main id="top">
        <section className={`${styles.section} ${styles.hero}`} data-hero data-section>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.monoLine}>AI systems, built for operators.</p>
              <h1 className={styles.heroTitle} data-reveal>
                We build the AI you do not have time to build.
              </h1>
              <p className={styles.heroSub}>
                An AI build studio for operators with judgment and no spare technical team. We ship the systems. You run your business.
              </p>
              <a className={styles.primaryCta} href={bookingUrl} data-cal-trigger>
                Book a 30-minute intake
              </a>
            </div>
            <div className={styles.signatureWrap} data-hero-signature>
              <SignatureCanvas />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.thesis}`} data-section>
          <div className={styles.measure}>
            <h2 className={styles.thesisText} data-reveal>
              AI work fails when it is treated like a lecture. We work from the operating problem backwards: the decision, the workflow, the people who use it, and the system that has to keep behaving when the meeting ends.
            </h2>
          </div>
        </section>

        <section className={`${styles.section} ${styles.services}`} data-section>
          <div className={styles.sectionGrid}>
            <h2 className={styles.sectionHeading} data-reveal>
              What we ship
            </h2>
            <div className={styles.lanes}>
              {services.map((service) => (
                <article className={styles.lane} key={service.verb}>
                  <h3>{service.verb}</h3>
                  <div>
                    <p>{service.body}</p>
                    <p className={styles.example}>{service.example}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.process}`} data-section>
          <div className={styles.sectionGrid}>
            <h2 className={styles.sectionHeading} data-reveal>
              How the work moves
            </h2>
            <ol className={styles.steps}>
              {steps.map((step, index) => (
                <li className={styles.step} key={step.title}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.operator}`} data-section>
          <div className={styles.operatorGrid}>
            <div>
              <h2 className={styles.sectionHeading} data-reveal>
                Jordan Vale
              </h2>
              <p className={styles.operatorIntro}>
                Placeholder founder bio: Jordan has spent the last decade turning messy operating problems into shipped internal systems. Their work sits between executive judgment and hands-on delivery: mapping the workflow, building the tool, and leaving the team with a system they can run. Replace this paragraph with the real founder background before launch.
              </p>
            </div>
            <div className={styles.proofList}>
              <p className={styles.pendingTitle}>Placeholder systems shipped</p>
              <ul>
                {shippedSystems.map((system) => (
                  <li key={system}>{system}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.contact}`} id="booking-details" data-section>
          <div className={styles.contactInner}>
            <h2 className={styles.closer} data-reveal>
              If you have already decided AI matters, we should talk.
            </h2>
            <p>
              Placeholder booking details are wired for now. Replace the Cal.com handle and email before launch.
            </p>
            <a className={styles.primaryCta} href={bookingUrl} data-cal-trigger>
              Book a 30-minute intake
            </a>
            <p className={styles.fallback}>
              Fallback email: <a href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a>
            </p>
          </div>
          <footer className={styles.footer}>
            <span>NXTECHELON</span>
            <span>2026</span>
          </footer>
        </section>
      </main>

      <dialog className={styles.dialog} data-booking-dialog aria-labelledby="booking-title">
        <div className={styles.dialogPanel}>
          <button className={styles.dialogClose} type="button" data-dialog-close aria-label="Close booking dialog">
            Close
          </button>
          <p className={styles.pendingTitle}>Placeholder booking</p>
          <h2 id="booking-title">Book a 30-minute intake.</h2>
          <p>
            This placeholder frame uses a temporary Cal.com URL. Swap in the real handle before production launch.
          </p>
          <iframe
            className={styles.calFrame}
            src={bookingUrl}
            title="Book a 30-minute intake"
            loading="lazy"
          />
        </div>
      </dialog>
    </>
  );
}
