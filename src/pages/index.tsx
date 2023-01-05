import { useState } from "react";
import LayoutBaseSkeleton from "../components/layout/LayoutSkeleton";
import CodeBlock from "../components/CodeBlock";
import { api } from "../utils/api";
import Link from "next/link";

const CodePage = () => {
  const [code, setCode] = useState("");
  const [commentedCode, setCommentedCode] = useState(
    "// Commented code shows here"
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onCodeChange = (code: string) => setCode(code.slice(0, 250));

  const codeMutate = api.commenter.commentCode.useMutation({
    onSuccess: (codeMutated) => {
      console.log("Code Success");
      console.log(codeMutated);
      setCommentedCode(codeMutated?.commentedCode as string);
      /* if (!codeMutate || !codeMutated?.commentedCode.choices[0]?.text) return;
      setCommentedCode(codeMutated.commentedCode.choices[0].text); */
      window.scrollTo(0, document.body.scrollHeight);
    },
    onError: () => {
      console.log("Errror mutate");
      setCommentedCode(
        "// Error while mutating\n// Please wait 1 min and try again"
      );
    },
  });

  const onCommentCode = async () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    setCommentedCode("...");
    codeMutate.mutate({ code: code });
    setTimeout(() => setIsButtonDisabled(false), 6000);
  };

  return (
    <LayoutBaseSkeleton title="Home">
      <div className="h-screen w-screen">
        <div className="mx-auto max-w-4xl p-4">
          <nav className="mx-3">
            <h1 className="text-3xl font-bold text-orange-500">
              Code Commenter App
            </h1>
            <p className="my-4 font-medium text-white">
              {`This app allows you to input JavaScript code and comment it out
              when you click the button. To use the app, simply type your code
              into the top code block and click the "Comment" button. The
              commented code will be displayed in the bottom code block.`}
            </p>
            <div className="mb-4 flex text-lg font-bold">
              <Link href="/" className="text-orange-500 hover:text-orange-400">
                About the app
              </Link>
              <span className="mx-2">/</span>
              <Link href="/" className="text-orange-500 hover:text-orange-400">
                View History
              </Link>
              <span className="mx-2">/</span>
              <Link href="/" className="text-orange-500 hover:text-orange-400">
                Logout
              </Link>
            </div>
          </nav>
          <div className="mb-4 rounded-3xl bg-slate-50 px-3 py-4 shadow-md">
            <CodeBlock
              code={code}
              onCodeChange={onCodeChange}
              title="JavaScript code to comment"
            />
            <button
              className="focus:shadow-outline mt-3 mb-10 rounded bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-400 focus:outline-none disabled:bg-gray-200"
              type="button"
              onClick={onCommentCode}
              disabled={isButtonDisabled}
            >
              Comment code
            </button>

            <CodeBlock code={commentedCode} title="Commented code" readonly />
          </div>
        </div>
      </div>
    </LayoutBaseSkeleton>
  );
};

export default CodePage;
