import { useParams, Navigate } from 'react-router-dom';
import { useCV } from '../contexts/CVContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CVDetailHeader from '../components/cv-detail/CVDetailHeader';
import CVStatsGrid from '../components/cv-detail/CVStatsGrid';
import CareerMatchCard from '../components/cv-detail/CareerMatchCard';

export default function CVDetailAnalysis() {
  const { id } = useParams();
  const { getCV, cvList } = useCV();
  const cv = getCV(id);

  // cvList starts as [] before useEffect loads from localStorage — wait for it
  if (cvList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F4F5FB]">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="w-10 h-10 border-[3px] border-[#E8EAF2] border-t-primary rounded-full" style={{ animation: 'spin 0.8s linear infinite' }} />
        </main>
      </div>
    );
  }

  if (!cv) return <Navigate to="/cv-history" replace />;

  const totalSkills = cv.analysis?.skills?.length || 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5FB]">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-[920px] mx-auto px-6 py-10">

          {/* Header */}
          <CVDetailHeader cv={cv} />

          {/* Stats */}
          <CVStatsGrid analysis={cv.analysis} />

          {/* Career Matches */}
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-display font-bold text-xl text-[#0F1226]">
                Top {cv.matches?.length || 0} Career Matches
              </h2>
              <div className="flex-1 h-px bg-[#E8EAF2]" />
            </div>

            <div className="flex flex-col gap-4">
              {cv.matches?.map(match => (
                <CareerMatchCard key={match.id} match={match} totalSkills={totalSkills} />
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
