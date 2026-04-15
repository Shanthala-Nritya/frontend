import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'

const classes = [
  {
    title: 'Kids & Beginners Batch',
    img: siteAssets.multiArms,
    desc: 'Designed for young learners, this batch introduces the fundamentals of Bharatanatyam through basic steps, rhythm, and simple expressions in a structured and enjoyable way.',
    eligibility: [
      'Age 5 years and above',
      'Beginners with no prior experience',
      'Open to all genders',
    ],
  },
  {
    title: 'Regular Batch',
    img: siteAssets.RB,
    desc: 'This batch focuses on structured and progressive learning, helping students improve their technique, rhythm, and expressions with consistent practice.',
    eligibility: [
      'Students with basic knowledge of Bharatanatyam',
      'Willingness to practice regularly',
      'Open to all age groups',
      'Open to all genders',
    ],
  },
  {
    title: 'Ladies Special Batch',
    img: siteAssets.LS,
    desc: 'Specially designed for women who wish to restart their dance journey, this batch offers a comfortable and flexible learning environment.',
    eligibility: [
      'Women of all age groups',
      'Those who have learned previously or are interested to restart',
      'Working professionals and homemakers welcome',
    ],
  },
  {
    title: 'Online Classes',
    img: siteAssets.duoStage,
    desc: 'Online classes are conducted for students outside Bangalore and abroad, ensuring quality training with flexibility and convenience.',
    eligibility: [
      'Students residing outside Bangalore or India',
      'Access to a stable internet connection',
      'Commitment to regular participation',
    ],
  },
]

export default function Classes() {
  useScrollReveal()

  return (
    <div className="page-enter">
      <section className="classes-page">
        <div className="container">

          {/* Page heading */}
          <div className="cp-header reveal">
            <h1 className="cp-heading">Bharatanatyam Classes</h1>
            <div className="divider"><div className="divider-diamond"></div></div>
          </div>

          {/* 2-column card grid */}
          <div className="cp-grid">
            {classes.map((cls, i) => (
              <article
                className="cp-card reveal"
                key={cls.title}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Photo */}
                <div className="cp-card-img-wrap">
                  <img className="cp-card-img" src={cls.img} alt={cls.title} />
                </div>

                {/* Content */}
                <div className="cp-card-body">
                  <p className="cp-card-desc">{cls.desc}</p>

                  <span className="cp-eligibility-label">Eligibility</span>
                  <ul className="cp-eligibility-list">
                    {cls.eligibility.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  <h2 className="cp-card-title">{cls.title}</h2>

                  <button className="cp-btn">Enquire Now</button>
                </div>
              </article>
            ))}
          </div>

          {/* Arangetram — full width */}
           <article className="cp-arangetram reveal">
            <div className="cp-arangetram-img-wrap">
              <img
                src={siteAssets.hero}
                alt="Arangetram Training"
                className="cp-arangetram-img"
              />
            </div>

            <div className="cp-card-body">
              <p className="cp-card-desc">
                Intensive and personalized training is provided for students preparing for their
                Arangetram, focusing on advanced techniques, expressions, and stage performance.
                The training emphasises discipline, dedication, and a deep understanding of the art
                form, guiding students through every aspect of their preparation with care and
                attention.
              </p>

              <div className="cp-training-cols">
                <div>
                  <span className="cp-eligibility-label">Training Includes</span>
                  <ul className="cp-eligibility-list">
                    {[
                      'Complete Margam',
                      'Makeup and presentation guidance',
                      'Music coordination with musicians',
                      'Costume and jewelry consultation',
                      'Rehearsals and stage practice',
                      'Event planning support',
                    ].map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="cp-eligibility-label">Eligibility</span>
                  <ul className="cp-eligibility-list">
                    {[
                      'Students with at least 5–7 years of regular training and guru approval',
                      'Commitment towards Arangetram preparation',
                    ].map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h2 className="cp-card-title">Arangetram Training</h2>
              <button className="cp-btn">Enquire Now</button>
            </div>
          </article>

        </div>
      </section>
    </div>
  )
}