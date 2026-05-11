import MatchDonut from './MatchDonut';

const IcoTip = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;

/* 3-tier: green / yellow / red */
const getTier = (pct) =>
  pct >= 80 ? { ring: '#22C55E', text: 'text-[#15803D]' } :
  pct >= 60 ? { ring: '#F59E0B', text: 'text-[#B45309]' } :
              { ring: '#EF4444', text: 'text-[#DC2626]' };

export default function CareerMatchCard({ match, totalSkills }) {
  const { predicted_career, match_percentage, matched_skills, skill_gaps, salary, recommendation } = match;
  const tier = getTier(match_percentage);

  return (
    <div className="card-base p-6 md:p-8 flex flex-col md:flex-row gap-8 animate-fade-up items-stretch">
      {/* ── Left: Score & Identity ── */}
      <div className="flex flex-col items-center text-center flex-shrink-0 md:w-[240px] md:border-r border-[#E8EAF2] md:pr-8 py-2">
        <MatchDonut percentage={match_percentage} size={110} strokeWidth={9} color={tier.ring} />
        <p className="text-[11px] font-bold text-[#9EA3BC] uppercase tracking-widest mt-4 mb-6">Match Score</p>
        
        <h3 className="font-display font-extrabold text-[22px] text-[#0F1226] mb-3 leading-tight">{predicted_career}</h3>
        <span className="text-[13px] font-bold text-[#5B4FE8] bg-[#EEEDFE] px-3 py-1.5 rounded-lg mb-6">{salary} / mo</span>

        <a 
          href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(predicted_career)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-bold transition-colors mt-auto"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          Search on LinkedIn
        </a>
      </div>

      {/* ── Right: Details & Insight ── */}
      <div className="flex-1 min-w-0 w-full flex flex-col justify-center">


        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
          {/* Matched Skills */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-[#0F1226]">Matched Skills</p>
              <span className="text-xs font-bold text-[#9EA3BC]">{matched_skills.length}/{totalSkills}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {matched_skills.map(skill => (
                <span key={skill} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F4F5FB] text-[#0F1226]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Skill Gaps */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-[#0F1226]">Missing</p>
              <span className="text-xs font-bold text-[#9EA3BC]">{skill_gaps.length} skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill_gaps.map(gap => (
                <span key={gap} className="text-xs font-medium px-3 py-1.5 rounded-lg border border-dashed border-[#D1D5DB] text-[#5A5F7D]">
                  {gap}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation Insight */}
        {recommendation && (
          <div className="bg-[#F8F9FE] rounded-xl p-4 md:p-5 flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            </div>
            <p className="text-sm text-[#5A5F7D] leading-relaxed pt-1.5">
              <span className="font-semibold text-[#0F1226]">Insight: </span>
              {recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
