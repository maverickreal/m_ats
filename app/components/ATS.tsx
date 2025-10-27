import type { FC } from "react";
import ScoreGauge from "./ScoreGauge";

interface ATSProps {
    score: number;
    suggestions: {
        type: "good" | "improve";
        tip: string;
    }[];
}

const ATS: FC<ATSProps> = ({ score, suggestions }) => {
    const getScoreColor = () => {
        if (score > 69) {
            return "from-green-100";
        } else if (score > 49) {
            return "from-yellow-100";
        } else {
            return "from-red-100";
        }
    };

    const getIconSrc = () => {
        if (score > 69) {
            return '/icons/ats-good.svg';
        }
        if (score > 49) {
            return '/icons/ats-warning.svg';
        } else {
            return '/icons/ats-bad.svg';
        }
    };

    const getSubtitle = () => {
        if (score > 69) {
            return 'Great Job!';
        }
        if (score > 49) {
            return 'Good Start';
        }
        else {
            return 'Needs Improvement';
        }
    };

    return (
        <div className={`p-4 rounded-lg shadow-md bg-gradient-to-br ${getScoreColor()} to-white`}>
            <div className="flex flex-row items-center p4 gap-8">
                <div className="flex items-center mb-4">
                    <ScoreGauge score={score} />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold">ATS Friendliness Score</h2>
                    <div className="flex items-center">
                        <img src={getIconSrc()} alt="" className="w-5 h-5 mr-2" />
                        <p className="text-sm">{getSubtitle()}</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-md font-semibold mb-2">Suggestions</h3>
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start mb-2">
                            <img
                                src={suggestion.type === 'good' ? '/icons/ats-good.svg' : '/icons/ats-warning.svg'}
                                alt={suggestion.type}
                                className="w-5 h-5 mr-2"
                            />
                            <p className={`text-sm ${suggestion.type === 'good' ? 'text-green-600' : 'text-yellow-600'}`}>{suggestion.tip}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ATS;