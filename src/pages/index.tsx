import { ChangeEvent, SetStateAction, useState } from "react";
import LayoutBaseSkeleton from "../components/layout/LayoutSkeleton";

const CodePage = () => {
  const [code, setCode] = useState("");
  const [commentedCode, setCommentedCode] = useState(
    "// Code output goes here"
  );

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const handleCommentCode = async () => {
    setCommentedCode(code);
  };

  return (
    <LayoutBaseSkeleton title="Home">
      <div className="h-screen w-screen bg-slate-100">
        <div className="mx-auto max-w-xl p-4">
          <div className="mb-4 rounded bg-slate-50 px-3 py-4 shadow-md">
            <textarea
              value={code}
              onChange={handleCodeChange}
              placeholder="// Code to comment goes here"
              rows={15}
              maxLength={1000}
              className="focus:shadow-outline vscode w-full appearance-none rounded border py-2 px-3 shadow focus:outline-none"
            />
            <button
              onClick={handleCommentCode}
              className="focus:shadow-outline mt-2 rounded bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-400 focus:outline-none"
              type="button"
            >
              Comment code
            </button>
          </div>
          <div className="mb-4 rounded bg-white px-3 py-4 shadow-md">
            <h2 className="mb-2 ml-1">Commented code</h2>
            <pre className="focus:shadow-outline code-block w-full appearance-none rounded border py-2 px-3 shadow focus:outline-none">
              {commentedCode}
            </pre>
          </div>
        </div>
      </div>
    </LayoutBaseSkeleton>
  );
};

export default CodePage;
