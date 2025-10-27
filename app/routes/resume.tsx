import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Meta = () => {
    return [
        { title: "m_ats | review" },
        { name: "description", content: "An overview of the resume." }
    ];
};

const Resume = () => {
    const resumeId = useParams().id;
    const { auth, isLoading, fs, kv } = usePuterStore();
    const [imageUrl, setImageUrl] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate(`/auth?next=/resume/${resumeId}`)
        }
    }, [auth.isAuthenticated, isLoading]);

    useEffect(() => {
        const asyncFunc = async () => {
            const resume = await (kv.get(`resume:${resumeId}`));

            if (!resume) {
                return;
            }
            const data = JSON.parse(resume);
            const resumeBlob = await fs.read(data.resumePath);

            if (!resumeBlob) {
                return;
            }
            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);
            const imageBlob = await fs.read(data.imagePath);

            if (!imageBlob) {
                return;
            }
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);
            setFeedback(data.feedback);
        };

        asyncFunc();
    }, [resumeId]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link className="back-button" to="/">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a href={resumeUrl} target="_blank" rel="noreferrer noopener">
                                <img src={imageUrl} alt="resume" className="w-full h-full rounded-2xl object-contain" title="resume" />
                            </a>
                        </div>
                    )}
                </section>

                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            Summary M_ATS Info
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" className="w-full" />
                    )}
                </section>
            </div>
        </main>
    );
};

export default Resume;
