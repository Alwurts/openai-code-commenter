import { SetStateAction, useState } from "react";

const CodePage = () => {
  const [code, setCode] = useState("");
  const [commentedCode, setCommentedCode] = useState("");

  /* const handleCodeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setCode(event.target.value);
  };

  const handleCommentCode = async () => {
    const response = await openai.Completion.create({
      prompt: code,
      model: "davinci",
      max_tokens: 2048,
      temperature: 0.5,
    });
    setCommentedCode(response.text);
  }; */

  return (
    <div className="mx-auto max-w-sm p-4">
      <div className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <textarea
          value={code}
          //onChange={handleCodeChange}
          maxLength={1000}
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        />
        <button
          //onClick={handleCommentCode}
          className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
        >
          Comment code
        </button>
      </div>
      <div className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <pre className="text-xs">{commentedCode}</pre>
      </div>
    </div>
  );
};

export default CodePage;
