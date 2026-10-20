"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Ambulance, Bell, Dumbbell, MapPin, PhoneCall } from "lucide-react";
import { EASE, RevealLine, STAGGER } from "@/components/landing/motion";
import styles from "./home.module.css";

const tools = [
  {
    Icon: Bell,
    title: "Keep your routine close",
    body: "Set reminders for medication, workouts and appointments, then keep the next step in view.",
    tone: "pale",
  },
  {
    Icon: Dumbbell,
    title: "Move in your own way",
    body: "Follow guided fitness plans or book a trainer for a session that fits your schedule.",
    tone: "light",
  },
  {
    Icon: MapPin,
    title: "Find care with context",
    body: "Explore nearby facilities by specialty and check bed availability where hospitals have listed it.",
    tone: "sage",
  },
  {
    Icon: PhoneCall,
    title: "Talk it through",
    body: "Book a call with a healthcare professional to discuss your symptoms and what to do next.",
    tone: "forest",
  },
  {
    Icon: Ambulance,
    title: "Reach ambulance support",
    body: "Request ambulance assistance from the app when urgent care cannot wait.",
    tone: "deep",
  },
] as const;

/** A five-card feature fan, graded from the palest green to the deepest. */
export function EverydayTools() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.tools} aria-labelledby="tools-heading">
      <div className={styles.toolsHeading}>
        <span className={styles.toolsEyebrow}>Care that moves with you</span>
        <h2 id="tools-heading">
          <RevealLine>Health that fits</RevealLine>
          <RevealLine delay={STAGGER.line}>
            <em>the way you live.</em>
          </RevealLine>
        </h2>
        <p>Small, useful ways to find care, build a routine and feel more prepared.</p>
      </div>
      <div className={styles.toolsList} aria-label="Everyday health features">
        {tools.map(({ Icon, title, body, tone }, index) => (
          <motion.article
            className={styles.tool}
            data-tone={tone}
            key={title}
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * STAGGER.item, ease: EASE.signature }}
          >
            <div className={styles.toolTop}>
              <span>0{index + 1}</span>
              <Icon size={25} strokeWidth={1.65} aria-hidden="true" />
            </div>
            <div className={styles.toolCopy}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
