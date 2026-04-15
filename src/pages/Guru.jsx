import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'

const guruJourneyHighlights = [
  'Bianca Radhakrishna is a Vidushi, lifelong learner, and Bharatanatyam artiste who continues her training under the guidance of renowned Guru Smt. Radha Sridhar of Bangalore.',
  'Her Arangetram, performed with her sister Nithash on 21 June 2013 at Ravindra Kalakshetra, Bangalore, marked a meaningful beginning and strengthened her path toward dance as a lifelong calling.',
  'She is a Doordarshan graded artiste and has successfully completed the Vidwan grade of proficiency conducted by KSEEB, Government of Karnataka.',
  'Having begun dance at the age of six, she credits her family, early teachers, and Guru Radha Sridhar for shaping her artistic discipline, values, and devotion to Bharatanatyam.',
]

const guruContributionPoints = [
  'Nearing a hundred stage presentations as a soloist, duet performer, and ensemble artiste in productions of Guru Radha Sridhar.',
  'Portrayed key roles in dance dramas including Krishna and Radha in Geetha Govinda, Rama in Ramayana, Mohini in Mohini Bhasmasura, and Shanthala in Natyarani Shanthala.',
  'Actively crafts new choreographies, seeing creative work as her contribution to the vast ocean of classical dance.',
  "Trains junior and senior students, assists in workshops, and supports Arangetram preparation with the same sincerity she brings to performance.",
]

const guruAppearances = [
  'International appearances include performances at The Nehru Centre, High Commission of India, London, and the Ganga-Danube Cultural Festival in Hungary.',
  'Performed across the United States with her troupe at AKKA Sammelana in Atlantic City, Kaveri Kannada Koota events, Boston Ganeshotsava celebrations, Soorya Dance Festival in St. Louis, and cultural venues in Houston, Pittsburgh, Portland, and beyond.',
  'Represented Karnataka at the Mamallapuram Indian Dance Festival and appeared in cultural presentations associated with Karnataka Tourism and Karnataka Soaps and Detergents Ltd.',
  'Presented dance across India at festivals and venues including Ujjain Maha Kumbh Mela, Ravindra Bhavan Goa, Brihadeeshwara Temple Tanjore, Naada Neerajanam Tirupati, Rabindra Mandap Bhubaneshwar, Hampi Utsav, and major classical dance festivals in Mysore and Bangalore.',
]

export default function Guru() {
  useScrollReveal()

  return (
    <div className="page-enter">
      <div className="page-hero page-hero-photo" style={{ '--page-hero-image': `url(${siteAssets.img})` }}>
        <div>
          <h1>About Our Guru</h1>
          <p>A life dedicated to the art of Bharatanatyam, preserving its essence and passing on its grace.</p>
        </div>
      </div>

      <section className="guru-page">
        <div className="container">
          <div className="guru-hero-grid">
            <div className="reveal-left">
              <img
                src={siteAssets.guruPortrait}
                alt="Guru Bianca Radhakrishna"
              />
            </div>
            <div className="guru-detail-text reveal-right">
              <span className="section-tag">Our Guru</span>
              <h2>Bianca<br />Radhakrishna</h2>
              <p>Bianca Radhakrishna is a Vidushi, Bharatanatyam dancer, and lifelong learner whose journey in dance has been guided by devotion, discipline, and a deep emotional connection to the art form.</p>
              <p>She continues to train under the guidance of renowned Guru Smt. Radha Sridhar of Bangalore, carrying forward a traditional lineage with sincerity and reverence.</p>
              <p>Her Arangetram, performed with her sister Nithash on 21 June 2013 at Ravindra Kalakshetra, Bangalore, became an important milestone that shaped her artistic path and strengthened her resolve to pursue dance as a vocation.</p>
              <p>She is a Doordarshan graded artiste and has successfully completed the Vidwan grade of proficiency conducted by KSEEB, Government of Karnataka.</p>
              <p>For Bianca, Bharatanatyam is not only performance, but also a way of living, learning, and sharing the goodness of life through dance.</p>
            </div>
          </div>

          <div className="guru-story-grid">
            <div className="guru-story-card reveal">
              <span className="section-tag">Journey</span>
              <h3>Her Artistic Journey</h3>
              {guruJourneyHighlights.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
            <div className="guru-story-card reveal" style={{ transitionDelay: '0.12s' }}>
              <span className="section-tag">Contribution</span>
              <h3>Performance and Teaching</h3>
              <ul className="guru-story-list">
                {guruContributionPoints.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="guru-appearances reveal">
            <div className="guru-appearances-heading">
              <span className="section-tag">Appearances</span>
              <h2 className="section-title" style={{ fontStyle: 'var(--font-body)' }}>Performances Across India and Abroad</h2>
            </div>
            <div className="guru-appearances-grid">
              {guruAppearances.map((item, index) => (
                <article className="guru-appearance-card" key={index}>
                  <span className="guru-appearance-number">{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="guru-achievements">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">Milestones</span>
              <h2 className="section-title" style={{ fontStyle: 'italic' }}>Achievements & Recognition</h2>
            </div>
            <div className="guru-achievements-grid">
              {[
                { icon: '100', title: 'Stage Presentations', desc: 'Nearing one hundred performances as a soloist, duet performer, and ensemble artiste.' },
                { icon: 'DD', title: 'Doordarshan Graded', desc: 'Recognised as a Doordarshan graded artiste with a strong foundation in traditional performance.' },
                { icon: 'VG', title: 'Vidwan Qualified', desc: 'Completed the Vidwan grade of proficiency conducted by KSEEB, Government of Karnataka.' },
              ].map((a, i) => (
                <div key={i} className="guru-achievement-card reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                  <div className="guru-achievement-icon">{a.icon}</div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
