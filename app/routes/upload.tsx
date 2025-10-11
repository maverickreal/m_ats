import React, { type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";

const Upload: React.FC = () => {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [statusText, setStatusText] = React.useState("");
    const [file, setFile] = React.useState<File | null>(null);
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();

    const handleAnalyze = async (companyName: string, jobTitle: string, jobDescription: string, file: File) => {
        setIsProcessing(true);
        setStatusText("Uploading the resume ...");

        const uploadedFile = await fs.upload([file]);

        if (!uploadedFile) {
            setStatusText("File upload failed!");
            return;
        }
        setStatusText("Converting to an image ...");
        // const imageFile = await pdfToImage(file);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget.closest("form");

        if (!form) {
            return;
        }

        const formdata = new FormData(form);

        const companyName = formdata.get("company-name") as string;
        const jobTitle = formdata.get("job-title") as string;
        const jobDescription = formdata.get("job-description") as string;

        if (!file) {
            return;
        }

        handleAnalyze(companyName, jobTitle, jobDescription, file);
    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Intelligent feedback.</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for feedback.</h2>
                    )}

                    {!isProcessing && (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8" id="upload-form">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="company name" id="company-name" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="job title" id="job-title" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="job description" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader file={file} onFileToggle={setFile} />
                            </div>
                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Upload;
