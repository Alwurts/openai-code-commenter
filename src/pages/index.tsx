import { useState } from "react";
import LayoutBaseSkeleton from "../components/layout/LayoutSkeleton";
import CodeBlock from "../components/CodeBlock";
import { api } from "../utils/api";
import Link from "next/link";
import useRequestThrottle from "../hooks/useRequestThrottle";
import useIdentifyUser from "../hooks/useIdentifyUser";

const CodePage = () => {
  const [code, setCode] = useState("");
  const [commentedCode, setCommentedCode] = useState("");
  const disableQueryFor = 60000;

  const { isQueryDisabled, timeUntilEnabled, startThrottle } =
    useRequestThrottle(disableQueryFor);

  const queryUserId = useIdentifyUser();

  const onCodeChange = (code: string) => setCode(code.slice(0, 250));

  const codeMutate = api.commenter.commentCode.useMutation({
    onSuccess: (codeMutated) => {
      if (!codeMutated?.commentedCode) return;
      setCommentedCode(codeMutated.commentedCode);
      window.scrollTo(0, document.body.scrollHeight);
    },
    onError: () => {
      console.log("Errror mutate");
      setCommentedCode(
        "// Error while commenting\n// Please wait 1 min and try again"
      );
    },
  });

  const onCommentCode = async () => {
    if (isQueryDisabled) return;
    if (!code.length) {
      setCommentedCode("// The code editor is empty");
      return;
    }
    if (!queryUserId) {
      setCommentedCode("// Client Error");
      return;
    }
    setCommentedCode("Working on it...");
    codeMutate.mutate({ code: code, userId: queryUserId });

    startThrottle();
  };

  return (
    <LayoutBaseSkeleton title="Home">
      <div className="h-screen w-screen">
        <div className="mx-auto max-w-4xl p-4">
          <nav className="mx-3">
            <h1 className="mt-4 text-3xl font-bold text-orange-500">
              Code Commenter App
            </h1>
            <p className="my-4 font-medium text-white">
              {`This app allows you to input JavaScript code and comment it out
              when you click the button. To use the app, simply type your code
              into the top code block and click the "Comment" button. The
              commented code will be displayed in the bottom code block.`}
            </p>
            <div className="mb-4 flex text-lg font-bold">
              <Link
                href="https://www.alejandrowurts.com/"
                className="text-orange-500 hover:text-orange-400"
                target="_blank"
              >
                Made by Alwurts
              </Link>
            </div>
          </nav>
          <div className="mb-4 rounded-3xl bg-slate-50 px-3 py-4 shadow-md">
            <CodeBlock
              code={code}
              onCodeChange={onCodeChange}
              title="JavaScript code to comment"
              placeHolder="// Copy your code here"
            />
            <div className="px-2 pt-3 pb-8">
              <div className="flex items-center">
                <button
                  className="focus:shadow-outline mr-3 rounded bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-400 focus:outline-none disabled:bg-gray-200"
                  type="button"
                  onClick={onCommentCode}
                  disabled={isQueryDisabled}
                >
                  Comment code
                </button>
                <p>
                  {isQueryDisabled &&
                    `Available in ${Math.round(timeUntilEnabled / 1000)}s`}
                </p>
              </div>
            </div>

            <CodeBlock
              code={commentedCode}
              title="Commented code"
              readonly
              placeHolder="// Commented code shows here"
            />
          </div>
        </div>
      </div>
    </LayoutBaseSkeleton>
  );
};

export default CodePage;
