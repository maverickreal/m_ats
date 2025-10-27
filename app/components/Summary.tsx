import ScoreBadge from "./ScoreBadge";
import ScoreGuage from "./ScoreGauge";

const Category = ({ score, title }: { score: number, title: string }) => {
    let textColor: string;

    if (score > 70) {
        textColor = "text-green-600";
    } else if (score > 50) {
        textColor = "text-yellow-600";
    } else {
        textColor = "text-red-600";
    }

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center jusify-center">
                    <p className="text-2xl">{title}</p>
                    <ScoreBadge score={score}></ScoreBadge>
                </div>
                <p className="text-2xl">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p4 gap-8">
                <ScoreGuage score={feedback.overallScore}></ScoreGuage>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Overall Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>
            <Category title="Tone & Style" score={feedback.toneAndStyle.score}></Category>
            <Category title="Content" score={feedback.content.score}></Category>
            <Category title="Structure" score={feedback.structure.score}></Category>
            <Category title="Skills" score={feedback.skills.score}></Category>
        </div>
    );
};

export default Summary;
