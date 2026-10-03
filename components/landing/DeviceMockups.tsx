"use client";

import type { ReactNode } from "react";
import {
  Activity,
  Ambulance,
  BedDouble,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Dumbbell,
  HeartPulse,
  House,
  MapPin,
  MessageCircle,
  Navigation,
  Package,
  Pill,
  Route,
  ScanLine,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Store,
  TrendingUp,
  Truck,
  UserRound,
  UsersRound,
} from "lucide-react";
import styles from "./LandingExperience.module.css";

type DeviceFrameProps = {
  children: ReactNode;
  kind?: "iphone" | "samsung";
  className?: string;
};

export function DeviceFrame({
  children,
  kind = "iphone",
  className = "",
}: DeviceFrameProps) {
  return (
    <div
      className={`${styles.device} ${
        kind === "iphone" ? styles.iphone : styles.samsung
      } ${className}`}
      aria-hidden="true"
    >
      <div className={styles.deviceGlass}>
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span className={styles.statusMarks}>● ◒ ▰</span>
        </div>
        {kind === "iphone" ? (
          <div className={styles.dynamicIsland} />
        ) : (
          <div className={styles.punchHole} />
        )}
        <div className={styles.deviceScreen}>{children}</div>
        <div className={styles.homeIndicator} />
      </div>
      <span className={styles.deviceButtonOne} />
      <span className={styles.deviceButtonTwo} />
    </div>
  );
}

function ScreenTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className={styles.screenTitle}>
      <div>
        {eyebrow ? <p>{eyebrow}</p> : null}
        <h3>{title}</h3>
      </div>
      {action ?? <Bell size={15} />}
    </div>
  );
}

function ConsumerDock({ active }: { active: "home" | "care" | "fitness" | "you" }) {
  const items = [
    { key: "home", Icon: House },
    { key: "care", Icon: MapPin },
    { key: "fitness", Icon: Activity },
    { key: "you", Icon: UserRound },
  ] as const;

  return (
    <div className={styles.consumerDock}>
      {items.map(({ key, Icon }) => (
        <span key={key} className={active === key ? styles.dockActive : ""}>
          <Icon size={14} strokeWidth={2.2} />
        </span>
      ))}
    </div>
  );
}

function BusinessDock({ active = 0 }: { active?: number }) {
  const Icons = [House, CalendarDays, MessageCircle, UserRound];
  return (
    <div className={`${styles.consumerDock} ${styles.businessDock}`}>
      {Icons.map((Icon, index) => (
        <span key={index} className={active === index ? styles.dockActive : ""}>
          <Icon size={14} strokeWidth={2.2} />
        </span>
      ))}
    </div>
  );
}

export function ConsumerHomeScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.consumerScreen}`}>
      <ScreenTitle eyebrow="Good morning" title="Your health, in one place" />
      <div className={styles.searchBar}>
        <Search size={13} />
        <span>Search care, fitness, wellness</span>
      </div>
      <div className={styles.quickGrid}>
        <div className={styles.quickTile}>
          <span className={styles.iconBubble}><MapPin size={14} /></span>
          <strong>Find care</strong>
          <small>Near you</small>
        </div>
        <div className={styles.quickTile}>
          <span className={styles.iconBubble}><Dumbbell size={14} /></span>
          <strong>Get moving</strong>
          <small>Today&apos;s plan</small>
        </div>
        <div className={styles.quickTile}>
          <span className={styles.iconBubble}><Pill size={14} /></span>
          <strong>Reminders</strong>
          <small>2 upcoming</small>
        </div>
        <div className={styles.quickTile}>
          <span className={styles.iconBubble}><ScanLine size={14} /></span>
          <strong>My body</strong>
          <small>Explore</small>
        </div>
      </div>
      <div className={styles.heroAppCard}>
        <div>
          <span className={styles.miniLabel}>TODAY</span>
          <strong>Keep your rhythm</strong>
          <p>8 of 10 daily goals complete</p>
        </div>
        <div className={styles.progressOrb}>80%</div>
      </div>
      <p className={styles.sectionLabel}>For you</p>
      <div className={styles.tipCard}>
        <span className={styles.tipArtwork}><Sparkles size={22} /></span>
        <div>
          <strong>A small reset</strong>
          <p>Three minutes of guided breathing.</p>
        </div>
        <ChevronRight size={15} />
      </div>
      <ConsumerDock active="home" />
    </div>
  );
}

export function FitnessScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.consumerScreen}`}>
      <ScreenTitle eyebrow="Fitness" title="Move your way" action={<CircleDollarSign size={16} />} />
      <div className={styles.metricRow}>
        <div><strong>12</strong><span>day streak</span></div>
        <div><strong>18</strong><span>workouts</span></div>
        <div><strong>1,240</strong><span>FitCoins</span></div>
      </div>
      <div className={styles.fitnessHero}>
        <span className={styles.miniLabel}>YOUR PLAN</span>
        <h4>Full body flow</h4>
        <p>24 min · Intermediate</p>
        <div className={styles.activityRings}>
          <span /><span /><span />
          <strong>72%</strong>
        </div>
        <button>Continue workout <ChevronRight size={12} /></button>
      </div>
      <div className={styles.rowHeading}><strong>Explore movement</strong><span>See all</span></div>
      <div className={styles.horizontalCards}>
        <div className={styles.workoutCard}><Dumbbell size={19} /><strong>Strength</strong><small>12 sessions</small></div>
        <div className={styles.workoutCard}><Route size={19} /><strong>Outdoors</strong><small>Nearby routes</small></div>
      </div>
      <div className={styles.challengeStrip}>
        <span><TrendingUp size={16} /></span>
        <div><strong>Weekly challenge</strong><p>3.8 km left to unlock a reward</p></div>
      </div>
      <ConsumerDock active="fitness" />
    </div>
  );
}

export function CareScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.mapScreen}`}>
      <div className={styles.mapCanvas}>
        <span className={`${styles.mapRoad} ${styles.roadOne}`} />
        <span className={`${styles.mapRoad} ${styles.roadTwo}`} />
        <span className={`${styles.mapRoad} ${styles.roadThree}`} />
        <span className={`${styles.mapMarker} ${styles.markerOne}`}><Building2 size={13} /></span>
        <span className={`${styles.mapMarker} ${styles.markerTwo}`}><Stethoscope size={13} /></span>
        <span className={`${styles.mapMarker} ${styles.markerThree}`}><Dumbbell size={13} /></span>
        <span className={styles.currentLocation} />
      </div>
      <div className={styles.mapSearch}>
        <Search size={13} />
        <span>What care do you need?</span>
      </div>
      <div className={styles.mapFilters}>
        <span className={styles.filterActive}>All care</span><span>Hospitals</span><span>Pharmacies</span>
      </div>
      <button className={styles.locateButton}><Navigation size={15} /></button>
      <div className={styles.facilitySheet}>
        <span className={styles.sheetHandle} />
        <div className={styles.facilityImage}><HeartPulse size={24} /></div>
        <div className={styles.facilityCopy}>
          <div><span className={styles.openPill}>OPEN</span><small> 1.2 km</small></div>
          <strong>Community Medical Centre</strong>
          <p>General care · Pharmacy · Laboratory</p>
          <div className={styles.facilityMeta}><span>4.8 rating</span><span>12 min away</span></div>
        </div>
        <ChevronRight size={17} />
      </div>
      <ConsumerDock active="care" />
    </div>
  );
}

export function RemindersScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.consumerScreen}`}>
      <ScreenTitle eyebrow="Today" title="Your reminders" action={<span className={styles.addButton}>+</span>} />
      <div className={styles.dateRail}>
        {[["M", "28"], ["T", "29"], ["W", "30"], ["T", "01"], ["F", "02"]].map(([day, date], index) => (
          <div key={date} className={index === 3 ? styles.dateActive : ""}><span>{day}</span><strong>{date}</strong></div>
        ))}
      </div>
      <div className={styles.nextReminder}>
        <span className={styles.reminderTime}>08:30</span>
        <span className={styles.reminderIcon}><Pill size={18} /></span>
        <div><small>NEXT UP</small><strong>Morning medication</strong><p>1 tablet · With food</p></div>
        <button><Check size={14} /></button>
      </div>
      <p className={styles.sectionLabel}>Later today</p>
      <div className={styles.timeline}>
        <div><span className={styles.timeDot} /><time>12:00</time><span className={styles.timelineIcon}><Dumbbell size={15} /></span><p><strong>Mobility session</strong><small>20 min workout</small></p></div>
        <div><span className={styles.timeDot} /><time>15:30</time><span className={styles.timelineIcon}><CalendarDays size={15} /></span><p><strong>Clinic appointment</strong><small>Community Medical Centre</small></p></div>
        <div><span className={styles.timeDot} /><time>20:00</time><span className={styles.timelineIcon}><Pill size={15} /></span><p><strong>Evening medication</strong><small>1 tablet</small></p></div>
      </div>
      <div className={styles.reminderNote}><Bell size={14} /><span>You&apos;re all set for today</span></div>
      <ConsumerDock active="you" />
    </div>
  );
}

export function AnatomyScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.anatomyScreen}`}>
      <div className={styles.anatomyTop}>
        <div><small>UNDERSTAND</small><strong>Explore your body</strong></div>
        <ScanLine size={17} />
      </div>
      <div className={styles.anatomyTabs}><span className={styles.anatomyTabActive}>Body</span><span>Symptoms</span><span>Guides</span></div>
      <div className={styles.bodyVisual}>
        <span className={styles.bodyGlow} />
        <svg viewBox="0 0 160 330" role="presentation">
          <defs>
            <linearGradient id="body-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#dff9e9" stopOpacity=".95" />
              <stop offset="1" stopColor="#47be7d" stopOpacity=".28" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="30" r="22" fill="url(#body-gradient)" />
          <path d="M58 59 Q80 48 102 59 L113 142 101 196 99 304 78 304 72 203 62 304 42 304 58 196 47 142Z" fill="url(#body-gradient)" />
          <path d="M51 68 22 173M108 68 138 173" fill="none" stroke="#a5e8c1" strokeWidth="18" strokeLinecap="round" />
          <path d="M67 91 Q80 76 93 91 Q101 110 80 128 Q59 110 67 91" fill="#ff8e88" opacity=".9" />
          <path d="M76 127v48M60 151h40" stroke="#1f7a4b" strokeWidth="2" opacity=".7" />
        </svg>
        <span className={`${styles.scanPoint} ${styles.scanHeart}`}>Heart</span>
        <span className={`${styles.scanPoint} ${styles.scanKnee}`}>Joints</span>
      </div>
      <div className={styles.bodyCard}>
        <div><span className={styles.heartIcon}><HeartPulse size={17} /></span><p><small>SELECTED</small><strong>Cardiovascular system</strong></p></div>
        <ChevronRight size={15} />
      </div>
      <div className={styles.bodyActions}><span><Sparkles size={14} /> Healthy living</span><span><Activity size={14} /> Lab results</span></div>
    </div>
  );
}

export function TogetherScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.consumerScreen}`}>
      <ScreenTitle eyebrow="Care circle" title="Better, together" action={<span className={styles.addButton}>+</span>} />
      <div className={styles.circleHero}>
        <div className={styles.avatarCluster}>
          <span>YO</span><span>AM</span><span>KO</span><span>+</span>
        </div>
        <strong>Your care circle</strong>
        <p>3 people connected · You control what is shared</p>
      </div>
      <div className={styles.sharingCard}>
        <div className={styles.sharingTop}><ShieldCheck size={17} /><strong>Sharing overview</strong><span>Manage</span></div>
        <div><span><Pill size={14} /> Medication reminders</span><strong>2 people</strong></div>
        <div><span><CalendarDays size={14} /> Appointments</span><strong>1 person</strong></div>
        <div><span><Activity size={14} /> Activity progress</span><strong>Private</strong></div>
      </div>
      <p className={styles.sectionLabel}>Recent</p>
      <div className={styles.messageCard}>
        <span className={styles.messageAvatar}>AM</span>
        <div><strong>Care circle</strong><p>Great work keeping up with your routine.</p><small>2 min ago</small></div>
        <MessageCircle size={16} />
      </div>
      <div className={styles.messageCard}>
        <span className={styles.messageAvatar}><Building2 size={15} /></span>
        <div><strong>Community Medical Centre</strong><p>Your appointment is confirmed.</p><small>Today</small></div>
        <Check size={16} />
      </div>
      <ConsumerDock active="you" />
    </div>
  );
}

export function BusinessWelcomeScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.welcomeScreen}`}>
      <div className={styles.businessMark}><HeartPulse size={20} /><span>4 OUR LIFE</span></div>
      <div className={styles.welcomeArtwork}>
        <span className={styles.artOrbOne} />
        <span className={styles.artOrbTwo} />
        <div><Building2 size={28} /><Stethoscope size={24} /><Truck size={25} /></div>
      </div>
      <div className={styles.welcomeCopy}>
        <span>FOR HEALTH BUSINESSES</span>
        <h3>Care works better when it&apos;s connected.</h3>
        <p>Run your day, reach the right people and keep every team in rhythm.</p>
      </div>
      <button className={styles.businessPrimary}>Continue <ChevronRight size={13} /></button>
      <button className={styles.businessSecondary}>Sign in</button>
    </div>
  );
}

function BusinessHeader({
  label,
  title,
  icon,
}: {
  label: string;
  title: string;
  icon: ReactNode;
}) {
  return (
    <div className={styles.businessHeader}>
      <div><small>{label}</small><h3>{title}</h3></div>
      <span>{icon}</span>
    </div>
  );
}

export function FacilityScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.businessScreen}`}>
      <BusinessHeader label="FACILITY OVERVIEW" title="Good morning" icon={<Building2 size={17} />} />
      <div className={styles.businessHeroCard}>
        <div><small>LIVE CAPACITY</small><strong>14</strong><span>beds available</span></div>
        <div className={styles.capacityRing}><BedDouble size={20} /></div>
      </div>
      <div className={styles.businessStats}>
        <div><span><CalendarDays size={14} /></span><strong>08</strong><small>Bookings</small></div>
        <div><span><MessageCircle size={14} /></span><strong>04</strong><small>Messages</small></div>
        <div><span><Ambulance size={14} /></span><strong>02</strong><small>Alerts</small></div>
      </div>
      <p className={styles.businessLabel}>Today&apos;s flow</p>
      <div className={styles.bookingRow}><span className={styles.bookingTime}>09:30</span><div><strong>General consultation</strong><p>Confirmed · Room 4</p></div><span className={styles.statusDot} /></div>
      <div className={styles.bookingRow}><span className={styles.bookingTime}>10:15</span><div><strong>Laboratory booking</strong><p>Pending confirmation</p></div><ChevronRight size={14} /></div>
      <div className={styles.alertStrip}><ShieldCheck size={15} /><div><strong>Operations are in sync</strong><p>All services reporting normally</p></div></div>
      <BusinessDock />
    </div>
  );
}

export function PracticeScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.businessScreen}`}>
      <BusinessHeader label="PRACTICE" title="Your day at a glance" icon={<Stethoscope size={17} />} />
      <div className={styles.practiceDate}>
        <div><strong>01</strong><span>THU</span></div>
        <p><strong>5 appointments</strong><small>First session at 09:00</small></p>
        <CalendarDays size={16} />
      </div>
      <div className={styles.scheduleTrack}>
        <div><time>09:00</time><span className={styles.scheduleLine} /><p><small>FOLLOW-UP</small><strong>Patient consultation</strong><span>30 min · Video</span></p><span className={styles.videoTag}>LIVE</span></div>
        <div><time>10:30</time><span className={styles.scheduleLine} /><p><small>IN PERSON</small><strong>New patient visit</strong><span>45 min · Room 2</span></p></div>
        <div><time>12:00</time><span className={styles.scheduleLine} /><p><small>REVIEW</small><strong>Shared report</strong><span>20 min · Records</span></p></div>
      </div>
      <div className={styles.reportCard}><span><Activity size={17} /></span><div><small>NEW REPORT</small><strong>Ready for your review</strong></div><ChevronRight size={14} /></div>
      <BusinessDock active={1} />
    </div>
  );
}

export function TrainerScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.businessScreen}`}>
      <BusinessHeader label="COACHING" title="Clients in motion" icon={<Dumbbell size={17} />} />
      <div className={styles.trainerHero}>
        <div><small>ACTIVE THIS WEEK</small><strong>18 <span>/ 24 clients</span></strong></div>
        <div className={styles.barMini}><span /><span /><span /><span /><span /><span /><span /></div>
      </div>
      <div className={styles.rowHeading}><strong>Needs attention</strong><span>View all</span></div>
      <div className={styles.clientCard}>
        <span className={styles.clientAvatar}>A</span><div><strong>Program check-in</strong><p>Week 4 · Strength foundation</p><span className={styles.miniProgress}><i style={{ width: "72%" }} /></span></div><strong>72%</strong>
      </div>
      <div className={styles.clientCard}>
        <span className={styles.clientAvatar}>K</span><div><strong>Plan completed</strong><p>Mobility reset · 5 sessions</p><span className={styles.miniProgress}><i style={{ width: "100%" }} /></span></div><Check size={14} />
      </div>
      <div className={styles.programCard}><div><small>PROGRAM BUILDER</small><strong>Create the next progression</strong><p>Build once, personalise for every client.</p></div><span><Sparkles size={18} /></span></div>
      <BusinessDock />
    </div>
  );
}

export function VendorScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.businessScreen}`}>
      <BusinessHeader label="STORE" title="Orders are moving" icon={<Store size={17} />} />
      <div className={styles.vendorMetrics}>
        <div><small>TODAY</small><strong>24</strong><span>orders</span></div>
        <div><small>REVENUE</small><strong>+18%</strong><span>this week</span></div>
      </div>
      <div className={styles.demandCard}>
        <div><span><TrendingUp size={15} /></span><p><small>DEMAND INSIGHT</small><strong>Wellness essentials are trending</strong></p></div>
        <div className={styles.demandBars}><i /><i /><i /><i /><i /><i /><i /></div>
      </div>
      <div className={styles.rowHeading}><strong>Recent orders</strong><span>See all</span></div>
      <div className={styles.orderRow}><span><ShoppingBag size={15} /></span><div><strong>Order #1042</strong><p>3 items · 4 min ago</p></div><em>NEW</em></div>
      <div className={styles.orderRow}><span><Package size={15} /></span><div><strong>Order #1041</strong><p>2 items · Ready to dispatch</p></div><em className={styles.readyTag}>READY</em></div>
      <div className={styles.stockStrip}><Package size={14} /><span>4 catalogue items need a stock check</span><ChevronRight size={14} /></div>
      <BusinessDock />
    </div>
  );
}

export function AmbulanceScreen() {
  return (
    <div className={`${styles.appScreen} ${styles.dispatchScreen}`}>
      <div className={styles.dispatchMap}>
        <span className={`${styles.dispatchRoad} ${styles.dispatchRoadOne}`} />
        <span className={`${styles.dispatchRoad} ${styles.dispatchRoadTwo}`} />
        <span className={styles.routePath} />
        <span className={styles.ambulancePin}><Ambulance size={14} /></span>
        <span className={styles.hospitalPin}><Building2 size={13} /></span>
      </div>
      <div className={styles.dispatchHeader}>
        <div><small>DISPATCH</small><h3>Active response</h3></div>
        <span className={styles.livePulse}>LIVE</span>
      </div>
      <div className={styles.dispatchEta}><Navigation size={14} /><strong>7 min</strong><span>to destination</span></div>
      <div className={styles.tripSheet}>
        <span className={styles.sheetHandle} />
        <div className={styles.tripTitle}><span><Ambulance size={18} /></span><div><small>OPEN TRIP</small><strong>Emergency response</strong></div><em>PRIORITY</em></div>
        <div className={styles.routeSummary}><div><span className={styles.routeStart} /><p><small>PICKUP</small><strong>Current location shared</strong></p></div><div><span className={styles.routeEnd} /><p><small>DESTINATION</small><strong>Receiving facility ready</strong></p></div></div>
        <div className={styles.crewRow}><span><UsersRound size={15} /></span><p><strong>Crew connected</strong><small>Vehicle 04 · 2 responders</small></p><MessageCircle size={15} /></div>
        <button>Open trip details <ChevronRight size={13} /></button>
      </div>
    </div>
  );
}
