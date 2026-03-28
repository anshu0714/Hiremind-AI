import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

import "../styles/interview.report.scss";

import ReportHeader from "../components/ReportHeader";
import MatchSummaryCard from "../components/MatchSummaryCard";
import SkillGapCard from "../components/SkillGapCard";
import QuestionsSection from "../components/QuestionsSection";
import PreparationTimeline from "../components/PreparationTimeline";
import InputDrawer from "../components/InputDrawer";
import useInterviewReport from "../hooks/useInterviewReport";
import LoadingScreen from "@/components/LoadingScreen";

const InterviewReportResult = () => {
  const { reportId } = useParams();
  const { user } = useAuth();

  const { data, loading, error } = useInterviewReport(reportId);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (loading && !data) return <LoadingScreen />;
  if (error) {
    return (
      <div className="error-screen">
        <p>{error}</p>
      </div>
    );
  }
  if (!data) return <div>No report found</div>;

  return (
    <div className="report-page">
      <ReportHeader user={user} onOpenDrawer={() => setIsDrawerOpen(true)} />

      <div className="top-grid">
        <MatchSummaryCard score={data.matchScore} summary={data.summary} />

        <SkillGapCard skills={data.skillGaps} />
      </div>

      <QuestionsSection questions={data.questions} />

      <PreparationTimeline plan={data.preparationPlan} />

      <InputDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        inputs={data.inputs}
      />
    </div>
  );
};

export default InterviewReportResult;
