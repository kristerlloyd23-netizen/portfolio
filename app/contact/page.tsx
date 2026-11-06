import type { Metadata } from "next";
import { contactDetails } from "@/content/contact";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/site";
import { ArrowUpRightIcon, GithubIcon } from "@/components/Icons";
import { CopyEmail } from "@/components/CopyEmail";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui";
import styles from "./contact.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Krister Lloyd Magalso about junior Android or software roles, entry-level web opportunities, IT support, or suitable freelance projects.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <header className={`container ${styles.hero}`}>
        <SectionHeading
          level={1}
          eyebrow="CONTACT / START WITH THE PROBLEM"
          title="Let’s build something practical."
          description="For junior roles, project collaborations, IT support opportunities, or freelance inquiries, share the context and the kind of help you need."
        />
      </header>

      <section className={`container ${styles.layout}`}>
        <aside className={styles.direct} aria-labelledby="direct-contact-title">
          <p className={styles.kicker}>01 / DIRECT CHANNELS</p>
          <h2 id="direct-contact-title">Choose what works for you.</h2>
          <div className={styles.channelList}>
            <div className={styles.channel}>
              <span>Email</span>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
              <CopyEmail />
            </div>
            <div className={styles.channel}>
              <span>
                Phone <small>(optional)</small>
              </span>
              <a href={`tel:${contactDetails.phoneHref}`}>{contactDetails.phoneDisplay}</a>
            </div>
            <div className={styles.channel}>
              <span>GitHub</span>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GithubIcon /> {profile.github.replace("https://github.com/", "@")}{" "}
                <ArrowUpRightIcon />
              </a>
            </div>
            <div className={styles.channel}>
              <span>Location</span>
              <p>{profile.location}</p>
            </div>
          </div>
          <p className={styles.privacy}>
            Please do not send passwords, API keys, government IDs, customer records, or other
            sensitive information through this form.
          </p>
        </aside>

        <div className={styles.formPanel}>
          <p className={styles.kicker}>02 / PROJECT OR OPPORTUNITY INQUIRY</p>
          <h2>Save a message for follow-up.</h2>
          <p className={styles.formIntro}>
            The form validates on the server and reports success only after your message is
            persisted. If production storage is unavailable, it will direct you to email instead of
            pretending the message was sent.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
